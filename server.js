const express = require('express');
const hbs =require('hbs');
const fs = require('fs');
const nodemailer=require('nodemailer');
const mysql=require('mysql');
const faker = require('faker');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const jwt=require('jsonwebtoken');
var redis           =     require("redis");
var session         =     require('express-session');
var redisStore      =     require('connect-redis')(session);
var cookieParser    =     require('cookie-parser');
var path            =     require("path");
var async           =     require("async");
var client          =     redis.createClient();

//var nodemailer = require('nodemailer');
// var cors = require('cors');
// app.use(cors);nnnk
var {user_login} = require('./tables/user_login')
var {question} = require('./tables/question')    
var app = express();

app.use(express.static(__dirname+'/Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(__dirname+'/Public');
app.set('view engine','hbs');

app.get('/hello',(req,res)=>{
  res.send("hello");
});
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  saveUninitialized: false,
  resave: false
}));


app.get('/test', (req , res)=>{
  res.send({msg : "hello world"})
})

app.get('/',function(req,res){  
  // create new session object.
  res.send('Hello there Welcome here!!!');
});

app.post('/login',function(req,res){
  console.log(req.body)
  let stmt = 'SELECT * from user_login where user_email=$1 and user_password=$2';
  user_login.query(stmt,[req.body.email,req.body.password],function(err,result){
    console.log(result.rows.length)
    if(err){
        console.log(err);
      }
      else{
          if (result.rows.length!=0){
            req.session.key=req.body.email;
            console.log(req.session)
            res.end('done');
          }
          else{
            res.json({
              "error" : "true",
              "message" : "Login failed ! Please register"
            });
          }
  
      }

});
});
app.post('/register',(req,res)=>{
  console.log(req.body.email)
  let stmt='SELECT * from user_login where user_email=$1 or user_password=$2';
  user_login.query(stmt,[req.body.email,req.body.password],(err,result)=>{
    console.log(result.rows.length);
    if (result.rows.length!=0){
      res.json({"error" : true,
      "message" : "This email is already present"});
    }
    else{
      var d= new Date();
      console.log(req.body)
      stmt='INSERT into user_login(user_email,user_password,user_name,ddate) VALUES ($1,$2,$3,$4) RETURNING *'
      user_login.query(stmt,[req.body.email,req.body.password,req.body.username,d],(err,result)=>{
        if(err){
          res.json({
            "error" : true ,
           "message" : err});
        }
        else{
          res.json({
            "error" : false,
           "message" : "Registered successfully."});
        }
      })
    }
  });

});
app.get('/logout',function(req,res){
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      } else {
          res.redirect('/');
      } 
  });
});

//Plant MiniProject 

app.get('/search-query',(req,res)=>{
  console.log(req.session)
})
app.get('/queries',(req,res)=>{
  res.send("HELLO");
})

const multer = require("multer");

const handleError = (err, res) => {
    res.status(500)
    res.contentType("text/plain")
    res.end("Oops! Something went wrong!");
};
// const upload = multer({
//   dest: "/uploads"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });
// app.post("/upload",upload.single("file" /* name attribute of <file> element in your form */),(req, res) => {
//     var questionp= req.body.yourq; //question that is asked
//           var type= req.body.type; //type of question
//           var name= req.body.name; //who asked the question
//           //id of the question will be on auto increment in database
//       var q = [questionp] //for second query
//     console.log(req.file)
//     console.log(req.file.path);
//     const tempPath = req.file.path;
//     var image=Math.floor(100000 + Math.random() * 900000);
//     var img=image.toString();
//     var png ="image.png";
//     var image_png=img.concat(png);
//     const targetPath = path.join(__dirname, "public/uploads",image_png);
//     console.log("IM here");
//     console.log(tempPath);
//     console.log("IM here");
//     console.log(targetPath);
//     var values1 = [questionp,name,type,targetPath];

//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);
//            res.status(200)
//           res.contentType("text/plain")
//           // res.send("File uploaded!");
          
//           question.query('insert into q2table (questions,quser,type,image_path) values ($1,$2,$3,$4)',values1,(err,row)=>{
//             if(err) throw err;
       
//             question.query('select qno from q2table where questions= $1',questionp,(err,result)=>{
//               if(err) throw err;
//               var values2 = [result.rows[0].qno,"This Discussion is ready","Admin","default"];
//               question.query('insert into anstable (qno,answer,usera,type) values ($1,$2,$3,$4)',values2,(err,rows)=>{
//                 if(err) throw err;
//                 res.send('question is added');
//               });
//             });
       
       
       
       
//           });
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .end("Only .png files are allowed!");
//       });
//     }
//   }
// );

app.post('/reply2',(req,res)=>{
  var replystring= req.body.replyf;
  var qno= req.body.questno;
  var type=req.body.questtype;
  var name=req.body.username;
  

  var values = [qno,replystring,name,type];
  question.query('insert into ans3table (qno,answer,usera,type) values ($1,$2,$3,$4) RETURNING *',values,(err,rows)=>{
     if(err) throw err;
        
        

        res.send('new reply added to qno 1');
     });


 });

// route for getting answers of a particular question using its question id
 app.get('/listans',(req,res,err)=>{

          var askno=[req.query.quno];
        

        
        
       
        question.query('select * from ans3table where qno= $1',askno,(err,result)=>{
           if(err) throw err;
           // res.render('./general_forum.hbs',{quest: rows.questions});
        
           var count;
           var list1=[];
           var lengthr=result.rows.length;
          //  console.log(lengthr+"length");
           for(count=0;count<lengthr;count++){
        
             var ask = {
                          'qno':result.rows[count].qno,
                          'ansno':result.rows[count].ansno,
                          'answer':result.rows[count].answer,
                          'usera':result.rows[count].usera,
                          'type':result.rows[count].type,
                          'upvotes':result.rows[count].upvotes,
                          'downvotes':result.rows[count].downvotes,
                          
                      }
        
                    list1.push(ask);
                      // console.log(list1);
           }
        
           function compare(a, b) {
           
            
              console.log(a.upvotes);
              console.log(b.upvotes);
            
            const upA = a.upvotes;
            const upB = b.upvotes;
            
           return upB - upA;
          }
          
          console.log(list1.sort(compare));
          res.send({list1});
         }); 
         
         
          
         
});

// //route to ask a new question
// app.post('/askquest',(req,res)=>{
//   var questionp= req.body.yourq; //question that is asked
//   var type= req.body.type; //type of question
//   var name= req.body.name; //who asked the question
//   //id of the question will be on auto increment in database


// console.log(req.FILES["file"]);
//   if (!req.files)
//   return res.status(400).send('No files were uploaded.');

//   var file = req.files.image;
//   var img_name=file.name;

//     if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
//             file.mv('public/images/upload_images/'+file.name, function(err) {
                           
//               if (err)      
//                 return res.status(500).send(err);

//    });
//         } else {
//           message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
//           res.send(message);
//         }



        

//   var values1 = [[questionp,name,type,img_name]];



//   question.query('insert into q2table (questions,quser,type,image_path) values ?',[values1],(err,row)=>{
//     if(err) throw err;

//     question.query('select qno from q2table where questions= ?',questionp,(err,rows)=>{
//       if(err) throw err;
//       var values2 = [[rows[0].qno,"This Discussion is ready","Admin","default"]];
//       question.query('insert into anstable (qno,answer,usera,type) values ?',[values2],(err,rows)=>{
//         if(err) throw err;
//         res.send('question is added');
//       });
//     });




//   });
// });








// // route for getting answers of a particular question using its question id
// app.get('/listans',(req,res,err)=>{

//   var askno=req.query.quno;
  





// question.query('select * from ans3table where qno=?',askno,(err,rows)=>{
//    if(err) throw err;
//    // res.render('./general_forum.hbs',{quest: rows.questions});

//    var count;
//    var list1=[];
//    var lengthr=rows.length;
//   //  console.log(lengthr+"length");
//    for(count=0;count<lengthr;count++){

//      var ask = {
//                   'qno':rows[count].qno,
//                   'ansno':rows[count].ansno,
//                   'answer':rows[count].answer,
//                   'usera':rows[count].usera,
//                   'type':rows[count].type,
//                   'upvotes':rows[count].upvotes,
//                   'downvotes':rows[count].downvotes,
                  
//               }

//             list1.push(ask);
//               console.log(list1);
//    }

//    function compare(a, b) {
//     const upA = b.upvotes;
//     const upB = a.upvotes;
    
//     let comparison = 0;
//     if (upA > upB) {
//       comparison = 1;
//     } else if (upA < upB) {
//       comparison = -1;
//     }
//     return comparison;
//   }
  
//   console.log(list1.sort(compare));
//   res.send({list1});
//  }); 
 
 
  
 
// });




// // route for getting list of all related questions
// app.get('/searchquest',(req,res,err)=>{

// // to do




// });  



// // reply for a particular question
// app.post('/reply',(req,res)=>{
// var replystring= req.body.replyf;
// var qno= req.body.questno;
// var type=req.body.questtype;
// var name=req.body.username;

// var values = [[qno,replystring,name,type]];
// question.query('insert into anstable (qno,answer,usera,type) values ?',[values],(err,rows)=>{
// if(err) throw err;

// res.redirect('back');


// });


// });


// app.get("/",(req,res)=>{
//   res.send("yess")
// })

// app.post('/donate',(req,res)=>{
//     console.log(req.body);
//     console.log("Hello page-donate");
//     var d= new Date();
//     let stmt = `INSERT INTO donate(name,email,phone,amount,ddate) VALUES(?,?,?,?,?)`;
//     let todo = [faker.name.firstName(),faker.internet.email(),faker.phone.phoneNumber(),faker.random.number(),faker.date.between('2018-01-01','2018-12-31')];
//     donate.query(stmt,todo,(err,result)=>{
//     if(err){
//       console.log(err);
//       state='failure';
//     }
//     else{
//         state='success';  
//     }
//     console.log(req.body);
    
//     res.send({
//         status: state
//     });
//   })
// });
// const multer = require("multer");

// const handleError = (err, res) => {
//     res.status(500)
//     res.contentType("text/plain")
//     res.end("Oops! Something went wrong!");
// };

// const upload = multer({
//   dest: "/uploads"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });


// app.post("/upload",
//   upload.single("file" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     console.log(req.file)
//     console.log(req.file.path);
//     const tempPath = req.file.path;
//     var image=Math.floor(100000 + Math.random() * 900000);
//     var img=image.toString();
//     var png ="image.png";
//     var image_png=img.concat(png);
//     const targetPath = path.join(__dirname, "Public/uploads",image_png);
//     console.log(tempPath);
//     console.log(targetPath);
//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);
//            res.status(200)
//           res.contentType("text/plain")
//           res.send("File uploaded!");
//           question.query('INSERT into  q2table(image_path) VALUES(?)',[image_png],(err,res)=>{
//             if (err)
//               console.log(err);
//             console.log("Image Updated updated");
//           });
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .end("Only .png files are allowed!");
//       });
//     }
//   }
// );




// app.post("/login", passport.authenticate('local', {
//   successRedirect: '/user/Personal',
//   failureRedirect: '/login',
//   failureFlash: true
// }), function(req, res, info){

//   res.render('/login/index',{'message' :req.flash('Suuccessful')});
//   console.log("Suuccessful1");
// });


// app.post('/signup',(req,res)=>{
// console.log(req.body);

// // var username=req.body.username;
// // var decoded=jwt.verify(token,'specialKEy');
// // console.log(decoded);
// // console.log(token);
// // res.set('x-auth', token);

// var d= new Date();
// var salt = crypto.randomBytes(16).toString('hex');
// var password=crypto.pbkdf2Sync(req.body.password,salt,
//   1000, 64, `sha512`).toString(`hex`);
// let stmt = `INSERT INTO users(username,email,password,token_accees,token,application_status,last_login,signup_date)
//           VALUES(?,?,?,?,?,?,?,?)`;

// let todo = [req.body.username,req.body.email,password,'auth',salt,false,d,d];
// users.query(stmt,todo, function (err, result) {
//   if (err)
//     console.log(err);
//   console.log("1 record inserted");

// });
// });

// app.listen(3000);
app.listen(port);





