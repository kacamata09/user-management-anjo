const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const koneksi = require('./config/database')
const multer = require('multer')

// koneksi database sequelize
const dbku = require('./config/databasesequelize')

// inisiasi library oidc provider
const Provider = require('oidc-provider')

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
const daftarClientRoute = require('./routes/daftarClient-routes')
// route oidc
const route_oidc = require('./routes/loginOpenid')

// inisiasi flash
const flash = require('connect-flash')


// inisiasi aplikasi
const app = express()


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

// route khusus oidc
// app.use()




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
app.use(daftarClientRoute)

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



// coba multer
app.get('/cobagambar', (requ, resp) => {
    resp.render('cobagambar.ejs')
})

app.post('/cobagambar', upload.single('gambar'), (requ, resp) => {
    console.log(requ.file)
    console.log(requ.file.path)
    resp.send('gambar tersimpan')
})


// oidc 
koneksi.query('select * from clientconfig', (err, rows, field) => {
        const listCl = []
        rows.forEach(cli => {
            listCl.push({
                client_id: cli.client_id,      
                client_secret: cli.client_secret,      
                grant_types: ["authorization_code"],      
               //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
                redirect_uris: [ cli.redirect_uri ], 
                response_types: ["code",],  
                  
              //other configurations if needed
             }) 
        })

        const oidc = new Provider('http://localhost:3000', {clients: listCl,
        pkce: {
        required: () => false,
        }, features : {
            devInteractions: {
                enabled : false}
        }
        })

        // 
        
        route_oidc(app, oidc)
        
        app.use('/oidc', oidc.callback())

    })



// koneksi db
const tersambung = async () => {
    await dbku.authenticate()
    console.log('mysql versi sequelize berjalan....')
}

tersambung()

const PORT = 3000
const display = `SERVER INI BERJALAN DI PORT : ${PORT}`
app.listen(PORT, console.log(display))