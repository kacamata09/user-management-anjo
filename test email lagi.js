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