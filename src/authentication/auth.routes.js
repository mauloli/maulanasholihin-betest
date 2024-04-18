const express = require('express');
const Router = express.Router();
const authController = require('./auth.controller');

Router.post('/',authController.create)

module.exports = Router;