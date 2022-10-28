const koneksi = require("../config/database");

module.exports = {
    blokirUser(requ, resp) {
        const simpanData = 'update pengguna set status = ? where id = ?'
        const ambilId = requ.params.id

        koneksi.query(simpanData, ['blokir', ambilId], (err, rows, field)=> {
            if (err) throw err
            resp.redirect('/user')
        })
    }
}