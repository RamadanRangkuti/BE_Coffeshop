const express = require('express')
const router = express()
const formUpload = require('../../helper/formUpload')
//import controller
const promoController = require('../controllers/promo.controller')

router.get('/',promoController.get)
router.get('/:id',promoController.getDetail)
router.post('/',formUpload.array('img'),promoController.add)
// router.put('/',promoController.update)
//router.patch('/:id',promoController.update)
//router.delete('/:id',promoController.remove)

module.exports = router