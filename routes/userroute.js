const express = require("express");
const user = express.Router();
const {UserModel} =require("../modules/usermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


user.get("/",async(req,res)=>{
    res.send("user page");
})

user.post("/register",async(req,res)=>{
   let {name, email, password,age} =req.body;
   let user = await UserModel.find({email});
   if(user.length>0){
    res.send("user with this email is already exist");
   }else{
     bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            console.log(err);
        }else{
            let newuser = new UserModel({name,email,password:hash,age});
            await newuser.save();
            res.send("user successfully Singup!");
        }
     })
   }
})

user.post("/login",async(req,res)=>{
    let { email, password} =req.body;
    let user = await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.send("Invalid Crediantials");
            }else{
               let token = jwt.sign({UserID:user[0]._id},process.env.key);
               res.send(token);
            }
        })
    }else{
         res.send("Invalid Crediantials");
    }
 })

module.exports={user};