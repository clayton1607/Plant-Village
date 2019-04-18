var {con}=require('../db/mysql');
var admin=con;

  let sql = "CREATE TABLE if not exists admin (email varchar(255),password varchar(255),last_login varchar(255))";
  admin.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

module.exports={admin};
