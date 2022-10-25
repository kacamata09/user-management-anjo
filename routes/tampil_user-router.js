const express = require('express')
const controllerTampilUser = require('../controller/tampil_user-controller')
const midwareVerifAdmin = require('../config/verifyAdmin')

const tampilUserRouter = express.Router()


tampilUserRouter.get('/user', midwareVerifAdmin.isAdmin, controllerTampilUser.tampil)
tampilUserRouter.get('/user/hapus/:id', midwareVerifAdmin.isAdmin, controllerTampilUser.hapus)
tampilUserRouter.get('/user/edit/:id', midwareVerifAdmin.isAdmin, controllerTampilUser.tampilEdit)
tampilUserRouter.post('/user/edit/:id', controllerTampilUser.edit)

module.exports = tampilUserRouter