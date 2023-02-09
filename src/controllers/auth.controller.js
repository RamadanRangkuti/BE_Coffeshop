authModel = require('../models/auth.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {JWT_PRIVATE_KEY} = process.env

const authController = {
  login:(req,res)=>{
    return authModel.login(req.body)
    .then((result)=>{
      jwt.sign({
        id:result.id,
        role:result.role
      },JWT_PRIVATE_KEY,{expiresIn : "1d"},(err,token)=>{
        return res.status(200).send({message:'succes',data: {
          token,
          user : result
        }})
      })
    })
    .catch((err)=>{
      return res.status(400).send({message:err})
    })
  },
  register:(req,res)=>{ 
//validasi
    if (req.body.email == undefined || req.body.password == undefined || req.body.phone == undefined){
      return res.status(500).send({ message: "Something went wrong on register form!" })
    }else{
      if(req.body.username != null && req.body.password != null && req.body.password.length >= 8 && req.body.username.length !=""){
        //console.log(req.body.password.length)
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
          if(err){
            return res.status(500).send({message: err.message})
          }else{
            const request = {
              username : req.body.username,
              password : hash
            }
            return authModel.register(request)
            .then((result)=>{
              return res.status(201).send({message:'success',data:result})
            })
            .catch((error)=>{
              return res.status(500).send({message:error})
            })
          }
        }); 
      }else{
        return res.status(400).send({ message: "Field cannot be empty & Your password must be at least 8 characters" });
      } 
    }      
  },
}


module.exports = authController