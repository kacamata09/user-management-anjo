const express = require('express')
const controllerLogin = require('../controller/login-controller')
const midwareVerifLogin = require('../config/verifyLogin')
const logoutRouter = express.Router()

logoutRouter.route('/logout')
    .get(midwareVerifLogin.isLogin, controllerLogin.logout)

module.exports = logoutRouter