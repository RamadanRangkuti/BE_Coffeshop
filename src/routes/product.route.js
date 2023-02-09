const express = require('express')
const formUpload = require('../../helper/formUpload')
const router = express()
const verifyToken = require('../../helper/verifyToken')

//import controller
const productController = require('../controllers/product.controller')

router.get('/',productController.get)
router.get('/:id',productController.getDetail)
router.post('/',verifyToken,formUpload.array('img'),productController.add)
// router.put('/',productController.update)
router.patch('/:id',verifyToken,formUpload.array('img'),productController.update)
router.delete('/:id',verifyToken,productController.remove)

module.exports = router