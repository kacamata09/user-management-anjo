const koneksi = require('../config/database')

module.exports = {
    tampilloginUser(requ, resp) {
        const pesan = requ.flash('login')
        console.log(pesan)
        resp.render('login_user.ejs', {pesan})
    },
    tampilloginAdmin(requ, resp) {
        const pesan = requ.flash('login')
        console.log(pesan)
        resp.render('login_admin.ejs', {pesan})
    },
    login_user(requ, resp) {
        const getData = requ.body
        const cariUser = 'select * from pengguna where email = ? and password = SHA2(?,512)'
        if (getData.ingat === '1') {
            koneksi.query('insert into session values(?)', getData.email, (err, rows, field) => {
                resp.cookie('email', getData.email)
            })

        }
        console.log(requ.cookies.email)
        console.log(getData.ingat)
        koneksi.query(cariUser, [getData.email, getData.password], (err, rows, field) => {
            if (err) throw err
            if (rows.length > 0) {

                if (rows[0].status == 'blokir') {
                    requ.flash('login', 'Akun anda di blokir, silahkan hubungi admin mengapa akun anda di blokir, apakah kamu ada salah ke dia')
                    resp.redirect('/login')
                    return
                }
                
                requ.session.loggedin = true;
                requ.session.userid = rows[0].id;
                requ.session.username = rows[0].nama;
                if (rows[0].role == 'admin') {
                    resp.redirect('/admin')
                    return
                }
                resp.redirect('/')
                return
            } else {
                requ.flash('login', 'Password atau email yang anda masukkan salah')
                // resp.send('password atau email yang anda masukkan salah')
                resp.redirect('/login')
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
                    requ.flash('login', 'Akun yang anda masukkan bukanlah akun admin melainkan akun user')
                    // resp.send('akun yang anda masukkan bukanlah akun admin melainkan user')
                    resp.redirect('/login')
                    return
                }
            } else {
                requ.flash('login', 'Password atau email yang anda masukkan salah')
                // resp.send('password atau email yang anda masukkan salah')
                resp.redirect('/admin/login')
                // resp.send('password atau email yang anda masukkan salah')
                // resp.redirect('/admin/login')
                return
            }
        })
    },
    logout(requ, resp) {
        // requ.flash('login', 'Selamat anda telah berhasil logout')
        const email = requ.cookies.email
        koneksi.query('delete from session where email = ?', email)
        requ.session.destroy(function(err) {
            // resp.send('selamat anda berhasil logout, silahkan login <a href="/login">Login</a>')
        })
        resp.redirect('/login');
    }

}