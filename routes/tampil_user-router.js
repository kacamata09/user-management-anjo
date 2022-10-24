const express = require('express')
const controllerTampilUser = require('../controller/tampil_user-controller')
const midwareVerifAdmin = require('../config/verifyAdmin')

const tampilUserRouter = express.Router()


tampilUserRouter.get('/user', midwareVerifAdmin.isAdmin , controllerTampilUser.tampil)
tampilUserRouter.get('/user/hapus/:id', controllerTampilUser.hapus)
tampilUserRouter.get('/user/simpan/:id', controllerTampilUser.edit)

module.exports = tampilUserRouter