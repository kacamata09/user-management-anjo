const express = require('express')
const midwareVerifLogin = require('../config/verifyLogin')
const controllerUbahPassword = require('../controller/ubah_password-controller')

const ubahPasswordRouter = express.Router()

ubahPasswordRouter.route('/ubahpassword/:id')
    .get(midwareVerifLogin.isLogin, controllerUbahPassword.tampil)
    .post(midwareVerifLogin.isLogin, controllerUbahPassword.ubah)

module.exports = ubahPasswordRouter