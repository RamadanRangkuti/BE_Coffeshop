orderModel = require('../models/order.model')

const orderController = {
  get:(req,res)=>{
    return orderModel.get(req.body)
    .then((result)=>{
      return res.status(200).send({message:"succes",data:result})
    })
    .catch((err)=>{
      return res.status(500).send({message:err})
    })
  },
  getDetail:(req,res)=>{
    idUser = req.params.idUser
    return orderModel.getDetail(idUser)
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
    const request = {
      ...req.body,
      // file: req.files,

    }
    // for(let i=0; i<request.file.length; i++){
    //   if(request.file[i].size>1048576 * 5){
    //     return res.status(400).send({ message: "File too large!" })
    //   }
    // }
    return orderModel.add(request)
    .then((result)=>{
      return res.status(201).send({ message: "succes", data: result })
    })
    .catch((error)=>{
      return res.status(500).send({ message: error })
    })
  }
}

module.exports = orderController