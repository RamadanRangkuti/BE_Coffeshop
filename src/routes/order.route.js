const express = require('express')
const router = express()
// const formUpload = require('../../helper/formUpload') 

//import controller
const orderController = require('../controllers/order.controller')

router.get('/',orderController.get)
router.get('/:idUser',orderController.getDetail)
router.post('/',orderController.add)
// router.put('/',orderController.update)
//router.patch('/:id',orderController.update)
//router.delete('/:id',orderController.remove)

module.exports = router