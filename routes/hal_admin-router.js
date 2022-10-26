const express = require('express')
const midwwaraVerifAdmin = require('../config/verifyAdmin')
const controllerhalAdmin = require('../controller/hal_admin-controller')



const adminRoute = express.Router()

adminRoute.route('/admin')
    .get(midwwaraVerifAdmin.isAdmin, controllerhalAdmin.tampil)


module.exports = adminRoute
