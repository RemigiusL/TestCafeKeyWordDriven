import { Selector } from 'testcafe';

fixture `Send an Email`

//npm install nodemailer

test('Send an Email', async t => {

  
  var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'remigiusbca@gmail.com',
    pass: 'remi@123'
  }
});

var mailOptions = {
  from: 'remigiusbca@gmail.com',
  to: 'remigiusbca@gmail.com, remi@processdrive.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

});
