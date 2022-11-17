const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const http    = require("http");

const { Issuer,Strategy } = require('openid-client');

const path = require("path");


const app = express();

app.use(cookieParser());
app.use(express.urlencoded({
  extended: true,
}));


app.use(express.json({ limit: '15mb' }));
app.use(session({secret: 'secret', 
                 resave: false, 
                 saveUninitialized: true,}));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

Issuer.discover('http://localhost:3000/oidc') 
  .then(function (oidcIssuer) {
    var client = new oidcIssuer.Client({
      // client_id: 'KyV3S7dLxbVgg10B0cVN7Fi8JDD',
      // client_secret: 'NlLMpdXu8OkAS9uOVbCSg9ipFIx',
      // redirect_uris: ["http://localhost:8080/auth/login/callback"],
      client_id: 'oidcCLIENT',
      client_secret: 'Some_super_secret',
      redirect_uris: ["http://localhost:1000/auth/login/callback"],
      response_types: ['code'], 
      
    });

    passport.use(
      'oidc',
      new Strategy({ client,passReqToCallback: true}, (req, tokenSet, userinfo, done) => {
        console.log("tokenSet",tokenSet);
        console.log("userinfo",userinfo);
        req.session.tokenSet = tokenSet;
        req.session.userinfo = userinfo;
        return done(null, tokenSet.claims());
      }
      
      )
    );
  });



app.get('/login',
function (req, res, next) {
    console.log('-----------------------------');
    console.log('/Start login handler');
    next();
},
passport.authenticate('oidc',{scope:"openid"}));

app.get('/auth/login/callback',(req,res,next) =>{

  passport.authenticate('oidc',{ successRedirect: '/beranda',
  failureRedirect: '/' })(req, res, next)
}
  
)


app.get('/beranda', (requ, resp) => {
  resp.send('<h1>selamat anda berhasil login di client 3</h1>')
  resp.end(JSON.stringify({tokenset:requ.session.tokenSet,userinfo:requ.session.userinfo},null,2));
})

app.get("/",(req,res) =>{
   res.send(" <a href='/login'>Log In with OAuth 2.0 Provider </a>")
})
app.get ("/user",(req,res) =>{
    res.header("Content-Type",'application/json');
    res.end(JSON.stringify({tokenset:req.session.tokenSet,userinfo:req.session.userinfo},null,2));
})

  const httpServer = http.createServer(app)
  //const server= https.createServer(options,app).listen(3003);
  httpServer.listen(1000,() =>{
      console.log(`Http Server Running on port 1000`)
    })