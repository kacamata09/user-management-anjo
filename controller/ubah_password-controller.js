const koneksi = require("../config/database")
const bcrypt = require('bcrypt')

module.exports = {
    tampil(requ, resp) {
        const pesan = requ.flash('salah')
        const sukses = requ.flash('sukses')
        resp.render('ubah_password.ejs', {pesan, sukses})
    },
    ubah(requ, resp) {
        const cekUser = 'select * from pengguna where id = ?'
        const ambilId = requ.session.userid
        const ambilPassword = requ.body
        const editPassword = 'update pengguna set password = ? where id = ?'
        // koneksi.query(ambilUser, ambilId, (err, rows, field) => {
        //     if (err) throw err
            koneksi.query(cekUser, ambilId, async (err, rows, field) => {
                if (err) throw err
                const hashPasswordBaru = await bcrypt.hash(ambilPassword.password_baru, 10)
                const passwordHashLama = await bcrypt.compare(ambilPassword.password_lama, rows[0].password)

                if (passwordHashLama) {
                    koneksi.query(editPassword, [hashPasswordBaru, ambilId], (err, rows, field) => {
                        if (err) throw err
                        // resp.send('selamat password anda berhasil diperbarui')
                        requ.flash('sukses', 'selamat password anda sudah diperbarui')
                        resp.redirect('/ubahpassword/')
                        return
                    })
                } else {
                    // resp.send('password lama anda salah')
                    requ.flash('salah', 'Password lama yang anda masukkan salah')
                    resp.redirect('/ubahpassword/')
                    return
                }

                
            })
            
        // })
    }
}