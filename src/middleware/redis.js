const redis = require('../config/redis')
const helperWrapper = require('../helper/wrapper')
module.exports = {
  find: async (req, res, next) => {
    try {
      const baseUrl = req.baseUrl.slice(1)
      const result = await redis.get(`get_${baseUrl}:${JSON.stringify(req.query)}`)

      if (result) {
        const { data, pageInfo } = JSON.parse(result)

        return helperWrapper.response(
          res,
          200,
          'success',
          {
            ...pageInfo,
            data
          }
        )
      };

      next()
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        error.message,
        null
      )
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const baseUrl = req.baseUrl.slice(1)

      const result = await redis.get(`get_${baseUrl}:${id}`)

      if (result) {
        return helperWrapper.response(
          res,
          200,
          'success',
          JSON.parse(result)
        )
      };

      next()

    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        error.message,
        null
      )
    }
  },
  clear: async (req, res, next) => {
    const baseUrl = req.baseUrl.slice(1)

    try {
      const keys = await redis.keys(`get_${baseUrl}:*`);

      if (keys.length) {
        keys.forEach(async (el) => {
          await redis.del(el);
        });
      }

      next()
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        error.message,
        null
      )
    }
  }
}