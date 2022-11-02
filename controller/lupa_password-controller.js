const koneksi = require('../config/database')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const PASSW = 'ifnahgglwaoqhmck'
const bcrypt = require('bcrypt')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // secure: false, 
    auth: {
      user: 'anshartestmail@gmail.com', 
      pass: PASSW, 
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
                const linKReset = `<h2>Apakah anda membutuhkan token untuk reset password, jika benar anda yanng meminta token untuk reset. Dibawah ini adalah link reset password anda: </h2> <br> <br> Reset Password = <a href = "localhost:3000/cekkode/${kodeReset}">Ini link reset password anda</a>`
                const pesanKode = `Apakah anda membutuhkan token untuk reset password, jika benar anda yanng meminta token untuk reset. Dibawah ini adalah link reset password anda:

Reset Password = localhost:3000/cekkode/${kodeReset}`

            requ.session.iniemail = true
            transporter.sendMail({
                from: 'muh.ansharazhari@gmail.com', 
                to: email,
                subject: "Reset Password dari web", 
                text: pesanKode, 
                // html: linKReset
                
            },
            (err, info) => {
                if(err) throw err
                console.log(info.response)
            })
       
            resp.render('halaman_error/liat_email.ejs')
            return
            } 
            requ.flash('info', 'email yang anda masukkan tidak terdaftar pada database kami')
            // resp.redirect('/lupapassword')
            resp.send('email yang anda masukkan tidak terdaftar pada database kami')
            return
        }) 

    },
    ubahPassword(requ, resp) {
        const ubahPassword = 'update pengguna set password = ? where email = ?'
        const cekEmail = 'select * from cek_email'
        const password_baru = requ.body.passwordbaru
        const konfirmasi_password = requ.body.konfirpassword
        const hapusEmail = 'delete from cek_email where email = ?'

        koneksi.query(cekEmail, async (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                const email = rows[0].email
                console.log(email)
                if (password_baru == konfirmasi_password) {
                    const hashPasswordBaru = await bcrypt
                    koneksi.query(ubahPassword, [password_baru, email], (err, rows, field) => {
                        if (err) throw err
                        koneksi.query(hapusEmail, email)
                        requ.flash('login', 'Selamat password anda berhasil diubah')
                        resp.redirect('/login')
                        // resp.send('selamat password anda sudah berhasil diubah, silahkan login <a href="/login">Login</a>')
                        return
                    })
                } else {
                    requ.flash('salah', 'Password baru dan konfirmasi password belum sejalan')
                    resp.send('password baru dan konfirmasi password belum sejalan')
                    return
                }
            } else {
                requ.flash('kodereset', 'Anda belum melakukan verinodemnfikasi kode reset')
                resp.send('anda belum melakukan verifikasi kode reset')
                return
            }
        })
        // resp.send('ini ada kesalahan')
        // return
    },
    tampilCekkode(requ, resp) {
        // resp.render('cek_kodereset.ejs')
        const ambilKode = requ.params.token
        try {
            const kodeReset = jwt.verify(ambilKode, 'hacker jangan menyerang', {algorithms:'HS256'})
            // console.log(kodeReset)
                // simpan email ke dalam tabel email
                koneksi.query('insert into cek_email values(?)', kodeReset.email, (err, rows, field) => {
                    resp.redirect('/ubahpass')
                    return
                })
           
        } catch(err) {
            requ.flash('tokensalah', 'ada kesalahan pada kode yang anda masukkan, kemungkinan expire atau salah')
            // resp.send('ada kesalahan pada kode yang anda masukkan, kemungkinan expire atau salah')
            resp.render('halaman_error/token_kadaluarsa.ejs')
            // resp.redirect('/cekkode')
        }
    },
    cekKode(requ, resp) {
        const ambilKode = requ.body.kode
        try {
            const kodeReset = jwt.verify(ambilKode, 'hacker jangan menyerang', {algorithms:'HS256'})
            // console.log(kodeReset)
            if (kodeReset) {
                // simpan email ke dalam tabel email
                koneksi.query('insert into cek_email values(?)', kodeReset.email, (err, rows, field) => {
                    resp.redirect('/ubahpass')
                    return
                })
            } else {
                
                resp.send('anda belum memasukkan kodenya')
        }
        } catch(err) {
            requ.flash('tokensalah', 'ada kesalahan pada kode yang anda masukkan, kemungkinan expire atau salah')
            resp.send('ada kesalahan pada kode yang anda masukkan, kemungkinan expire atau salah')
            // resp.redirect('/cekkode')
        }
    },
    tampilUbahLupa(requ, resp) {
        resp.render('ubah_lupapass')
    }
}

