const express = require('express')
const router = express()
//import route
const productRoute = require('./product.route')
const userRoute = require('./user.route')
const authRoute = require('./auth.route')
const orderRoute = require('./order.route')
const promoRoute = require('./promo.route')
// const historyRoute = require('./history.route')
//end import route
router.get('/', (req,res)=>{
  return res.send("backend for coffeshop")
})

router.use('/products', productRoute)
router.use('/user', userRoute)
router.use('/auth', authRoute)
router.use('/order', orderRoute)
router.use('/promo', promoRoute)
// router.use('/history', historyRoute)
module.exports = router