const express = require('express');
//const express = require('express');
const hbs = require('hbs');
//const fs = require('fs');
//const nodemailer=require('nodemailer');
//const mysql=require('mysql');
const bodyParser = require('body-parser');
const nodemailer=require('nodemailer');
var {academic}=require('./tables/academic.js');  
var app = express();
// var { authenticate } = require('./middleware/authenticate.js');
// var { users } = require('./tables/users.js');

app.get('/pdf',(req,res)=>{
    var {doc}= require('./pdf.js');
});
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(__dirname + '/Public');
app.set('view engine', 'hbs');
var {donate}=require('./tables/donate.js');
var {admin}=require('./tables/admin.js');
var {message}=require('./tables/message.js');
var {budget}=require('./tables/budget.js');
app.get('/budget',(req,res)=>{
    budget.query('select * from budget',(err,rows)=>{
        if(err) 
        console.log(" budget render");
        // res.render('./general_forum.hbs',{quest: rows.questions});
        
         console.log(rows);
         res.send(rows);
      });
});
app.get('/academic',(req,res)=>{
    academic.query('select * from academic',(err,rows)=>{
        if(err) 
        console.log(" academic render");
        // res.render('./general_forum.hbs',{quest: rows.questions});
        
         console.log(rows);
         res.send(rows);
      });
});
app.get('/donate', (req, res) => {
    //  res.render('Public/Dashboard/Forum/index.hbs');
    res.send({
        status: 'success'
    });
    console.log('donate page rendered');
});
app.get('/admin-charts',(req,res)=>{
    console.log("charts page");
    //  res.render('Public/Dashboard/Forum/index.hbs');
        donate.query('select sum(amount) as sumofyear from donate group by extract(year from ddate)',(err,rows)=>{
            if(err) 
                console.log("BAD");
            res.send(rows);
        });
});
app.get('/admin',(req,res)=>{
    console.log("admin page");
    //  res.render('Public/Dashboard/Forum/index.hbs');
        donate.query('select extract(month from ddate) as label,sum(amount) as value  from donate group by extract(month from ddate)',(err,rows)=>{
            var list=[];
            if(err) 
                console.log("BAD");
                 // res.render('./general_forum.hbs',{quest: rows.questions});
                 
               // console.log(rows);
               list.push(rows);
               message.query('select count(*) as countofmessages from message',(err,rows2)=>{
                if(err) 
                console.log("messgage render");
                // res.render('./general_forum.hbs',{quest: rows.questions});
                
                 //console.log(rows);
                 list.push(rows2);
                 
              });
                donate.query('select * from donate',(err,rows1)=>{
                    if(err) 
                        console.log("BAD");
                        // res.render('./general_forum.hbs',{quest: rows.questions});
                    //console.log(rows)
                    list.push(rows1);
                    res.send(list);
                });
        });
        
        
});

app.get('/login',(req,res)=>{
    console.log('admin-login');
    res.sendStatus(200);

});

app.get('/message',(req,res)=>{
    message.query('SELECT * FROM message ORDER BY mdate DESC',(err,rows)=>{
        if(err) 
        console.log("messgage render");
        // res.render('./general_forum.hbs',{quest: rows.questions});
        
         console.log(rows);
         res.send(rows);
      });
});
app.get('/message/done',(req,res)=>{
    message.query('select * from message',(err,rows)=>{
        if(err) 
        console.log("messgage render");
        // res.render('./general_forum.hbs',{quest: rows.questions});
        
         console.log(rows);
         res.send(rows);
      });
});
app.get('/otp',(req,res)=>{
    var {mailmake}=require('./email.js');
    var {mailsend}=require('./email.js');
        
        
        // mailmake.text=otp.otp_key.toString();
        mailmake.to=req.body.email;
        mailsend.send();
});


module.exports = {app};