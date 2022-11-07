const express = require('express')
const client_controller = require('../controller/daftarClient-controller')
const oidc_controller = require('../controller/oidc-controller')

const clientRouter = express.Router()


clientRouter.route('/client')
    .get(client_controller.tampilDaftarClient)
    .post(client_controller.tambahClient)

clientRouter.get('/client/edit/:client_id')



// clientRouter.use('/oidc',  oidc_controller.oidece.callback())

module.exports = clientRouter