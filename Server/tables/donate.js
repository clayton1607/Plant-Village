var {con}=require('../db/mysql');
var donate=con;

  let sql = "CREATE TABLE if not exists donate (name varchar(255) primary key,email varchar(255),phone varchar(255),amount varchar(255),ddate varchar(255))";
  donate.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

module.exports={donate};