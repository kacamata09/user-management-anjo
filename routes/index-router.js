const express = require('express')
const indexRouter = express.Router()
const controllerIndex = require('../controller/index-controller')
// middleware
const midwareVerifLogin = require('../config/verifyLogin')

indexRouter.route('/')
    .get(midwareVerifLogin.isLogin, controllerIndex.tampil)

module.exports = indexRouter