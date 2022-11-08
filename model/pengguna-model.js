const dbku = require('../config/databasesequelize')
const Sequelize = require('sequelize')

// const siswa = dbku.define('siswa', {
//     nama: {
//         type: Sequelize.STRING,
//         defaultValue: 'Anshar'},
//     alamat: Sequelize.STRING(128)
// }, {
//     freezeTableName : true,
//     timestamps: false
// })

// siswa.removeAttribute('id')

// siswa.sync()

// module.exports = siswa

const Pengguna = dbku.define('pengguna', {
    nama: Sequelize.STRING,
    email: Sequelize.STRING,
    role: Sequelize.STRING,
    password: Sequelize.STRING,
    status: Sequelize.STRING

}, {
    freezeTableName : true,
    timestamps: false
})


module.exports = Pengguna

