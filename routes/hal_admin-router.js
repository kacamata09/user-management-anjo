const express = require('express')


const adminRoute = express.Router()

adminRoute.route('/admin')
    .get((requ, resp) => {
        resp.send('Ini halaman admin')
    })


module.exports = adminRoute