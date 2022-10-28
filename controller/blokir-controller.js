const koneksi = require("../config/database");

module.exports = {
    blokirUser(requ, resp) {
        const simpanData = 'update pengguna set status = ? where id = ?'
        const ambilId = requ.params.id
        koneksi.query('select * from pengguna where id = ?', ambilId, (err, rows, field) => {
            if (err) throw err
            if (rows[0].status != 'blokir') {
                koneksi.query(simpanData, ['blokir', ambilId], (err, rows, field)=> {
                    if (err) throw err
                    resp.redirect('/user')
                })
            } else {
                koneksi.query(simpanData, ['aman', ambilId], (err, rows, field)=> {
                    if (err) throw err
                    resp.redirect('/user')
                })
            }
        })
       
    }
}