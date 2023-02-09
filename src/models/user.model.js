const db =  require('../../helper/connection')
const{ v4: uuidv4 } = require('uuid') 

const userModel = {
  query:(queryParams,sortType='asc',limit=2,page=1)=>{
    if(queryParams.search && queryParams.cat){
      return `WHERE username LIKE '%${queryParams.search}%' AND email LIKE '%${queryParams.cat}%' ORDER BY username ${sortType} LIMIT ${limit}`
    }else if(queryParams.search || queryParams.cat){
      return `WHERE username LIKE '%${queryParams.search}%' OR email LIKE '%${queryParams.cat}%' ORDER BY username ${sortType} LIMIT ${limit}`
    }else{
      return `ORDER BY username ${sortType} LIMIT ${limit} OFFSET ${page * limit - limit}`
    }
  },
  get:function (queryParams){
    console.log(queryParams)
    return new Promise((resolve,reject)=>{
      db.query(`SELECT * FROM users ${this.query(queryParams,queryParams.sortBy,queryParams.limit,queryParams.page)}`,
      (err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(result.rows)
        }
      })
    })
  },
  getDetail:(id)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`,(err,result)=>{
        if(err){
          return reject (err.message)
        }else{
          return resolve (result.rows[0])
        }
      })
    })
  },
  add:({name,email,password,phone})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (id,fullname,username,password,email,img,gender,phone) VALUES ('${uuidv4()}','${name}','${email}','${password}','${phone}')`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve({name,email,password,phone})
        }
      })
    })
  },

  update:({id,name,email,password,phone})=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          //const dataUpdate = [result.rows[0].title,result.rows[0].title,result.rows[0].price,result.rows[0].categories]
          db.query(`UPDATE users SET name='${name || result.rows[0].name}', email='${email || result.rows[0].email}', password='${password || result.rows[0].password}', phone='${phone || result.rows[0].phone}' WHERE id='${id}'`,(err,result)=>{
            if(err){
              return reject({
                message: err.message
              })
            }else{
              return resolve({id,name,email,password,phone})
            }
          })
        }
      })
    })
  },
  remove:(id)=>{
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id='${id}'`,(err,result)=>{
        if(err){
          return reject(err.message)
        }else{
          return resolve(`succes deleted id: ${id}`)
        }
      })
    })
  },
}


module.exports = userModel