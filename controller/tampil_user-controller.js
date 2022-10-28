const koneksi = require('../config/database')

module.exports = {
    tampil(requ, resp) {
        const ambilData = 'select * from pengguna'
        koneksi.query(ambilData, (err, rows, field)=> {
            if (err) throw err
            const konfir = requ.flash('password')
            resp.render('tampil_user.ejs', {konfir, users:rows})
          
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

        koneksi.query(simpanData, [ambilData.nama, ambilData.email , ambilId], (err, rows, field)=> {
            if (err) throw err

            resp.redirect('/user')
        })
    },
    tampilEdit(requ, resp) {
        const ambilData = 'select * from pengguna where id = ?'
        const ambilId = requ.params.id

        koneksi.query(ambilData, ambilId, (err, rows, field) => {
            resp.render('user_edit.ejs', user=rows[0])
        })
    }
}