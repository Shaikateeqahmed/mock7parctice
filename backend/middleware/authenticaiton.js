const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.key,(err,decode)=>{
            if(err){
                res.send("Invalid Token");
            }else{
                const UserID = decode.UserID;
                req.body.UserID = UserID;
                next();
            }
        })
    }else{
       res.send("Please Login Again");
    }
}

module.exports={authenticate};