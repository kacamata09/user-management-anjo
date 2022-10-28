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
                resp.send('anda bukan admin silahkan <a href="/" >kembali</a>')
                return
            } 
            ) 
        
        } else {
            // resp.send('anda belum login, silahkan <a href="/admin/login" >silahkan login dulu</a>')
            resp.redirect('/login')
            return
        }
} 
}