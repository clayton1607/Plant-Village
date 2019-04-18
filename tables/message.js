var {con}=require('../db/mysql');
var message=con;

  let sql = "CREATE TABLE if not exists message(id varchar(255),email varchar(255),message varchar(255),item varchar(255),area varchar(255),mdate varchar(255),reply varchar(255))";
  message.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

module.exports={message};