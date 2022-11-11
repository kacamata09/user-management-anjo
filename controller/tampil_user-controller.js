const koneksi = require('../config/database')

module.exports = {
    tampil(requ, resp) {
        const ambilData = 'select * from pengguna'
        koneksi.query(ambilData, (err, rows, field)=> {
            if (err) throw err
            // const konfir = requ.flash('password')
            const pesan = requ.flash('email')
            resp.render('tampil_user.ejs', {pesan, users:rows})
          
        })
    },
    hapus(requ, resp) {
        const hapusData = 'delete from pengguna where id = ?'
        const ambilId = requ.params.id
        koneksi.query(hapusData, ambilId, (err, rows, field)=> {
            if (err) throw err
            resp.redirect('/user')
        })
    },
    edit(requ, resp) {
        const simpanData = 'update pengguna set nama = ?, email = ? where id = ?'
        const ambilId = requ.params.id
        const ambilData = requ.body
        koneksi.query('select * from pengguna where email = ?', ambilData.email, (err, rows, field) => {
            if (err) throw err

            if (rows.length > 0) {
                requ.flash('pesan', 'Email yang anda masukkan sudah terdaftar sebelumnya')
                resp.redirect(`/user/edit/${ambilId}`)
            } else {
                koneksi.query(simpanData, [ambilData.nama, ambilData.email , ambilId], (err, rows, field)=> {
                    if (err) throw err
        
                    resp.redirect('/user')
                })
            }
        })
       
    },
    tampilEdit(requ, resp) {
        const ambilData = 'select * from pengguna where id = ?'
        const ambilId = requ.params.id
        const pesan = requ.flash('pesan')

        koneksi.query(ambilData, ambilId, (err, rows, field) => {
            resp.render('user_edit.ejs', {user:rows[0], pesan})
        })
    }
}