const Feature =require("../../models/Feature")




const addFeatureImage=async(req,res)=>{
    try {
            const {image}=req.body

             const featuresImages=new Feature({
                image
             })

             await featuresImages.save();

             res.status(201).json({
                success:true,
                data:featuresImages
             })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Some Error occured !"
        })
    }
}

const getFeatureImage=async(requestAnimationFrame,res)=>{
    try {

        const image=await Feature.find({})
        res.status(200).json({
            success:true,
            data:image
         })
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Some Error occured !"
        })
    }
}


module.exports={addFeatureImage,getFeatureImage}