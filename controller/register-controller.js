const koneksi = require('../config/database')

module.exports = {
    tampil(requ, resp) {
        // console.log()
        resp.render('register.ejs')
    },
    tampilFlash(requ, resp) {
        
    },
    tambah(requ, resp) {
        const simpanData = 'insert into pengguna(nama, email, role, password, status) values(?,?,?,SHA2(?,512), "aman")'
        const getData = requ.body
        const cariData = 'select * from pengguna where email = ?'
        if (getData.password != getData.confirmPassword) {
            requ.flash('password', 'Password anda tidak sama')
        }
        koneksi.query(cariData, requ.body.email, (err, rows, field) => {
            if (err) throw err
            if (rows.length == 0) {
                koneksi.query(simpanData, [getData.nama, getData.email, 'user', getData.password], (err, rows, field) => {
                    if(err) throw err
                    // resp.redirect('/user/register')
                    resp.redirect('/user')
                    return
                })

            } else {
                requ.flash('email', 'email yang anda masukkan sudah ada pada database kami, silahkan masukkan email lain')
                resp.send('email yang anda masukkan sudah ada, silahkan masukkan email yang baru')
                // resp.redirect('/user')
                return
            }
        })

        
    }
}