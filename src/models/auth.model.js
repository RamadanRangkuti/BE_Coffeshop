const db =  require('../../helper/connection')
const{ v4: uuidv4 } = require('uuid') 
const bcrypt = require('bcrypt')

const authModel = {
  login:({username,password})=>{
    console.log(username,password)
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE username=$1`,[username],(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          if(result.rows.length===0){
            return reject('username/password salah')
          }else{
            bcrypt.compare(password, result.rows[0].password,(err,hashingResult)=>{
              //console.log(result)
              if(err){
                return reject('username/password salah')
              }
              if(!hashingResult){
                return reject('username/password salah')
              }else{
                return resolve(result.rows[0])
              }
            })
          }
        }
      })
    })
  },
  register:({username,password})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (id, username, password) VALUES ($1,$2,$3)`,
      [uuidv4(),username,password],
      (err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(`ADD SUCCES`)
        }
      })
    })
  }
}


module.exports = authModel