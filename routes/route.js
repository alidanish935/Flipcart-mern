import express from 'express'
import { userSignUp ,userLogin, userOtpSend, userVerifyCont } from '../controller/user-controller.js';
import {addToCart, deleteCartItem, getCartItem} from '../controller/cartController.js'
import { getProducts,getProductById } from '../controller/productController.js';
// import {addPaymentGateway} from '../controller/payment-controller.js'
const router = express.Router();

console.log('payUsingPaytm in routes')
router.post('/signup',userSignUp)
router.post('/login',userLogin)
// router.post('/payment',addPaymentGateway)
router.post('/sendotp',userOtpSend)
router.post('/verify',userVerifyCont)
router.post('/addtocart',addToCart)

router.get('/products',getProducts)
router.get('/product/:id',getProductById)
router.get('/getcartItem/:customer_id',getCartItem)

router.delete('/deleteproduct/:id',deleteCartItem)
export default router