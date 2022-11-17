const koneksi = require('../config/database')
// const Provider = require('oidc-provider')
const controller = require('../controller/oidc-controller')
const ambilClient = require('../controller/client-controller')

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// console.log(randomString(27))

module.exports = {
  async tampilDaftarClient(requ, resp) {
    console.log()
    koneksi.query('select * from clientconfig', (err, rows, field) => {
      if (err) throw err

      if(rows.length > 0) {
        const clients=rows
        resp.render('tampil_client.ejs', {clients})
        return
      }
    })
    
    // resp.render('tampil_client.ejs')
  },
  tambahClient(requ, resp) {

    // tambahin validasi 
    const tambahClient = 'insert into clientconfig values(?,?,?,?,?)'
    const cariClient = 'select * from clientconfig where client_id = ?'
    const client_id = randomString(27)
    const client_secret = randomString(27)
    const client_nama = requ.body.client_name
    const redirect_uri = requ.body.redirect_uri
    const logo = requ.file.originalname
    console.log(requ.file)

    // console.log(requ.body.logo_aplikasi)
    // koneksi.query()
    koneksi.query(tambahClient, [client_id, client_secret, client_nama, redirect_uri, logo])
    resp.redirect('/client')

  },
  editClient(requ, resp) {
    const client_id = requ.params.client_id
    const namaApp = requ.body.namaApp
    const redirect_uri = requ.body.redirect_uri
    koneksi.query('update clientconfig set nama_client = ?, redirect_uri = ? where client_id = ?', [namaApp, redirect_uri, client_id], (err, rows, field) => {
      resp.redirect('/client')
      return
    })

  },
  hapusClient(requ, resp) {
    const client_id = requ.params.client_id
    koneksi.query('delete from clientconfig where client_id = ?', client_id, (err, rows, field) => {
      resp.redirect('/client')
      return
    })
  },
  tampilEdit(requ, resp) {
    const client_id = requ.params.client_id
    koneksi.query('select * from clientconfig where client_id = ?', client_id, (err, rows, field) => {
      if (err) throw err

      if(rows.length > 0) {
        const clients=rows[0]
        resp.render('edit_client.ejs', {clients})
        return
      }
    })
  }, 
  tampilPortal(requ, resp) {
    if (requ.query.error) {
      resp.redirect('/portalclient')
    }
    koneksi.query('select * from clientconfig', (err, rows, field) => {
      if (err) throw err

      const session = requ.session
      resp.render('portal.ejs', {clients:rows, session})
    })
  }
  


}

  