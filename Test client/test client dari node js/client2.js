const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const http    = require("http");

const { Issuer,Strategy } = require('openid-client');

const path = require("path");
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'))


app.use(cookieParser());
app.use(express.urlencoded({
  extended: true,
}));


app.use(express.json({ limit: '15mb' }));
app.use(session({secret: 'secret12', 
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
      client_id: '3Wd37hFq6mRCU0cw3637FmDhgXN',
      client_secret: 'QH2OJ1yxI8TpPOZ81cdqsz3QGBa',
      redirect_uris: ["http://localhost:2000/auth/login/callback"],
      response_types: ['code'], 
      
    });

    passport.use(
      'oidc',
      new Strategy({ client,passReqToCallback: true}, (req, tokenSet, userinfo, done) => {
        console.log("tokenSet",tokenSet);
        console.log("userinfo",userinfo);
        req.session.tokenSet1 = tokenSet;
        req.session.userinfo2 = userinfo;
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
passport.authenticate('oidc',{scope:"openid email profile"}));

app.get('/auth/login/callback',(req,res,next) =>{

  passport.authenticate('oidc',{ successRedirect: '/beranda',
  failureRedirect: '/' })(req, res, next)
}
  
)


app.get('/beranda', (requ, resp) => {
  resp.send('<h1>selamat anda berhasil login di client 2</h1>')
  resp.end(JSON.stringify({tokenset:requ.session.tokenSet,userinfo:requ.session.userinfo},null,2));
})

app.get("/",(req,res) =>{
   res.send(" <a href='/login'>Silahkan login</a>")
})
app.get ("/user",(req,res) =>{
    res.header("Content-Type",'application/json');
    res.end(JSON.stringify({tokenset:req.session.tokenSet1,userinfo:req.session.userinfo2},null,2));
})

  const httpServer = http.createServer(app)
  //const server= https.createServer(options,app).listen(3003);
  httpServer.listen(2000,() =>{
      console.log(`Http Server Running on port 2000`)
    })