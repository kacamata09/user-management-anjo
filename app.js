const { application } = require('express')
const express = require('express')

// routes
const adminRoute = require('./routes/hal_admin-router')

// inisiasi aplikasi
const app = express()


// inisiasi router
app.use(adminRoute)






const PORT = 4000
const display = `SERVER INI BERJALAN DI PORT : ${PORT}`
app.listen(PORT, console.log(display))