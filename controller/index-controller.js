const koneksi = require('../config/database')
module.exports = {
    tampil(requ, resp) {
        requ.session.loggedid = true
        id = requ.session.userid
        const ambilUser = 'select * from pengguna where id = ?'
        koneksi.query(ambilUser, id, (err, rows, field) => {
            if (err) throw err
            const user = rows[0]
            resp.render('dashboard_user.ejs', idUser = {id, user})
        })

    }
}