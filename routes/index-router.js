const express = require('express')
const indexRouter = express.Router()
const controllerIndex = require('../controller/index-controller')
// middleware
const midwareVerifLogin = require('../config/verifyLogin')
const midwareVerifIngat = require('../config/verifIngat')

indexRouter.route('/beranda')
    .get([midwareVerifIngat.ingatSaya, midwareVerifLogin.isLogin], controllerIndex.tampil)

module.exports = indexRouter