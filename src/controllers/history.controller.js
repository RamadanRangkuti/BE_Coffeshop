// historyModel = require('../models/history.model')

// const historyController = {
//   get:(req,res)=>{
//     return historyModel.get(req.query)
//     .then((result)=>{
//       return res.status(200).send({message:"succes",data:result})
//     })
//     .catch((err)=>{
//       return res.status(500).send({message:error})
//     })
//   },
//   getDetail:(req,res)=>{
//     return historyModel.getDetail(req.params.id)
//     .then((result)=>{
//       if(result != null){
//         return res.status(201).send({message:'succes',data:result})
//       }else{
//         return res.status(404).send({message:"Sorry data not found please check your input ID"})
//       }
//     })
//     .catch((err)=>{
//       return res.status(500).send({message:error})
//     })
//   },
//   add:(req,res)=>{
//     const request = {
//       ...req.body,
//       file: req.files,
//     }
//     for(let i=0; i<request.file.length; i++){
//       if(request.file[i].size>1048576 * 5){
//         return res.status(400).send({ message: "File too large!" })
//       }
//     }
//     return historyModel.add(request)
//     .then((result)=>{
//       return res.status(201).send({ message: "succes", data: result })
//     })
//     .catch((error)=>{
//       return res.status(500).send({ message: error })
//     })
//   }
// }

// module.exports = historyController