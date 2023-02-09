const { urlencoded,json } = require('express')
const express = require('express')
const app = express()
const router = require('./src/routes/index')
//manggil helper
const db = require('./helper/connection')
const{ v4: uuidv4 } = require('uuid') 
//const cors = require('cors')

//mnerima application/www.form-encoded
app.use(urlencoded({extended:true}))
app.use(json())

// app.use(cors({
//   origin : ['ramadanrangkuti.com']
// }))

//prefix
app.use('/api/v1/', router)


//endpoint products
// app.get('/products',(req,res)=>{
//   db.query(`SELECT * FROM products`,(err,result)=>{
//     if(err){
      // return res.status(500).send({
      //   message: err.message
      // })
//     }else{
      // return res.status(200).send({
      //   message:"succes", 
      //   data: result.rows
      // })
//     }
//   })
// })

// app.get('/products/:id',(req,res)=>{
//   const {id}=req.params
//   db.query(`SELECT * FROM products WHERE id='${id}'`,(err,result)=>{
//     if(err){
//       return res.status(500).send({
//         message: err.message
//       })
//     }else{
//       return res.status(200).send({
//         message:"succes", 
//         data: result.rows[0]
//       })
//     }
//   })
// })

// app.post('/products',(req,res)=>{
//   const {title,img,price,categories} = req.body
  // db.query(`INSERT INTO products (id,title,img,price,categories) VALUES ('${uuidv4()}','${title}','${img}','${price}','${categories}')`,(err,result)=>{
  //   if(err){
  //     return res.status(500).send({
  //       message: err.message
  //     })
  //   }else{
  //     return res.status(201).send({
  //       message:"succes", 
  //       data: req.body
  //     })
  //   }
  // })
// })

// app.put('/products/:id',(req,res)=>{
//   const{title,img,price,categories} = req.body
//   const {id}=req.params
  // db.query(`UPDATE products SET title='${title}', img='${img}', price='${price}', categories='${categories}' WHERE id='${id}'`,(err,result)=>{
  //   if(err){
  //     return res.status(500).send({
  //       message: err.message
  //     })
  //   }else{
  //     return res.status(201).send({
  //       message:`success update data id ${id}`, 
  //       data: res.body
  //     })
  //   }
  // })
// })

// app.patch('/products/:id',(req,res)=>{
//   const{title,img,price,categories} = req.body
//   const {id}=req.params
//   db.query(`SELECT * FROM products WHERE id='${id}'`,(err,result)=>{
//     if(err){
//       return res.status(500).send({
//         message: err.message
//       })
//     }else{
//       const dataUpdate = [result.rows[0].title,result.rows[0].title,result.rows[0].price,result.rows[0].categories]
//       db.query(`UPDATE products SET title='${title || result.rows[0].title}', img='${img || result.rows[0].title}', price='${price || result.rows[0].price}', categories='${categories || result.rows[0].categories}' WHERE id='${id}'`,(err,result)=>{
//         if(err){
//           return res.status(500).send({
//             message: err.message
//           })
//         }else{
//           return res.status(201).send({
//             message:`success update data id ${id}`, 
//             data: res.body
//           })
//         }
//       })
//     }
//   })
// })

// app.delete('/products/:id',(req,res)=>{
//   const {id}=req.params
  // db.query(`DELETE FROM products WHERE id='${id}'`,(err,result)=>{
  //   if(err){
  //     return res.status(500).send({
  //       message: err.message
  //     })
  //   }else{
  //     return res.status(201).send({
  //       message:`success delete data id ${id}`, 
  //       data: {}
  //     })
  //   }
  // })
// })

app.get('*',(req,res)=>{
  return res.send({
    status:404,
    message:"not found"
  })
})


app.listen(3000, (req,res)=> {
  console.log('backend succesfully running on port 3000')
})