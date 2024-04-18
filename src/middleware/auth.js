const jwt = require('jsonwebtoken');
const helperWrapper = require('../helper/wrapper');

module.exports = {
  authentication: async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return helperWrapper.response(res, 401, "you are not logged in", null);
    }

    token = token.split(" ")[1];

    jwt.verify(token, "secret", (error, result) => {
      if (error) {
        return helperWrapper.response(res, 403, error.message, null);
      }

      req.decodeToken = result;

      next();
    });
  }
}