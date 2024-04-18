const express = require('express');
const Router = express();
const userRoute = require('../user/user.routes');
const authRoute = require('../authentication/auth.routes')

Router.use('/users', userRoute);
Router.use('/authentication', authRoute)

module.exports = Router;