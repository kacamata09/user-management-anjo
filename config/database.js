const mysql = require('mysql')
const koneksi = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'dbCoba'
})