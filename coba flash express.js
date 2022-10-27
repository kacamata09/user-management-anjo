const express = require('express');
const session = require('express-session');
const path = require('path');
// const { flash } = require('express-flash-message');
const flash = require('connect-flash')

const cookieParser = require('cookie-parser')

const app = express();
const port = 3000;


app.set('view engine', 'ejs')
// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
  })
);

// app.use(cookieParser('keyboard cat'));
app.use(flash());



app.get('/flash', function (req, res) {
 req.flash('info', 'Halo, Anshar disini!');
 req.flash('info', 'Halo, David disini!');

//  console.log(req.flash('info'))
  res.redirect('/');
});

app.get('/', function (req, res) {
  const pesan = req.flash('info');
  console.log(pesan)
  res.render('cobaflash.ejs', { pesan });
});

app.listen(port, () => {
  console.log(` server berjalan di port ${port}`);
});