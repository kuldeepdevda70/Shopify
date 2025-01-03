const express= require('express')

const {handleImageUpload,
    addProduct,
    editProduct,
    fetchAllProducts,
    deleteProduct

}=require("../../controllers/admin/product-controller")

const{upload}=require('../../helpers/cloudinary')


const router=express.Router()
router.post('/image-upload',upload.single('my_file') , handleImageUpload)
router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProducts)


module.exports=router