var {client}=require('../db/pg_db');
var user_login=client;

  let sql = "CREATE TABLE if not exists user_login(user_email varchar(255),user_password varchar(255),user_name varchar(255),ddate varchar(255))";
  user_login.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");

  });

module.exports={user_login};

  