productModel = require('../models/product.model')
const { unlink } = require('node:fs')

const productController = {
  get:(req,res)=>{
    return productModel.get(req.query)
    .then((result)=>{
      return res.status(200).send({message:'succes',data:result})
    })
    .catch((err)=>{
      return res.status(500).send({message:err})
    })
  },
  getDetail:(req,res)=>{
    return productModel.getDetail(req.params.id)
    .then((result)=>{
      if(result != null){
        return res.status(201).send({message:'success',data:result})
      }else{
        return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
      }
    })
    .catch((error)=>{
      return res.status(500).send({message:error})
    })
  },
  add:(req,res)=>{
    if(req.body.title != null && req.body.price != null && req.body.categories != null){
      const request = {
        ...req.body,
        file : req.files,
       }
       for (let i = 0; i < request.file.length; i++) {
        if (request.file[i].size > 1048576 * 5) {
          return res.status(400).send({ message: "File too large!" });
        }
      }
       return productModel.add(request)
       .then((result)=>{
         return res.status(201).send({message:'success',data:result})
       })
       .catch((error)=>{
         return res.status(500).send({message:error})
       })
      }else{
        return res.status(400).send({ message: "Field cannot be empty!" });
      }
    //console.log(req.file)
    //console.log(req.files)
    //console.log(req.body)

  },
  update:(req,res)=>{
    const request = {
      ...req.body,
      id:req.params.id,
      file: req.files
    }
    console.log(request)
    return productModel.update(request)
    .then((result)=>{
      if (typeof result.oldImages != "undefined") {
        for (let i = 0; i < result.oldImages.length; i++) {
          console.log(result.oldImages[i].filename)
          unlink(`public/uploads/images/${result.oldImages[i].filename}`, (err) => {
              console.log(`successfully deleted ${result.oldImages[i].filename}`)})}
              return res.status(201).send({ message: "succes", data: result })
        //return res.status(200).send({message : "Updating data product by id success",data:result})
      } else {
        return res.status(400).send({ message: "product not found" });
      }
      //return res.status(201).send({message:'success',data:result})
    })
    .catch((error)=>{
      return res.status(500).send({message:error})
    })
  },
  remove:(req,res)=>{
    return productModel.remove(req.params.id)
    .then((result)=>{
      console.log(result[0].filename)
      for (let i = 0; i < result.length; i++) {
        unlink(`public/uploads/images/${result[i].filename}`, (err) => {
          if (err) throw err;
          // console.log(`Product has been deleted! ${result[i].filename}`);
      }); 
      }
      return res.status(201).send({message:'success deleted',data:result})
    })
    .catch((error)=>{
      return res.status(500).send({message:error})
    })
  }
}


module.exports = productController