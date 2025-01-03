
const express=require("express")



const{addToCard,fetchCartItems,deleteCartItem,updateCartItemQty}=require("../../controllers/shop/card-controller")


const router = express.Router();

router.post("/add", addToCard);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
