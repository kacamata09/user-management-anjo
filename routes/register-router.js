const express = require('express')
const controllerRegis = require('../controller/register-controller')
const midwareVerifAdmin = require('../config/verifyAdmin')

const registerUserRouter = express.Router()

registerUserRouter.route('/user/register')
    .get(midwareVerifAdmin.isAdmin, controllerRegis.tampil)
    .post(controllerRegis.tambah)

module.exports = registerUserRouter