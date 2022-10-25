const controllerLupapass = require('../controller/lupa_password-controller')
const express = require('express')

const lupaPassRouter = express.Router()

lupaPassRouter.get('/lupapassword', controllerLupapass.tampil)
lupaPassRouter.post('/lupapassword', controllerLupapass.cekEmail)
lupaPassRouter.get('/cekkode', controllerLupapass.tampilCekkode)
lupaPassRouter.get('/ubahpass', controllerLupapass.tampilUbahLupa)

module.exports = lupaPassRouter