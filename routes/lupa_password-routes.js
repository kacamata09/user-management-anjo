const controllerLupapass = require('../controller/lupa_password-controller')
const express = require('express')
const midwareKode = require('../config/verifKodeReset')

const lupaPassRouter = express.Router()

lupaPassRouter.get('/lupapassword', controllerLupapass.tampil)
lupaPassRouter.post('/lupapassword', controllerLupapass.cekEmail)
lupaPassRouter.get('/cekkode', midwareKode.isKirimEmail, controllerLupapass.tampilCekkode)
lupaPassRouter.post('/cekkode', controllerLupapass.cekKode)

// jangan lupa buat middleware verifikasi tokennya ini
lupaPassRouter.get('/ubahpass', midwareKode.isMasukkanKode, controllerLupapass.tampilUbahLupa)
lupaPassRouter.post('/ubahpass', controllerLupapass.ubahPassword)

module.exports = lupaPassRouter