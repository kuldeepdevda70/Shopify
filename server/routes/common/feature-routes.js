
const express=require("express")



const{addFeatureImage,getFeatureImage}=require("../../controllers/common/Feature-controller")


const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);


module.exports = router;