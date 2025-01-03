const express=require('express')

const{createOrder,capturePayment,getAllOrdersByUser,getOrdersDetails}=require('../../controllers/shop/order-controller')


const router=express.Router()

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrdersDetails);

module.exports=router