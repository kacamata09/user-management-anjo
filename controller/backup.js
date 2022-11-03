const oidc = new Provider('http://localhost:3000', {
        // async findAccount(ctx, id) {
        //   return {
        //     accountId: id,
        //     async claims(use, scope) { return { sub: id }; },
    
        //   };
        // }
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
        
      });