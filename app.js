const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')

// routes
const adminRoute = require('./routes/hal_admin-router')
const indexRoute = require('./routes/index-router')
const loginUserRoute = require('./routes/login_user-router')
const registerRoute = require('./routes/register-router')
// const loginAdminRoute = require('./routes/login_admin-router')
const logoutRoute = require('./routes/logout-routes')
const tampiUserRoute = require('./routes/tampil_user-router')
const ubahPasswordRoute = require('./routes/ubah_password-router')
const lupaPasswordRoute = require('./routes/lupa_password-routes')

// inisiasi flash
const flash = require('connect-flash')
const koneksi = require('./config/database')


// inisiasi aplikasi
const app = express()

// session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'hacker, jangan menyerang',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 600000
    },
}))
app.use(cookieParser())
app.use(flash())

// iniasiasi si ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'static')))

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// inisiasi router
app.use(adminRoute)
app.use(indexRoute)
app.use(loginUserRoute)
app.use(registerRoute)
// app.use(loginAdminRoute)
app.use(logoutRoute)
app.use(tampiUserRoute)
app.use(ubahPasswordRoute)
app.use(lupaPasswordRoute)

// coba dashboard dari johan
app.get('/coba', (requ, resp) => {
    resp.render('index.ejs')
})

// coba flash
app.get('/cobacoba', (requ, resp) => {
    resp.render('cobaflash.ejs')
})

// coba konfirmasi hapus
app.get('/cobahapus', (requ, resp) => {
    resp.render('hapus.ejs')
})

// coba sso berbasis jwt 
app.get('/auth/', (requ, resp) => {
    const token = requ.query.token
    const client_id = token.client_id
    const redirect_uri = token.redirect_uri
    koneksi.query('select * from clientconfig where client_id = ? and redirect_uri = ?', [client_id, redirect_uri], (err, rows, field) => {
        if (err) throw err

        if(rows.length > 0) {
            resp.redirect(`/login?client_id=${client_id}`)
            return
        }

    })
})

app.get('/token', (requ, resp) => {
    const client_id = requ.query.client_id
    koneksi.query('select * from clientconfig where client_id = ?', client_id, (err, rows, field)=>{
        
    })
})





const PORT = 3000
const display = `SERVER INI BERJALAN DI PORT : ${PORT}`
app.listen(PORT, console.log(display))