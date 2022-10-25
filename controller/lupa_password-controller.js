const koneksi = require('../config/database')
const jwt = require('jsonwebtoken')

module.exports = {
    tampil(requ, resp) {
        resp.render('lupa_password.ejs')
    },
    cekEmail(requ, resp) {
        const email = requ.body.email
        const ambilId = requ.params.id
        const verifEmail = 'select * from pengguna where email = ?'
        const kodeReset = jwt.sign({email}, 'hacker jangan menyerang', {expiresIn:'5m'}, {algorithm:'HS256'})
        koneksi.query(verifEmail, email, (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                resp.redirect('/lupapassword')
                return
            }
        }) 
        
        
        
        
        koneksi.query()
    },
    ubahPassword(requ, resp) {
        const ubahPassword = 'update pengguna set password = SHA2(?, 512) where email = ?'
        koneksi.query()
    }
}

// // "use strict";
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // secure: false, 
    auth: {
      user: 'muh.ansharazhari@gmail.com', 
      pass: 'mvhmlommxlosyynb', 
    },
  });

  
  
const tokenReset = jwt.sign({username:'anshar'}, 'hacker jangan menyerang', {algorithm:'HS256', expiresIn:'5m'})
const body = `Apakah anda membutuhkan token untuk reset password, jika benar anda yanng meminta token untuk reset. Dibawah ini adalah token reset anda:

Kode reset = ${tokenReset}`

transporter.sendMail({
    from: 'muh.ansharazhari@gmail.com', 
    to: "muh.ansharibrahim@gmail.com",
    subject: "Reset Password dari web", 
    text: body, 

  },
  (err, info) => {
    if(err) throw err
    console.log(info.response)
  });


const token = '08820'
  const test = `Apakah anda membutuhkan token untuk reset password, jika benar anda yanng meminta token untuk reset. 
Dibawah ini adalah token reset anda:
  
token reset anda : ${token}`

  console.log(test)