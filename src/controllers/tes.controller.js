tesModel= require('../models/tes.model')

const tesController = {
  add:(req,res)=>{
    const request = {
      ...req.body,
    }
    return tesModel.add(request)
    .then((result)=>{
      return res.status(201).send({ message: "succes", data: result })
    })
    .catch((error)=>{
      return res.status(500).send({ message: error })
    })
  }
}

module.exports = tesController