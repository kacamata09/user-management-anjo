const express = require('express')
const controllerRegis = require('../controller/register-controller')

const registerUserRouter = express.Router()

registerUserRouter.route('/user/register')
    .get(controllerRegis.tampil)
    .post(controllerRegis.tambah)

module.exports = registerUserRouter