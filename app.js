const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const koneksi = require('./config/database')
const multer = require('multer')
const helmet = require('helmet')

// cari akun
const cariAkun = require('./pengguna/cariakun')

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


// helmet
// app.use(helmet())


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
    name: 'sesiLogin',
    cookie: {
        sameSite: true,
        maxAge: 6000 * 10 * 24
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
app.use(daftarClientRoute)

// coba dashboard dari johan
app.get('/coba', (requ, resp) => {
    resp.render('portal.ejs')
})

app.get('/hitam', (requ, resp) => {
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
                client_name:cli.nama_client,
                client_id: cli.client_id,      
                client_secret: cli.client_secret,      
                grant_types: ["authorization_code"],      
               //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
                redirect_uris: [ cli.redirect_uri ], 
                response_types: ["code",],  
                logo_uri: `http://localhost:3000/logo_client/${cli.logo_app}`
                  
              //other configurations if needed
             }) 
        })

        const oidc = new Provider('http://localhost:3000', {clients: listCl,
        pkce: {
        required: () => false,
        }, 
        claims :{
            // openid: [
            //   'sub'
            // ],
            // email: ['email', 'email_verified'],
            // profile: ['nama', 'email', 'role', 'status'],
          },
          findAccount: cariAkun.findAccount,
          jwks: {
            keys: [
              {
                d: 'VEZOsY07JTFzGTqv6cC2Y32vsfChind2I_TTuvV225_-0zrSej3XLRg8iE_u0-3GSgiGi4WImmTwmEgLo4Qp3uEcxCYbt4NMJC7fwT2i3dfRZjtZ4yJwFl0SIj8TgfQ8ptwZbFZUlcHGXZIr4nL8GXyQT0CK8wy4COfmymHrrUoyfZA154ql_OsoiupSUCRcKVvZj2JHL2KILsq_sh_l7g2dqAN8D7jYfJ58MkqlknBMa2-zi5I0-1JUOwztVNml_zGrp27UbEU60RqV3GHjoqwI6m01U7K0a8Q_SQAKYGqgepbAYOA-P4_TLl5KC4-WWBZu_rVfwgSENwWNEhw8oQ',
                dp: 'E1Y-SN4bQqX7kP-bNgZ_gEv-pixJ5F_EGocHKfS56jtzRqQdTurrk4jIVpI-ZITA88lWAHxjD-OaoJUh9Jupd_lwD5Si80PyVxOMI2xaGQiF0lbKJfD38Sh8frRpgelZVaK_gm834B6SLfxKdNsP04DsJqGKktODF_fZeaGFPH0',
                dq: 'F90JPxevQYOlAgEH0TUt1-3_hyxY6cfPRU2HQBaahyWrtCWpaOzenKZnvGFZdg-BuLVKjCchq3G_70OLE-XDP_ol0UTJmDTT-WyuJQdEMpt_WFF9yJGoeIu8yohfeLatU-67ukjghJ0s9CBzNE_LrGEV6Cup3FXywpSYZAV3iqc',
                e: 'AQAB',
                kty: 'RSA',
                n: 'xwQ72P9z9OYshiQ-ntDYaPnnfwG6u9JAdLMZ5o0dmjlcyrvwQRdoFIKPnO65Q8mh6F_LDSxjxa2Yzo_wdjhbPZLjfUJXgCzm54cClXzT5twzo7lzoAfaJlkTsoZc2HFWqmcri0BuzmTFLZx2Q7wYBm0pXHmQKF0V-C1O6NWfd4mfBhbM-I1tHYSpAMgarSm22WDMDx-WWI7TEzy2QhaBVaENW9BKaKkJklocAZCxk18WhR0fckIGiWiSM5FcU1PY2jfGsTmX505Ub7P5Dz75Ygqrutd5tFrcqyPAtPTFDk8X1InxkkUwpP3nFU5o50DGhwQolGYKPGtQ-ZtmbOfcWQ',
                p: '5wC6nY6Ev5FqcLPCqn9fC6R9KUuBej6NaAVOKW7GXiOJAq2WrileGKfMc9kIny20zW3uWkRLm-O-3Yzze1zFpxmqvsvCxZ5ERVZ6leiNXSu3tez71ZZwp0O9gys4knjrI-9w46l_vFuRtjL6XEeFfHEZFaNJpz-lcnb3w0okrbM',
                q: '3I1qeEDslZFB8iNfpKAdWtz_Wzm6-jayT_V6aIvhvMj5mnU-Xpj75zLPQSGa9wunMlOoZW9w1wDO1FVuDhwzeOJaTm-Ds0MezeC4U6nVGyyDHb4CUA3ml2tzt4yLrqGYMT7XbADSvuWYADHw79OFjEi4T3s3tJymhaBvy1ulv8M',
                qi: 'wSbXte9PcPtr788e713KHQ4waE26CzoXx-JNOgN0iqJMN6C4_XJEX-cSvCZDf4rh7xpXN6SGLVd5ibIyDJi7bbi5EQ5AXjazPbLBjRthcGXsIuZ3AtQyR0CEWNSdM7EyM5TRdyZQ9kftfz9nI03guW3iKKASETqX2vh0Z8XRjyU',
                use: 'sig',
              }, {
                crv: 'P-256',
                d: 'K9xfPv773dZR22TVUB80xouzdF7qCg5cWjPjkHyv7Ws',
                kty: 'EC',
                use: 'sig',
                x: 'FWZ9rSkLt6Dx9E3pxLybhdM6xgR5obGsj5_pqmnz5J4',
                y: '_n8G69C-A2Xl4xUW2lF0i8ZGZnk_KPYrhv4GbTGu5G4',
              },
            ],
          },
        features : {
            devInteractions: {
                enabled : false},
            jwtUserinfo : {
                enabled: true
            }, 
            deviceFlow: { enabled: true }, 
            revocation: {
                enabled:true
            }, 
            backchannelLogout: {
                enabled: true
            },
            jwtUserinfo: {
                enabled: true
            },
            rpInitiatedLogout: {
                enabled: true,
                logoutSource: [async function logoutSource(ctx, form) {
                    // @param ctx - koa request context
                    // @param form - form source (id="op.logoutForm") to be embedded in the page and submitted by
                    //   the End-User
                    ctx.body = `<!DOCTYPE html>
                      <head>
                        <title>Logout Request</title>
                        <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
                      </head>
                      <body>
                        <div>
                          <h1>Do you want to sign-out from ${ctx.host}?</h1>
                          ${form}
                          <button autofocus type="submit" form="op.logoutForm" value="yes" name="logout">Yes, sign me out</button>
                          <button type="submit" form="op.logoutForm">No, stay signed in</button>
                        </div>
                      </body>
                      </html>`;
                  }],
                  postLogoutSuccessSource: [async function postLogoutSuccessSource(ctx) {
                    // @param ctx - koa request context
                    const {
                      clientId, clientName, clientUri, initiateLoginUri, logoUri, policyUri, tosUri,
                    } = ctx.oidc.client || {}; // client is defined if the user chose to stay logged in with the OP
                    const display = clientName || clientId;
                    ctx.body = `<!DOCTYPE html>
                      <head>
                        <title>Sign-out Success</title>
                        <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
                      </head>
                      <body>
                        <div>
                          <h1>Sign-out Success</h1>
                          <p>Your sign-out ${display ? `with ${display}` : ''} was successful.</p>
                        </div>
                      </body>
                      </html>`;
                  }]
            }
            
        }, 
        
        // revokeGrantPolicy: function revokeGrantPolicy(ctx) {
        //     return true;
            
              
        // }
        })

        // helmet provider
        // oidc.app.use(helmet())
        // rute oidc
        route_oidc(app, oidc)
        
        app.use('/oidc', oidc.callback())

    })



// koneksi db
const tersambung = async () => {
    await dbku.authenticate()
    console.log('mysql versi sequelize berjalan....')
}

tersambung()



// halaman error 404
// app.use(function(requ, resp, next) {
//   resp.status(404)
//     // respond with html page
//   if (requ.accepts('html')) {
//     resp.render('halaman_error/404', { url: requ.url });
//     // resp.send(`<h1>Maaf halaman ya`)
//     return;
//   }

//   // respond with json
//   if (requ.accepts('json')) {
//     resp.json({ error: 'Not found' });
//     return;
//   }

//   // default to plain-text. send()
//   resp.type('txt').send('Not found');
  

  
// });

const PORT = 3000
const display = `SERVER INI BERJALAN DI PORT : ${PORT}`
app.listen(PORT, console.log(display))