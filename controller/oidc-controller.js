const Provider = require('oidc-provider');
const koneksi = require('../config/database');
const ambilClient = require('../controller/client-controller')


const list = []

const listClient = async function () {
    const data = await ambilClient.ambilData()
    data.forEach(cli => {
        list.push({
            client_id: cli.client_id,      
            client_secret: cli.client_secret,      
            grant_types: ["authorization_code"],      
           //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
            redirect_uris: [ cli.redirect_uri ], 
            response_types: ["code",],  
              
          //other configurations if needed
         }) 
    })

    console.log(list)
    return list
    
   
}

listClient()

console.log(list)



module.exports = {
    // pilih_config_client() {
    //     const configClient = 'select * from clientconfig'
    //     // const client_id = ''
    //     koneksi.query(configClient, (err, rows, field) => {
    //         // console.log(rows)
    //         return rows
    //     })
        
    //     // const oidc = new Provider('http://localhost:3000', configuration);
    
    //   },
      oidc: new Provider('http://localhost:3000', {clients:[{
                     client_id: "oidcCLIENT",      
                     client_secret: "Some_super_secret",      
                     grant_types: ["authorization_code"],      
                    //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
                     redirect_uris: [ "http://localhost:8080/auth/login/callback"], 
                     response_types: ["code",],  
                       
                   //other configurations if needed
                  }, {
                    client_id: "oidcCLIENT2",      
                    client_secret: "Some_super_secret2",      
                    grant_types: ["authorization_code"],      
                   //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
                    redirect_uris: [ "http://localhost:8080/auth/login/callback"], 
                    response_types: ["code",],  
                      
                  //other configurations if needed
                 }],
                  pkce: {
                    required: () => false,
                  }, }),

                  
    oidece :  new Provider('http://localhost:3000', {clients: list,
        pkce: {
        required: () => false,
        }, 
    })

    // oidece : koneksi.query('select * from clientconfig', (err, rows, field) => {
    //     const listCl = []
    //     rows.forEach(cli => {
    //         listCl.push({
    //             client_id: cli.client_id,      
    //             client_secret: cli.client_secret,      
    //             grant_types: ["authorization_code"],      
    //            //  redirect_uris: [ "http://localhost:8080/auth/login/callback","https://oidcdebugger.com/debug"], 
    //             redirect_uris: [ cli.redirect_uri ], 
    //             response_types: ["code",],  
                  
    //           //other configurations if needed
    //          }) 
    //     })

    //     const oidc = new Provider('http://localhost:3000', {clients: listCl,
    //     pkce: {
    //     required: () => false,
    //     }, 
    // })
    // })

    }
      

