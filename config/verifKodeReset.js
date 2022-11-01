const koneksi = require('../config/database')
module.exports = {
    isKirimEmail(requ, resp, next) {
        if (requ.session.iniemail == true) {
            next()
            return
        }
        // resp.send('anda belum mengirim kode reset ke email')
        resp.render('halaman_error/cek_email')
    },
    isMasukkanKode(requ, resp, next) {
        // requ.session.destroy()
        const email = requ.session.iniemail
        const cariEmail = 'select * from cek_email where email = ?'
        koneksi.query(cariEmail, email, (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                
                next()
                return
            } else {
                resp.render('halaman_error/verif_token')
            }
        })
    }
}