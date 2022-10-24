const express = require('express')
const controllerTampilUser = require('../controller/tampil_user-controller')
const midwareVerifAdmin = require('../config/verifyAdmin')

const tampilUserRouter = express.Router()


tampilUserRouter.get('/user', midwareVerifAdmin.isAdmin , controllerTampilUser.tampil)
tampilUserRouter.get('/user/hapus/:id', controllerTampilUser.hapus)
tampilUserRouter.get('/user/edit/:id', controllerTampilUser.tampilEdit)
tampilUserRouter.post('/user/edit/:id', controllerTampilUser.edit)

module.exports = tampilUserRouter