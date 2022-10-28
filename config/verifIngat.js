const koneksi = require('../config/database')

module.exports = {
    ingatSaya(requ, resp, next) {
        const cariEmail = 'select * from session where email = ?'
        const email = requ.cookies.email
        koneksi.query(cariEmail, )
    }
}