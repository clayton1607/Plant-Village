var {con}=require('../db/mysql');
var budget=con;

  let sql = "CREATE TABLE if not exists budget (category varchar(255),alot varchar(255))";
  budget.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

module.exports={budget};