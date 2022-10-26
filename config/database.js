const mysql = require('mysql')
const koneksi = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'dbcoba'
})

koneksi.connect((err)=>{
    if (err) throw err
    console.log('mysql sedang berjalan...')
})

module.exports = koneksi
