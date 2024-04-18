const jwt = require("jsonwebtoken");
const Users = require('../user/users.model');
const bcrypt = require('bcrypt');
const helperWrapper = require('../helper/wrapper')
module.exports = {
  create: async (req, res) => {
    const { body } = req
    const { username, password } = body;
    try {
      const user = await Users.findOne({ userName: username });

      if (!user) {
        return helperWrapper.response(res, 400, 'User not found', null)
      }

      const checkPassword = await bcrypt.compare(password, user.password)

      if (!checkPassword) {
        return helperWrapper.response(res, 400, 'Wrong password', null)
      }

      delete user._doc.password
      const payload = { id: user.id }

      const token = jwt.sign({ ...payload }, "secret", { expiresIn: "12h" });
      const refreshToken = jwt.sign({ ...payload }, "newsecret", {
        expiresIn: "24h",
      });

      return helperWrapper.response(res, 200, 'success', { user, token, refreshToken })

    } catch (error) {
      return helperWrapper.response(res, 400, 'Bad request', null)
    }
  }
}