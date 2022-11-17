const koneksi = require('../config/database')


module.exports = {
    isAdmin(requ, resp, next) {
        // if (err) {
        //     resp.send('anda belum login')
        // }
        if(requ.session.loggedin === true){
           
            const getUser = requ.session.userid
            const queryGetRole = 'select * from pengguna where id = ?'
            console.log(getUser)
            koneksi.query(queryGetRole, getUser, (err, rows, field) => {
               if (err) throw err
                if (rows[0].role == 'admin') {
                    next()
                    return
                
                } 
                // resp.send('anda bukan admin silahkan <a href="/" >kembali</a>')
                resp.render('halaman_error/verif_admin.ejs')
                return
            } 
            ) 
        
        } else {
            // resp.send('anda belum login, silahkan <a href="/admin/login" >silahkan login dulu</a>')
            // resp.redirect('/login')
            resp.redirect('/oidc/auth?client_id=Xkv3aRBNyjq06XuhYYxpO8g9UGn&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F')
            return
        }
} 
}