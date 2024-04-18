const bcrypt = require('bcrypt');
const Users = require('./users.model');
const redis = require('../config/redis');
const helperWrapper = require('../helper/wrapper')
module.exports = {
  find: async (req, res) => {
    const { query = {} } = req;
    const baseUrl = req.baseUrl.slice(1)

    let {
      page = 1,
      limit = 10,
      ...filterQuery
    } = query;

    page = Number(page)
    limit = Number(limit)
    const skip = page * limit - limit;

    try {
      const total = await Users.countDocuments(filterQuery).limit(limit).skip(skip)
        .then(count => {
          return count
        })
        .catch(err => {
          console.error('Error:', err);
          return err
        });

      const pageInfo = {
        page,
        limit,
        total
      }

      const user = await Users.find(filterQuery).limit(limit).skip(skip)

      redis.setEx(
        `get_${baseUrl}:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ data: user, pageInfo })
      );

      return helperWrapper.response(res, 200, 'success', { ...pageInfo, data: user })

    } catch (error) {
      return helperWrapper.response(res, 400, error.message, null)
    }
  },
  get: async (req, res) => {
    const { id } = req.params
    const baseUrl = req.baseUrl.slice(1)

    try {
      const user = await Users.findById(id)
      redis.setEx(
        `get_${baseUrl}:${id}`,
        3600,
        JSON.stringify(user)
      )

      return helperWrapper.response(res, 200, 'success', user._doc)
    } catch (error) {
      return helperWrapper.response(res, 400, error.message, null)
    }
  },
  create: async (req, res) => {
    try {
      const { body } = req;
      const { password } = body;
      const hashedPassword = await bcrypt.hash(password, 10);

      req.body.password = hashedPassword

      const user = await Users.create(req.body)

      delete user._doc.password

      return helperWrapper.response(res, 200, 'success', user._doc)

    } catch (error) {
      return helperWrapper.response(res, 400, error.message, null)
    }
  },
  update: async (req, res) => {
    try {
      const { body, params } = req;

      const patchUser = await Users.findOneAndUpdate(
        { _id: params.id },
        { $set: body },
        { new: true }
      )

      const { password, ...result } = patchUser._doc;

      return helperWrapper.response(res, 200, 'success', result)
    } catch (error) {
      return helperWrapper.response(res, 400, error.message, null)
    }
  },
  delete: async (req, res) => {
    try {
      const { params } = req;
      await Users.deleteOne({ _id: params.id })
      return helperWrapper.response(res, 200, 'success delete data', {})
    } catch (error) {
      return helperWrapper.response(res, 400, error.message, null)
    }
  }
}