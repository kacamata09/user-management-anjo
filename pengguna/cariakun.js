const koneksi = require('../config/database')
const bcrypt = require('bcrypt')
const { reject } = require('lodash')


module.exports = {
    async cariUser(email, password) {
        // const getData = requ.body
        const cariUser = 'select * from pengguna where email = ?'
        // if (getData.ingat === '1') {
        //     koneksi.query('insert into session values(?)', email, (err, rows, field) => {
        //         // resp.cookie('email', email)
        //     })

        // }
        // console.log(getData.ingat)
        const user = () => {
            return new Promise(function(resolve, reject) {
                koneksi.query(cariUser, [email], async (err, rows, field) => {
                    if (err) throw err
                    if (rows.length > 0) {
        
                        if (rows[0].status == 'blokir') {
                            // requ.flash('login', 'Akun anda di blokir, silahkan hubungi admin mengapa akun anda di blokir, apakah kamu ada salah ke dia')
                            // // resp.redirect('/login')
                            // resp.send('akun anda diblokir')
                            // reject({pesan: 'anda di blokir'})
                            resolve({pesan: 'anda di blokir'})
                            // return 
                        }
                        const passwordVerif = await bcrypt.compare(password, rows[0].password)
                        console.log(passwordVerif)
                        if (!passwordVerif) {
                            // requ.flash('login', 'password anda salah')
                            // // resp.redirect('/login')
                            // reject({pesan:'password anda salah'})
                            resolve({pesan:'password anda salah'})
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
                        resolve({pesan:'email anda salah'})
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

        
        
    }, async ambilData() {
        const configClient = 'select * from clientconfig'
        const data = function(){
          return new Promise(function(resolve, reject){
            koneksi.query(
                configClient, 
                function(err, rows){                                                
                    if(rows === undefined){
                        reject(new Error("Error rows is undefined"));
                    }else{
                        resolve(rows);
                    }
                }
            )}
        )}
        const hasil = await data()
        .then(function(results){
          return results
        })
        .catch(function(err){
          console.log("Promise rejection error: "+err);
        })
        return hasil
        }
}