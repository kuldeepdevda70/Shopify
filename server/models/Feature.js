
const mongose=require('mongoose')


const FeatureSchema=new mongose.Schema({
    image:String

},{timestamps:true})

module.exports=mongose.model('Feature',FeatureSchema)


