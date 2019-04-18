var {users}=require('../tables/users.js');
var {token}=require('../tables/users.js');
const jwt =require('jsonwebtoken');


var authenticate  = (req,res,next)=>{
  var tokens=req.header('x-auth');
  console.log(token);
  var flag= true;
  var auth;
  var decoded;

  try {
      decoded=jwt.verify(token,'specialKEy');
      console.log(decoded.username);
  } catch (e) {
    flag=false;

  } finally {
    if(typeof decoded == "undefined")
      res.status(401).send();
    else{
      let sql='SELECT username FROM users WHERE username=? AND token_accees=? AND token=? ';
      users.query(sql,[decoded.username,'auth',token],(err,result)=>{
        if(err)
          console.log(err);
          console.log(result);
        if(decoded==result[0].username)
          auth= result[0].username;
        else
          flag=false;
      });
  }
}
  if(flag==false)
    res.status(401).send();
  else {
    req.user=auth;
    req.token=token;
    next();
  }
}

module.exports={authenticate};
