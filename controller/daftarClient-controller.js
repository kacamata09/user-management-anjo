const koneksi = require('../config/database')

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

console.log(randomString(27))

module.exports = {
  tampilDaftarClient(requ, resp) {
    resp.render('')
  },
  tambahClient(requ, resp) {

    const tambahClient = 'insert into clientconfig values(?,?,?,?)'
    const client_id = randomString(27)
    const client_secret = randomString(27)
    const client_nama = requ.body.client_name
    const redirect_uri = requ.body.redirect_uri
    koneksi.query(tambahClient, [client_id, client_secret, client_nama, redirect_uri])
    resp.redirect('/client')
    

    
  },
  configClient(requ, resp) {
    const oidc = new Provider('http://localhost:3000', configuration);

  }


}
const configuration = {
 
    clients: [{
       client_id: "oidcCLIENT",      
       client_secret: "Some_super_secret",      
       grant_types: ["authorization_code"],      
      //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
       redirect_uris: [ "http://localhost:8080/auth/login/callback"], 
       response_types: ["code",],  
         
     //other configurations if needed
    }],
    pkce: {
      required: () => false,
    },
  };
  