const express = require('express')
const router = express()

//import controller
const userController = require('../controllers/user.controller')

router.get('/',userController.get)
router.get('/:id',userController.getDetail)
router.post('/',userController.add)
// router.put('/',userController.update)
router.patch('/:id',userController.update)
router.delete('/:id',userController.remove)

module.exports = router