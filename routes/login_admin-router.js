const express = require('express')
const { login } = require('../controller/login-controller')
const controllerLogin = require('../controller/login-controller')

const loginAdminRouter = express.Router()

loginAdminRouter.route('/admin/login')
    .get(controllerLogin.tampilloginAdmin)
    .post(controllerLogin.login_admin)

module.exports = loginAdminRouter