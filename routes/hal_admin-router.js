const express = require('express')
const midwwaraVerifAdmin = require('../config/verifyAdmin')
const controllerhalAdmin = require('../controller/hal_admin-controller')
const midwareIngatSaya = require('../config/verifIngat')



const adminRoute = express.Router()

adminRoute.route('/admin')
    .get([midwareIngatSaya.ingatSaya, midwwaraVerifAdmin.isAdmin], controllerhalAdmin.tampil)


module.exports = adminRoute
