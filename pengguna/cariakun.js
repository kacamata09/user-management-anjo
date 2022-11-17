const koneksi = require('../config/database')
const bcrypt = require('bcrypt')
const { reject } = require('lodash')


async function cariData(email) {
    const cariUser = 'select * from pengguna where email = ?'
    const user = () => {
        return new Promise(function(resolve, reject) {
            koneksi.query(cariUser, email, async (err, rows, field) => {
                if (err) throw err
                if (rows.length > 0) {
                    resolve(rows[0])
                } else {
                    resolve({pesan:'Email yang anda masukkan tidak ditemukan'})
                }
            })
        })
    }
    const hasil = await user()
    .then(function(results){
      return results
    })
    .catch(function(err){
      console.log("Promise rejection error: "+err);
    // reject(err)
    })
    return hasil

}


module.exports = {
    async cariUser(email, password) {
        // const getData = requ.body
        const cariUser = 'select * from pengguna where email = ? or username = ?'
        // if (getData.ingat === '1') {
        //     koneksi.query('insert into session values(?)', email, (err, rows, field) => {
        //         // resp.cookie('email', email)
        //     })

        // }
        // console.log(getData.ingat)
        const user = () => {
            return new Promise(function(resolve, reject) {
                koneksi.query(cariUser, [email, email], async (err, rows, field) => {
                    if (err) throw err
                    if (rows.length > 0) {
        
                        if (rows[0].status == 'blokir') {
                            // requ.flash('login', 'Akun anda di blokir, silahkan hubungi admin mengapa akun anda di blokir, apakah kamu ada salah ke dia')
                            // // resp.redirect('/login')
                            // resp.send('akun anda diblokir')
                            // reject({pesan: 'anda di blokir'})
                            resolve({pesan: 'Maaf akun anda di blokir, silahkan hubungi admin'})
                            // return 
                        }
                        const passwordVerif = await bcrypt.compare(password, rows[0].password)
                        console.log(passwordVerif)
                        if (!passwordVerif) {
                            // requ.flash('login', 'password anda salah')
                            // // resp.redirect('/login')
                            // reject({pesan:'password anda salah'})
                            resolve({pesan:'Password yang anda masukkan salah'})
                            // return
                            // resp.send('password anda salah')
                        } else {
                            // requ.session.loggedin = true;
                            // requ.session.userid = rows[0].id;
                            // requ.session.username = rows[0].nama;
                            // if (rows[0].role == 'admin') {
                            //     // resp.redirect('/admin')
                            //     resolve(rows[0])
                            //     return
                            // } else {
                            //     // resp.redirect('/')
                            //     return
                            // }
                            resolve(rows[0])
                        }
                       
        
                    } else {
                        // requ.flash('login', 'Email yang anda masukkan salah')
                        // resp.send('password atau email yang anda masukkan salah')
                        // resp.redirect('/login')
                        // resp.send('email anda salah')
                        resolve({pesan:'Email yang anda masukkan tidak ditemukan'})
                        // return
                    }
                })
            })
        }

        const hasil = await user()
        .then(function(results){
          return results
        })
        .catch(function(err){
          console.log("Promise rejection error: "+err);
        // reject(err)
        })
        return hasil

        
        
    },
    async findAccount(ctx, sub, token) {
        const dataPengguna = await cariData(sub)
        return {
          accountId: sub,
          profile: dataPengguna.nama,
          email: dataPengguna.email,
   
          async claims(use, scope) {
            return { 
                sub, 
                nama: dataPengguna.nama, 
                email: dataPengguna.email, 
                role:dataPengguna.role, 
                status:dataPengguna.status };
          },
        };
      }
}