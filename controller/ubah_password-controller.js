const koneksi = require("../config/database")

module.exports = {
    tampil(requ, resp) {
        resp.render('ubah_password.ejs')
    },
    ubah(requ, resp) {
        const ambilUser = 'select * from pengguna where id = ?'
        const cekPassword = 'select * from pengguna where id = ? and password = SHA2(?, 512)'
        const ambilId = requ.session.userid
        const ambilPassword = requ.body
        const editPassword = 'update pengguna set password = SHA2(?, 512) where id = ?'

        // koneksi.query(ambilUser, ambilId, (err, rows, field) => {
        //     if (err) throw err
            koneksi.query(cekPassword, [ambilId, ambilPassword.password_lama], (err, rows, field) => {
                if (err) throw err

                if (rows.length > 0) {
                    koneksi.query(editPassword, [ambilPassword.password_baru, ambilId], (err, rows, field) => {
                        if (err) throw err
                        resp.send('selamat password anda berhasil diperbarui')
                        return
                    })
                } else {
                    resp.send('password lama anda salah')
                    return
                }

                
            })
            
        // })
    }
}