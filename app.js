const express = require('express')
const bodyParser = require('body-parser')

// routes
const adminRoute = require('./routes/hal_admin-router')
const indexRoute = require('./routes/index-router')
const loginUserRoute = require('./routes/login_user-router')
const registerRoute = require('./routes/register-router')


// inisiasi aplikasi
const app = express()

// iniasiasi si ejs
app.set('view engine', 'ejs')

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// inisiasi router
app.use(adminRoute)
app.use(indexRoute)
app.use(loginUserRoute)
app.use(registerRoute)







const PORT = 4000
const display = `SERVER INI BERJALAN DI PORT : ${PORT}`
app.listen(PORT, console.log(display))