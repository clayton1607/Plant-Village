var {con}=require('../db/mysql');
var company=con;

  let sql = "CREATE TABLE if not exists company (name varchar(255),email varchar(255),message varchar(255),hashtag varchar(255),start varchar(255),end varchar(255))";
  admin.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

module.exports={admin};