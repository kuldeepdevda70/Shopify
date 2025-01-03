const mongoose=require('mongoose')



const ProductReviewSchema=new mongoose.Schema({
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,

},{Timestamp:true})

module.exports=mongoose.model('ProductReview',ProductReviewSchema)