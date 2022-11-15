const express = require('express')
const controllerLogin = require('../controller/login-controller')
// middleware
const midwareVerifLogin = require('../config/verifyLogin')

const loginUserRouter = express.Router()

loginUserRouter.route('/login', )
    .get(midwareVerifLogin.isLogout ,controllerLogin.tampilloginUser)
    .post(controllerLogin.login_user)


module.exports = loginUserRouter
;
