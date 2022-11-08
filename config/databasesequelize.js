const Sequelize = require('sequelize')

const dbku = new Sequelize('dbcoba', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

async function koneksi() {
    await dbku.authenticate()
    console.log('mysql versi sequelize sedang berjalan...')
}

// koneksi()

module.exports = dbku