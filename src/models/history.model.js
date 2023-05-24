// const db = require('../../helper/connection')
// const { v4:uuidv4 }= require('uuid')

// const historyModel={
//   get:(req,res)=>{
//     return new Promise((resolve, reject) => {
//       db.query(`SELECT * FROM history`,(err,result)=>{
//         if(err){
//           return reject(err.message)
//         }else{
//           return resolve(result.rows)
//         }
//       })
//     })
//   },
//   getDetail:(id_history)=>{
//     return new Promise((resolve, reject) => {
//       db.query(`SELECT * FROM history WHERE id_history='${id_history}'`,(err,result)=>{
//         if(err){
//           return reject(err.message)
//         }else{
//           return resolve(result.rows[0])
//         }
//       })
//     })
//   },
//  add:({id_history,img,title,price,deliver})=>{
//   return new Promise((resolve, reject) => {
//     db.query(`INSERT INTO history(id_history,img,title,price,deliver) VALUES('${uuidv4()}','${img}','${title}','${price}','${deliver}')`,(err,result)=>{
//       if(err){
//         return reject(err.message)
//       }else{
//         return resolve({id_history,img,title,price,deliver})
//       }
//     })
//   })
//  }
// }

// module.exports = historyModel