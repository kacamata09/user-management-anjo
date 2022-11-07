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
    
    resp.render('tampil_client.ejs')
  },
  tambahClient(requ, resp) {

    // tambahin validasi 
    const tambahClient = 'insert into clientconfig values(?,?,?,?)'
    const cariClient = 'select * from clientconfig where client_id = ?'
    const client_id = randomString(27)
    const client_secret = randomString(27)
    const client_nama = requ.body.client_name
    const redirect_uri = requ.body.redirect_uri
    // koneksi.query()
    koneksi.query(tambahClient, [client_id, client_secret, client_nama, redirect_uri])
    resp.redirect('/client')

  },
  editClient(requ, resp) {
    const client_id = requ.params.client_id
    const namaApp = requ.body.namaApp
    const redirect_uri = requ.body.redirect_uri
    koneksi.query('update clientconfig ')
  }
  


}

  