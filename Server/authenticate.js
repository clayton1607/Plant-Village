// var flash= require('connect-flash');
// var crypto=require('crypto');
// var passport          = require('passport');
// var LocalStrategy     = require('passport-local').Strategy;
// var sess              = require('express-session');
// const multer = require("multer");

// const handleError = (err, res) => {
//     res.status(500)
//     res.contentType("text/plain")
//     res.end("Oops! Something went wrong!");
// };
// const path = require("path");
// const fs = require("fs");
// const upload = multer({
//   dest: "/uploads"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });
// // var {contact}=require('./tables/contact.js');
// // var {users}=require('./tables/users.js');
// // var {otpdb}=require('./tables/otpdb.js');
// // var {admin}=require('./tables/admin.js');
// // var {pension}=require('./tables/pension.js');
// // var {personal}=require('./tables/personal.js');

// // var {pension_id}=require('./tables/pension_id.js');
// // var {pension_add}=require('./tables/pension_add.js');
// // var {pension_bank}=require('./tables/pension_bank.js');
// //  var {insurance}=require('./tables/insurance.js');
// // var {insurance_id}=require('./tables/insurance_id.js');
// // var {insurance_add}=require('./tables/insurance_add.js');
// //  var {insurance_bank}=require('./tables/insurance_bank.js');
// // var {users}=require('./tables/users.js');
// // var {message}=require('./tables/notifications.js');

// var {app}=require('./views.js');
// app.use(sess({
//    name: 'JSESSION',
//    secret: 'MYSECRETISVERYSECRET',
//    resave: true,
//    saveUninitialized: true
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
// passport.use('local', new LocalStrategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true //passback entire req to call back
// } , function (req, username, password, done){
//       console.log(username+password+"hello");
//       if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

//       users.query("SELECT * FROM users WHERE username=?", [username], function(err, rows){
//           console.log(err); console.log(rows);
//           //console.log(rows[0].username);
//           //console.log("***////1");
//         if (err) return done(req.flash('message',err));
//         if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
//          var encPassword=crypto.pbkdf2Sync(password, rows[0].token,
//     1000, 64, `sha512`).toString(`hex`);
//          var dbPassword  = rows[0].password;
//         if(!(dbPassword == encPassword)){
//             return done(null, false, req.flash('message','Invalid username or password.'));
//          }
//          var d=new Date();
//          let stmt = `UPDATE users SET last_login =? WHERE username =?`;
//           let todo = [d,username];
//               users.query(stmt,todo, function (err, rows){
//                 if (err)
//                   console.log(err);
//                 console.log("login date update");
//               });
//          console.log("Suuccessful");
//         return done(null, rows[0]);

//       });
//     }
// ));
// passport.serializeUser(function(user, done){
//     done(null, user.username);
// });
// passport.deserializeUser(function(username, done){
//   console.log(username);
//     users.query("select * from users where username = ?",[username], function (err, rows){
//         console.log(rows);
//         done(err, rows[0]);
//     });
// });
// app.get('/user/dashboard',isAuthenticated,(req,res)=>{
//   console.log(req.user.username);
//   users.query("SELECT * FROM users WHERE username=?",[req.user.username],(err,rows)=>{
//       var name=rows[0].username;
//       var email=rows[0].email;
//       var login=rows[0].last_login;
//       var signup=rows[0].signup_date;
//       var x_status=rows[0].application_status;

//       if (x_status)
//         var status='Complete';
//       else
//         var status='Imcomplete'
//       pension.query('SELECT * FROM pension WHERE username=?',[req.user.username],(err,rows)=>{
//         if (err)
//           console.log(error);
//         var form_statusx=rows[0].application_status;
//         if (form_statusx)
//           var form_status='Filled';
//         else
//             var form_status='Incomplete';

//         var form_personalx=rows[0].pension_personal;
//         if (form_personalx)
//           var form_personal='Done';
//         else
//             var form_personal='Incomplete';

//         var form_idx=rows[0].pension_id;
//         if (form_idx)
//           var form_id='Done';
//         else
//             var form_id='Incomplete';

//         var form_addx=rows[0].pension_add;
//         if (form_addx)
//           var form_add='Done';
//         else
//             var form_add='Incomplete';

//         var form_bankx=rows[0].pension_bank;
//         if (form_bankx)
//           var form_bank='Done';
//         else
//             var form_bank='Incomplete';
//         personal.query('SELECT * FROM personal where application_no=?',[rows[0].application_no],(error,result)=>{
//           if (error)
//             console.log(error);
//         console.log(result);
//         var image = result[0].image;
//         if (typeof image == 'undefined')
//           image='/uploads/user.png'
//         else {
//           var temp='/uploads/';
//           var image_temp=temp.concat(image);
//           image=image_temp;
//         }
//         console.log(image);
//         message.query('SELECT * from message where username=?',[req.user.username],(err,result1)=>{

//           if (typeof result1[0].message =='undefined')
//             var noti1=' ';

//           if (typeof result1[1].message =='undefined')
//             var noti2=' ';
//           else {
//             var noti2=result1[1].message;
//           }
//           if (typeof result1[2].message =='undefined')
//              var noti3=' ';
//              else {
//                noti3=result1[2].message;
//              }


//           res.render('Public/Dashboard/Dashboard.hbs',{name,email,login,signup,status,form_status,form_id,form_add,form_bank,form_personal,image,noti1,noti2,noti3});
//         });


//         });

//       });

//   })

// });
// app.get('/user/Personal',isAuthenticated,(req,res)=>{
//   res.render('Public/Dashboard/PensionScheme/applicationPersonal.hbs');
//   // token=req.header('x-auth');
//   // console.log(req.headers);
//   // console.log(token);
//   //  var token = req.query.token;
//   //  res.send(req.user);
//     //res.render('Public/Dashboard/PensionScheme/applicationPersonal.hbs');
//     //res.send("hello");

//   //res.render('Public/Dashboard/PensionScheme/applicationPersonal.hbs');
// });
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/login');
// };


// //GET
// app.get('/user/Pension/applicationIdentity',isAuthenticated,(req,res)=>{
//   res.render('Public/Dashboard/PensionScheme/applicationIdentity.hbs');
// });
// app.get('/user/Pension/applicationAddress',isAuthenticated,(req,res)=>{
//   res.render('Public/Dashboard/PensionScheme/applicationAddress.hbs');
// });
// app.get('/user/Pension/applicationWorkBank',isAuthenticated,(req,res)=>{
//   res.render('Public/Dashboard/PensionScheme/applicationWorkBank.hbs');

// });

// //POST
// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });
// app.post('/user/Personal',upload.single("image" /* name attribute of <file> element in your form */),(req,res)=>{
//   console.log(req.file.path);
//   const tempPath = req.file.path;
//   var image=Math.floor(100000 + Math.random() * 900000);
//   var img=image.toString();
//   var png ="image.png";
//   var image_png=img.concat(png);
//   const targetPath = path.join(__dirname,"Public/uploads",image_png);
//   console.log(tempPath);
//   console.log(targetPath);
//   if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//     fs.rename(tempPath, targetPath, err => {
//       if (err) return handleError(err, res);
//          res.status(200)
//          let sql2="SELECT * from pension WHERE username=?";
//          pension.query(sql2,[req.user.username],(err,rows)=>{
//            let sql = "INSERT INTO personal(image,personal_details_status ,first_name ,middle_name ,last_name ,father_name ,mothers_name ,date_of_birth ,city_of_birth ,country_of_birth ,gender ,martial_status ,spouse_name ,phone_no ,fax,application_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

//            let  values=[image_png,true,req.body.First_Name,req.body.Middle_Name,req.body.Last_Name,req.body.Father_Name,req.body.Mother_Name,req.body.dob,req.body.cityofbirth,req.body.countryofbirth,req.body.gender,true,req.body.spouse_name,req.body.Phone,req.body.Fax,rows[0].application_no];

//            pension.query("UPDATE pension SET pension_personal=? where username=?",[true,req.user.username],(err,res)=>{
//               if (err)
//                 console.log(err);
//            });


//            personal.query(sql,values, function (err, rows) {
//                if (err) throw err;
//                console.log("1 record application_personal inserted");
//                res.redirect('/user/dashboard');
//          });

//          });
//     });
//   } else {
//     fs.unlink(tempPath, err => {
//       if (err) return handleError(err, res);

//       res
//         .status(403)
//         .contentType("text/plain")
//         .end("Only .png files are allowed!");
//     });
//   }



//   // let sql = "INSERT INTO application_personal(image,personal_details_status ,first_name ,middle_name ,last_name ,father_name ,mothers_name ,date_of_birth ,city_of_birth ,country_of_birth ,gender ,martial_status ,spouse_name ,phone_no ,fax) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//   //
//   // let  values=[true,req.body.First_Name,req.body.Middle_Name,req.body.Last_Name,req.body.Father_Name,req.body.Mother_Name,req.body.dob,req.body.cityofbirth,req.body.countryofbirth,req.body.gender,req.body.mstatus,req.body.spouse_name,req.body.Phone,req.body.Fax,req.user.username];
//   // personal.query(sql,values, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("1 record application_personal inserted");
//   //   app.redirect('/applicationIdentity');
//   });



// app.post('/user/Pension/applicationIdentity',upload.single("imageid" /* name attribute of <file> element in your form */),(req,res)=>{
//   console.log(req.file.path);
//   const tempPath = req.file.path;
//   var image=Math.floor(100000 + Math.random() * 900000);
//   var img=image.toString();
//   var png ="image.png";
//   var image_png=img.concat(png);
//   const targetPath = path.join(__dirname,"Public/uploads",image_png);
//   console.log(tempPath);
//   console.log(targetPath);
//   if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//     fs.rename(tempPath, targetPath, err => {
//       if (err) return handleError(err, res);
//          res.status(200)
//          let sql2="SELECT * from pension WHERE username=?";
//          pension.query(sql2,[req.user.username],(err,rows)=>{
//            console.log(req.user.username);
//            console.log(req.body);
//            console.log(rows);
//            let sql = "INSERT INTO pension_id(image_id,appid_status,id ,passport,passport_expiry_date ,pan_card ,voterid ,drivinglicence ,drivinglicence_expiry_date,other_id_name,other_id_no ,application_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

//            let  values=[image_png,true,req.body.id,req.body.Passport,req.body.Passport_expiry,req.body.Pan,req.body.Voterid,req.body.Drivingid,req.body.Driving_expiry,req.body.other_id_name,req.body.othersid_no,rows[0].application_no];

//            pension.query("UPDATE pension SET pension_id=? where username=?",[true,req.user.username],(err,res)=>{
//               if (err)
//                 console.log(err);
//            });
//            personal.query(sql,values, function (err, rows) {
//                if (err) throw err;
//                console.log("1 record application_personal inserted");
//                res.redirect('/user/Pension/applicationAddress');
//          });

//          });
//     });
//   } else {
//     fs.unlink(tempPath, err => {
//       if (err) return handleError(err, res);

//       res
//         .status(403)
//         .contentType("text/plain")
//         .end("Only .png files are allowed!");
//     });
//   }



//   });



// app.post('/user/Pension/applicationAddress',(req,res)=>{
//   let sql2="SELECT * from pension WHERE username=?";
//   pension.query(sql2,[req.user.username],(err,rows)=>{
//     console.log(req.user.username);
//     console.log(req.body);
//     console.log(rows);
//     let sql="INSERT INTO pension_add(address ,flat_room_door_block	,landmark	,premises_building_village	,road_street_lane	,area_locality_taluk	,city_town_district ,pin_code	,state_ut ,application_no) VALUES(?,?,?,?,?,?,?,?,?)";
//     let values=[req.body.addtype,req.body.flat,req.body.Landmark,req.body.building,req.body.Road,req.body.area,req.body.city,req.body.pin_code,req.body.state,rows[0].application_no];
//     pension_add.query(sql,values,(err,rows)=>{
//       if (err)
//         console.log(err);
//     });
//     pension.query('UPDATE pension SET pension_add=? WHERE username=?',[true,req.user.username],(err,rows)=>{
//       if (err)
//         console.log(err);
//     });
//   });
//   res.redirect('/user/Pension/applicationWorkBank');
// });
// app.post('/user/Pension/applicationWorkBank',(req,res)=>{
//   let sql2="SELECT * from pension WHERE username=?";
//   pension.query(sql2,[req.user.username],(err,rows)=>{
//     console.log(req.user.username);
//     console.log(req.body);
//     console.log(rows);
//     let sql="INSERT INTO pension_bank(occupation_details ,income_range ,educational_qualifications	 ,politics ,account_type ,bank_number ,branch_name ,branch_address_pin	 ,state	 ,bank_ifsc	,application_no) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
//     let values=[req.body.typeJob,req.body.Income,req.body.educational_qualifications,false,req.body.typeAcc,req.body.BankNO,req.body.BBranchName,req.body.BranchPIN,req.body.BankState,req.body.Bankifsc,rows[0].application_no];
//     pension_bank.query(sql,values,(err,rows)=>{
//       if (err)
//         console.log(err);
//     });
//     pension.query('UPDATE pension SET pension_bank=? WHERE username=?',[true,req.user.username],(err,rows)=>{
//       if (err)
//         console.log(err);
//     });
//     pension.query('UPDATE pension SET application_status=? WHERE username=?',["Filled",req.user.username],(err,rows)=>{
//       if (err)
//         console.log(err);
//     });


//   });
//   res.redirect('/user/dashboard');
// });



// app.post('/apply/Pension',(req,res)=>{
//   console.log(req.user.username);
//   users.query('UPDATE users SET pension_app=? WHERE username=?',[true,req.user.username],(error,rows)=>{
//     if (error)
//       console.log(error);
//     console.log(rows);
//   });
//   res.redirect('/user/dashboard');
// });
// app.post('/apply/Insurance',(req,res)=>{
//   users.query('UPDATE users SET insurance_app=? WHERE username=? ',[true,req.user.username],(error,rows)=>{
//     if (error)
//       console.log(error);
//   });
//   res.redirect('/user/dashboard');
// });

// // //insurance
// // app.get('/user/Insurance/applicationIdentity',isAuthenticated,(req,res)=>{
// //   res.render('Public/Dashboard/InsuranceScheme/applicationIdentity.hbs');
// // });
// // app.get('/user/Insurance/applicationAddress',isAuthenticated,(req,res)=>{
// //   res.render('Public/Dashboard/InsuranceScheme/applicationAddress.hbs');
// // });
// // app.get('/user/Insurance/applicationWorkBank',isAuthenticated,(req,res)=>{
// //   res.render('Public/Dashboard/InsuranceScheme/applicationWorkBank.hbs');
// //
// // });


// module.exports={salt,app,passport};
// //
// // app.post('/login',(req,res)=>{
// //   console.log(req.body);
// //
// //   let stmt = `SELECT * FROM users WHERE username=? AND password=?`;
// //   //let todo = [req.body.username,req.body.email,req.body.password,false];
// //   users.query(stmt,[req.body.username,req.body.password],function (err, result,fields) {
// //   //  if (err) throw err;
// //   var d=new Date();
// //     if(result[0].username ==req.body.username && result[0].password==req.body.password){
// //       let stmt = `UPDATE users SET last_login =? WHERE username =? AND password =?`;
// //       let todo = [d,req.body.username,req.body.password];
// //       users.query(stmt,todo, function (err, result){
// //         if (err)
// //           console.log(err);
// //         console.log("login date update");
// //       });
// //       otp.otp_key=Math.floor(100000 + Math.random() * 900000);
// //       mailmake.text=otp.otp_key.toString();
// //       mailmake.to=result[0].email;
// //       mailsend.send();
// //       res.redirect('/otp');
// //       console.log('false');
// //     }
// //     //console.log(result);
// //     //console.log(result[0].username+'hello');
// //
// //     //res.render('Public/Home/Aunthentication/otp.hbs');
// //   });
// //   //res.redirect('/otp');
// // });
