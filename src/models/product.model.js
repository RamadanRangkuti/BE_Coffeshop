const db =  require('../../helper/connection')
const{ v4: uuidv4 } = require('uuid') 

const productModel = {
  //Fiter saat be
  query:(queryParams,sortType='asc',limit=12,page=1,search='')=>{
    if(queryParams.search && queryParams.cat){
      return `WHERE title LIKE '%${queryParams.search}%' AND categories LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`
    }else if(queryParams.search || queryParams.cat){
      return `WHERE title LIKE '%${queryParams.search}%' OR categories LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`
    }else{
      return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${page * limit - limit}`
    }
  },

  //filter fe
  // query:(queryParams,sortType='asc',limit=10,page=1)=>{
  //   if(queryParams.search && queryParams.cat){
  //     return `WHERE title LIKE '%${queryParams.search}%' AND categories LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`
  //   }else if(queryParams.search || queryParams.cat){
  //     return `WHERE title LIKE '%${queryParams.search}%' OR categories LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`
  //   }else{
  //     return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${page * limit - limit}`
  //   }
  // },

  get:function (queryParams){
    console.log(queryParams)
    return new Promise((resolve,reject)=>{
      db.query(
      //`SELECT * FROM products`
      //`SELECT products.id, products.title, products.categories,products.price,product_images.id_product,product_images.name ,product_images.filename FROM products INNER JOIN product_images ON products.id=product_images.id_product`
      `SELECT prod.id, prod.title, prod.categories,prod.price,prod.description, json_agg(row_to_json(prodimg)) images
      FROM products AS prod INNER JOIN (SELECT id_product, name, filename FROM product_images) AS prodimg ON prod.id=prodimg.id_product GROUP BY prod.id ${this.query(queryParams,queryParams.sortBy,queryParams.limit,queryParams.page)}`,
      (err,result)=>{
        //${this.query(queryParams,queryParams.sortBy,queryParams.limit,queryParams.page)}
        if(err){
          return reject(err.message)
        }else{
          // for (let index = 0; index < result.rowCount; index++) {
          //   const element = result.rows[index];
          //   db.query(`SELECT id_image, name, filename FROM product_images WHERE id_product=$1`,[result.rows[index].id])
          //   .then((res)=>{
          //     console.log(res.rows)
          //     return resolve({
          //       ...result.rows[index],
          //       images: res.rows
          //     })
          //   })
          // }
          //.........//
          // result.rows.map((item,index)=>{
          //   db.query(`SELECT id_image, name, filename FROM product_images WHERE id_product=$1`,[item.id])
          //   .then((res)=>{
          //     console.log(res.rows)
          //     return resolve({
          //       ...item,
          //       images: res.rows
          //     })
          //   })
          // })
          return resolve(result.rows)
        }
      })
    })
  },
  // getDetail:(id)=>{
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM products WHERE id='${id}'`,(err,result)=>{
  //       if(err){
  //         return reject (err.message)
  //       }else{
  //         return resolve (result.rows[0])
  //       }
  //     })
  //   })
  // },
  getDetail:(id)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT prod.id, prod.title, prod.price, prod.img, prod.categories, prod.description,json_agg(row_to_json(prodimg)) images FROM products AS prod INNER JOIN (SELECT id_product, name, filename FROM product_images) AS prodimg ON prod.id = prodimg.id_product WHERE prod.id = '${id}' GROUP BY prod.id`,(err,result)=>{
        if(err){    
          return reject (err.message)
        }else{
          return resolve (result.rows[0])
        }
      })
    })
  },
  add:({title,img,price,categories,file,description})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO products (id,title,img,price,categories,description) VALUES ('${uuidv4()}','${title}','${img}','${price}','${categories}','${description}') RETURNING id`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          for (let index = 0; index < file.length; index++){
            db.query(`INSERT INTO product_images (id_image, id_product, name, filename) VALUES ($1,$2,$3,$4)`,[uuidv4(),result.rows[0].id,title,file[index].filename])
          }
          return resolve({title,img,price,categories,images:file,description})
        }
      })
    })
  },  

  update:({id,title,img,price,categories,file})=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          //const dataUpdate = [result.rows[0].title,result.rows[0].title,result.rows[0].price,result.rows[0].categories]
          db.query(`UPDATE products SET title='${title || result.rows[0].title}', img='${img || result.rows[0].img}', price='${price || result.rows[0].price}', categories='${categories || result.rows[0].categories}' WHERE id='${id}'`,(err,result)=>{
            if(err){
              return reject({message: err.message})
            }else{
              //patch without upload images to table product_images
              if(file.length <=0 ) return resolve({id,title,price,categories})
              db.query(`SELECT id_image, filename FROM product_images WHERE id_product='${id}'`, (errProductImages, productImages)=>{
                if(errProductImages){
                  return reject({ message: errProductImages.message });
                }else if(productImages.rows.length < file.length){
                  return reject("you can only edit according to the number of images that exist");
                }else{
                  for (let j = 0; j < file.length; j++){
                    db.query(`UPDATE product_images SET filename=$1 WHERE id_image=$2`, [file[j].filename, productImages.rows[j].id_image], (err, result)=>{
                      if (err) return reject({ message: "Failed delete image!" })
                      return resolve({ id, title, price, categories, oldImages: productImages.rows, images: file })
                    })
                  }
                }
              })
          }
        })
       }
      })
    })
  },
  remove:(id)=>{
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM products WHERE id='${id}'`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          db.query(`DELETE FROM product_images WHERE id_product=$1 RETURNING filename`,[id],(err,result)=>{
            if(err)return reject({message:"gagal menghapus gambar"})
            return resolve(result.rows)
          })
          //return resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  },
}


module.exports = productModel