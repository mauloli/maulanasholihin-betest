const express = require('express');
const Router = express.Router();
const userController = require('./user.controller');
const middlewareAuth = require('../middleware/auth');
const middlewareRedis = require('../middleware/redis');

Router.get(
  '/',
  middlewareAuth.authentication,
  middlewareRedis.find,
  userController.find,
)

Router.get(
  '/:id',
  middlewareAuth.authentication,
  middlewareRedis.get,
  userController.get
)

Router.post('/', middlewareRedis.clear, userController.create)
Router.patch('/:id', middlewareRedis.clear, userController.update,)
Router.delete('/:id', middlewareRedis.clear, userController.delete)

module.exports = Router;