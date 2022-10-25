// "use strict";
const nodemailer = require("nodemailer");


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // secure: false, 
    auth: {
      user: 'muh.ansharazhari@gmail.com', 
      pass: 'mvhmlommxlosyynb', 
    },
  });

transporter.sendMail({
    from: 'muh.ansharazhari@gmail.com', 
    to: "muh.ansharibrahim@gmail.com",
    subject: "Hello ✔", 
    text: "Hello world?", 
  
  },
  (err, info) => {
    if(err) throw err
    console.log(info.response)
  });
