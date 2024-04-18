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

Router.post('/', userController.create)
Router.patch('/:id', userController.update)
Router.delete('/:id', userController.delete)

module.exports = Router;