const koneksi = require('../config/database')

module.exports = {
    ingatSaya(requ, resp, next) {
        const cariEmail = 'select * from session where email = ?'
        const email = requ.cookies.email
        if (email == undefined) {
            next()
            return
        } else {
            koneksi.query(cariEmail, email, (err, rows, field) => {
                if (err) throw err
                if (rows.length > 0) {
                    koneksi.query('select * from pengguna where email = ?', email, (err, rows, field) => {
                        if (err) throw err

                        requ.session.loggedin = true;
                        requ.session.userid = rows[0].id;
                        requ.session.username = rows[0].nama;
                        next()
                        return
                    })
                } else {
                    next()
                    return
                }
            })
        }
    }
}