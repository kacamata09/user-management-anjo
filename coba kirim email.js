const express = require('express')
const cobaMail = require('express-mailer')

const app = express()

cobaMail.extend(app, {
    from: 'muh.ansharazhari@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'muh.ansharazhari@gmail.com',
      pass: 'mvhmlommxlosyynb'
    }
  });

  app.get('/', function (req, res, next) {
    // cobaMail.send
    app.cobaMail.send('email', {
      to: 'muh.ansharibrahim@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
      subject: 'Test Email', // REQUIRED.
      otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
    }, 
    function (err) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email sudah terkirim');
    });
  });

  app.listen(1000, console.log('coba kirim email sedang berjalan....'))