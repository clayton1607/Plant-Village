var {con}=require('../db/mysql');
var academic=con;

  let sql = "CREATE TABLE if not exists academic (rollNo varchar(255),English varchar(255),Maths varchar(255),Science varchar(255))";
  academic.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

module.exports={academic};
