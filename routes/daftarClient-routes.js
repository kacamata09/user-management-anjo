const express = require('express')
const clientController = require('../controller/client-controller')
const client_controller = require('../controller/daftarClient-controller')
const oidc_controller = require('../controller/oidc-controller')
const midwareIngatSaya = require('../config/verifIngat')
const midwwaraVerifAdmin = require('../config/verifyAdmin')
const midwareLogin = require('../config/verifyLogin')
const multer = require('multer')
const clientRouter = express.Router()

// multer 
const penyimpanan = multer.diskStorage({
    destination: (requ, file, cb) => {
        cb(null, './static/logo_client')
    },
    filename: (requ, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({storage:penyimpanan})



clientRouter.route('/client')
    .get([midwareIngatSaya.ingatSaya, midwwaraVerifAdmin.isAdmin], client_controller.tampilDaftarClient)
    .post(upload.single('logo_aplikasi'), client_controller.tambahClient)

clientRouter.get('/client/edit/:client_id',midwwaraVerifAdmin.isAdmin, client_controller.tampilEdit)
clientRouter.post('/client/edit/:client_id',midwwaraVerifAdmin.isAdmin, client_controller.editClient)
clientRouter.get('/client/hapus/:client_id',midwwaraVerifAdmin.isAdmin, client_controller.hapusClient)
clientRouter.get('/', midwareLogin.isLogin, midwareIngatSaya.ingatSaya, client_controller.tampilPortal)




// clientRouter.use('/oidc',  oidc_controller.oidece.callback())

module.exports = clientRouter