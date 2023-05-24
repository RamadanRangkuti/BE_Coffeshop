const db = require('../../helper/connection')
const{ v4: uuidv4 } = require('uuid') 

//ini udah oke tapi butuh pengembangan biar bisa lebih dari 1 product yang di order
// const orderModel={
//   get:(req,res)=>{
//     return new Promise((resolve, reject) => {
//       db.query(`SELECT ord.id, ord.id_user, ord.id_product, ord.title, ord.price, ord.size, ord.quantity, ord.delivery, ord.time, json_agg(row_to_json(prodimg)) images FROM orders AS ord INNER JOIN (SELECT id_product, filename FROM product_images) AS prodimg ON ord.id_product = prodimg.id_product GROUP BY ord.id`,(err,result)=>{
//         if(err){
//           return reject(err.message)
//         }else{
//           return resolve(result.rows)
//         }
//       })
//     })
//   },
//   getDetail:(req,res)=>{
//     return new Promise((resolve, reject) => {
//       db.query(``,(err,result))
//     })
//   },
//   // getByUserId:(user_id)=>{
//   //   return new Promise((resolve, reject) => {
//   //     db.query(`SELECT * FROM order WHERE id_user='${id_user}'`,(err,result)=>{
//   //       if(err){
//   //         return reject(err.message)
//   //       }else{
//   //         return resolve(result.rows[0])
//   //       }
//   //     })
//   //   })
//   // },
//   // getByProductId:(id_product)=>{
//   //   return new Promise((resolve, reject) => {
//   //     db.query(`SELECT * FROM order WHERE id_product='${id_product}'`,(err,result)=>{
//   //       if(err){
//   //         return reject(err.message)
//   //       }else{
//   //         return resolve(result.rows[0])
//   //       }
//   //     })
//   //   })
//   // },
//   add:({id, id_user, id_product, title, price, size, quantity, delivery, time})=>{
//     return new Promise((resolve, reject) => {
//       db.query(`INSERT INTO orders(id, id_user, id_product, title, price, size, quantity, delivery, time) VALUES ('${uuidv4()}','${id_user}','${id_product}','${title}','${price}','${size}','${quantity}','${delivery}','${time}')`,(err,result)=>{
//         if(err){
//           return reject(err.message)
//         }else{
//           db.query
//           return resolve({id, id_user, id_product, title, price, size, quantity, delivery, time})
//         }
//       })
//     })
//   }
// }

const orderModel={
  // get:(req,res)=>{
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM orders`,(err,result)=>{
  //       if(err){
  //         return reject(err.message)
  //       }else{
  //         return resolve(result.rows)
  //       }
  //     })
  //   })
  // },
  get:(req,res)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT ord.id, ord.order_id, ord.id_user, ord.id_product, ord.title, ord.price, ord.size, ord.quantity, ord.delivery, ord.time, json_agg(row_to_json(prodimg)) images FROM orders AS ord INNER JOIN (SELECT id_product, filename FROM product_images) AS prodimg ON ord.id_product = prodimg.id_product GROUP BY ord.id`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(result.rows)
        }
      })
    })
  },
  getDetail:(idUser)=>{
    return new Promise((resolve, reject) => {
      // for(let i=0; i<idUser.length; i++){
        
      // }
      db.query(`SELECT o.order_id, p.name, p.price, p.image FROM orders o JOIN products p ON o.product_id = p.id WHERE o.user_id = $1 GROUP BY o.order_id, p.name, p.price, p.image`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(result.rows[0])
        }
      })
    })
  },
  add:({id_user,delivery,time,total_qty,total_price,products,payment_method})=>{
    return new Promise((resolve, reject) => {
      const idTransc = uuidv4()
      // products.forEach(item => {
      //   console.log(`
      //     ${id_user} ${delivery}, ${time}, ${total_qty} ${total_price}
      //     ${item.title} ${varrr} ${item.quantity} ${sub_total}
      //   `)
      // })
      let result = []
      for(let i=0; i<products.length; i++ ){
        db.query(`INSERT INTO orders(id,order_id, id_user, id_product, title, price, size, quantity, sub_total, delivery, time, total_qty, total_price,img,payment_method) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`, [
          uuidv4(),
          idTransc,
          id_user,
          products[i].id_product,
          products[i].title,
          products[i].price,
          products[i].size,
          products[i].quantity,
          products[i].sub_total,
          delivery,
          products[i].time,
          total_qty,  
          total_price,
          products[i].img,
          payment_method
        ])
        result.push(products[i])
      }
      if(result.length > 0) {
        return resolve(result)
      }else {
        return reject('ada error')
      }
      })
  }
  // getByUserId:(user_id)=>{
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM order WHERE id_user='${id_user}'`,(err,result)=>{
  //       if(err){
  //         return reject(err.message)
  //       }else{
  //         return resolve(result.rows[0])
  //       }
  //     })
  //   })
  // },
  // getByProductId:(id_product)=>{
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM order WHERE id_product='${id_product}'`,(err,result)=>{
  //       if(err){
  //         return reject(err.message)
  //       }else{
  //         return resolve(result.rows[0])
  //       }
  //     })
  //   })
  // },
  //add:({id_user,delivery,time,total_qty,total_price,products})=>{
    //return new Promise((resolve, reject) => {
      // db.query(`INSERT INTO orders(id, id_user, delivery, time, total_qty, total_price, sub_total) VALUES ('${uuidv4()}','${id_user}','${delivery}','${time}','${total_qty}','${total_price}','${sub_total}')`,(err,result)=>{
      //   if(err){
      //     return reject(err.message)
      //   }else{
      //     db.query
      //     return resolve({id_user,delivery,time,total_qty,total_price,products})
      //   }
      // })

      // const idTransc = uuidv4()
      //   db.query(`
      //   ${products.map((item)=>{
        //   return `INSERT INTO orders(id,order_id, id_user, id_product, title, price, size, quantity, sub_total, delivery, time, total_qty, total_price) VALUES ('${uuidv4()}','${idTransc}','${id_user}','${item.id_product}','${item.title}','${item.price}','${item.size}','${item.quantity}','${sub_total}','${delivery},'${time},'${total_qty},'${total_price});`
        // })}
      //   `,(err,result)=>{
      //     if(err){
      //       return reject(err.message)
      //     }else{
      //       return resolve({id_user,delivery,time,total_qty,total_price,products})
      //     }
      //   })

      // const idTransc = uuidv4()
      // console.log("tessss")
      // for(let item=0; item<products.length; item++){
        // db.query(`INSERT INTO orders(id,order_id, id_user, id_product, title, price, size, quantity, sub_total, delivery, time, total_qty, total_price) VALUES ('${uuidv4()}','${idTransc}','${id_user}','${products[item].id_product}','${products[item].title}','${products[item].price}','${products[item].size}','${products[item].quantity}','${sub_total}','${delivery},'${time},'${total_qty},'${total_price}`,(err, result)=>{
        //   if(err){
      //       // return reject(err.message)
      //       console.log("error")
      //     }else{
      //       console.log("nice")
      //       // return resolve({id_user,delivery,time,total_qty,total_price,products})
      //     }
      //   }
      //   )
      // }

      // for(let i=0; i<[1,2,3,4].length; i++ ){
      //   db.query(`INSERT INTO orders(id,order_id, id_user, id_product, title, price, size, quantity, sub_total, delivery, time, total_qty, total_price) VALUES ('${uuidv4()}','${idTransc}','${id_user}','${products[i].id_product}','${products[i].title}','${products[i].price}','${products[i].size}','${products[i].quantity}','${sub_total}','${delivery},'${time},'${total_qty},'${total_price}`,(err,result)=>{
      //       console.log("tes")
      //   })
      // }

      // console.log({
      //   order_id:idTransc,
      //   id_user: id_user,
      //   id_product: item.id_product,
      //   title: item.title,
      //   price: item.price,
      //   size: item.size,
      //   quantity: item.quantity,
      //   sub_total:item.sub_total,
      //   delivery:delivery,
      //   time:time,
      //   total_qty:total_qty,
      //   total_price:total_price
      // })
      //})
      //console.log({id_user,delivery,time,total_qty,total_price,products})
  //}
}

module.exports = orderModel