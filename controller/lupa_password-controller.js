const koneksi = require('../config/database')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // secure: false, 
    auth: {
      user: 'muh.ansharazhari@gmail.com', 
      pass: 'mvhmlommxlosyynb', 
    },
  });

module.exports = {
    tampil(requ, resp) {
        resp.render('lupa_password.ejs')
    },
    cekEmail(requ, resp) {
        const email = requ.body.email
        const verifEmail = 'select * from pengguna where email = ?'
        const kodeReset = jwt.sign({email}, 'hacker jangan menyerang', {expiresIn:'5m', algorithm:'HS256'})
        koneksi.query(verifEmail, email, (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                const body = `Apakah anda membutuhkan token untuk reset password, jika benar anda yanng meminta token untuk reset. Dibawah ini adalah token reset anda:

Kode reset = ${kodeReset}`

            transporter.sendMail({
                from: 'muh.ansharazhari@gmail.com', 
                to: email,
                subject: "Reset Password dari web", 
                text: body, 

            },
            (err, info) => {
                if(err) throw err
                console.log(info.response)
            })
            resp.redirect('/cekkode')

                return
            } 
            resp.send('email yang anda masukkan tidak terdaftar pada database kami')
            return
        }) 


    },
    ubahPassword(requ, resp) {
        const ubahPassword = 'update pengguna set password = SHA2(?, 512) where email = ?'
        koneksi.query()
        resp.send('ini')
    },
    tampilCekkode(requ, resp) {
        resp.render('cek_kodereset.ejs')
    },
    tampilUbahLupa(requ, resp) {
        resp.render('ubah_lupapass')
    }
}

