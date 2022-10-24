const koneksi = require('../config/database')

module.exports = {
    tampilloginUser(requ, resp) {
        resp.render('login_user.ejs')
    },
    tampilloginAdmin(requ, resp) {
        resp.render('login_admin.ejs')
    },
    login_user(requ, resp) {
        const getData = requ.body
        const cariUser = 'select * from pengguna where email = ? and password = SHA2(?,512)'

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
                return
            }
        })
    },
    login_admin(requ, resp) {
        const getData = requ.body
        const cariUser = 'select * from pengguna where email = ? and password = SHA2(?,512)'

        koneksi.query(cariUser, [requ.body.email, requ.body.password], (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {
                if (rows[0].role === 'admin') {
                    requ.session.loggedin = true;
                    requ.session.userid = rows[0].id;
                    requ.session.username = rows[0].nama;
                    resp.redirect('/admin')
                    return
                } else {
                    resp.send('akun yang anda masukkan bukanlah akun admin melainkan user')
                    return
                }
            } else {
                resp.send('password atau email yang anda masukkan salah')
                return
            }
        })
    },

}