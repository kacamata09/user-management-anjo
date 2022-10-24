const koneksi = require('../config/database')

module.exports = {
    tampil(requ, resp) {
        resp.render('login_user.ejs')
    },
    login(requ, resp) {
        const getData = requ.body
        const cariUser = 'select * from pengguna where email = ? and password = SHA2(?,512) ?'

        koneksi.query(cariUser, [requ.body.email, requ.body.password], (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                requ.session.loggedin = true;
                requ.session.userid = rows[0].id;
                requ.session.username = rows[0].nama;
                resp.redirect('/')
                return
            } else {
                resp.send('password atau email yang anda masukkan salah')
            }
        })
    }
}