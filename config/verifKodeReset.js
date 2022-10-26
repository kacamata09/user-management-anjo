const koneksi = require('../config/database')
module.exports = {
    isKirimEmail(requ, resp, next) {
        if (requ.session.iniemail == true) {
            next()
            return
        }
        resp.send('anda belum mengirim kode reset ke email')
    },
    isMasukkanKode(requ, resp, next) {
        // requ.session.destroy()
        requ.session.destroy(function(err) {} )
        const cariEmail = 'select * from cek_email'
        koneksi.query(cariEmail, (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                next()
                return
            } else {
                resp.send('anda belum memasukkan token')
            }
        })
    }
}