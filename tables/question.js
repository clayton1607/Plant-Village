var {client}=require('../db/pg_db');
var question = client;
let stmt1= 'create table if not exists q2table (qno SERIAL ,questions varchar(256),quser varchar(256) ,type varchar(256),image_path varchar(256) ,PRIMARY KEY (qno))';
  question.query(stmt1,(error,result)=>{
  if(error)
    throw error;
    console.log("Qtable is ready");
});
let stmt2= 'create table if not exists ans3table (ansno SERIAL ,qno int,  answer varchar(256),usera varchar(256),type varchar(256),upvotes varchar(256),downvotes varchar(256),PRIMARY KEY (ansno))';
  question.query(stmt2,(error,result)=>{
  if(error)
    throw error;
    console.log("Anstable is ready");
});

module.exports={question};
