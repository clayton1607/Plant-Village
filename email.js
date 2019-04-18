const nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ngo.guru99@gmail.com',
    pass: 'ngo123456'
  }

});
//var otp=Math.floor(100000 + Math.random() * 900000);
var mailmake = {
    from: 'ngo.guru99@gmail.com', // sender address                                   
    to: 'rigrodtan@gmail.com', // list of receivers                                 
    subject: 'Attachment', // Subject line                                                 
    text: 'Hello world attachment test', // plaintext body                                                 
    html: '<b>Hello world attachment test HTML</b>', // html body                                               
    attachments: [
        {
            filename: 'output.pdf',                                         
            contentType: 'application/pdf'
        }]
};
var mailsend ={
  send : function() {
    transporter.sendMail(mailmake, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
    })
  }
};


module.exports={mailmake,mailsend};