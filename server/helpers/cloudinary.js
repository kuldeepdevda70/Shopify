const cloudinary=require('cloudinary').v2
const multer= require('multer')


cloudinary.config({
    cloud_name:"dalcmzvby",
    api_key:"155482156216368",
    api_secret:"3WX6jgA9f669QeWzvujMUXkZmeQ"
})

 const storage=new multer.memoryStorage();

  async function imageUploadUtil(file) {

    const result= await cloudinary.uploader.upload(file,{
         resource_type:"auto",
    }) 

     return result;
    
  }


  const upload =multer({storage});

  module.exports={upload,imageUploadUtil}
