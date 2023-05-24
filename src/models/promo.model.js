const db = require('../../helper/connection')
const{ v4: uuidv4 } = require('uuid') 

const promoModel={
  get:(req,res)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM promo`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(result.rows)
        }
      })
    })
  },
  getDetail:(id_promo)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM promo WHERE id_promo='${id_promo}'`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(result.rows[0])
        }
      })
    })
  },
  add:({id_promo,img,title,description,code})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO promo(id_promo,img,title,description,code) VALUES ('${uuidv4()}','${img}','${title}','${description}','${code}')`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve({id_promo,img,title,description,code})
        }
      })
    })
  }
}

module.exports = promoModel