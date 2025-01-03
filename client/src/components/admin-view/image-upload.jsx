import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useEffect, useRef } from "react";
import { CloudUpload ,FileIcon,XIcon} from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";


function ProductImageUpload({imageFile,setImageFile
  ,uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState, 
  setImageLoadingState,
  isEditMode,
  isCustomstyling=false
}){
     
    const inputRef= useRef(null)

          function handleImageFileChange(event){

            console.log(event.target.files);

            const selectedFIle=event.target.files?.[0]

            if(selectedFIle) setImageFile(selectedFIle)

          }

   function handleDragOver(event){
     event.preventDefault()

   }

   function handleDrop (){
    event.preventDefault()
    const droppedFile=event.dataTransfer.files?.[0];

    if(droppedFile) setImageFile(droppedFile)
   }

   function handleRemoveImage(){
     setImageFile(null)
     if(inputRef.current){
       inputRef.current.value=''
     }
   }

   async  function uploadImageToCloudinary(){
    setImageLoadingState(true)
     const data=new FormData();
     data.append('my_file',imageFile)
     const response=await axios.post('http://localhost:5000/api/admin/products/image-upload',data)
     console.log(response,'response');

     if(response?.data?.success) setUploadedImageUrl(response.data.result.url)
      setImageLoadingState(false)
   }


   useEffect(()=>{
    if(imageFile !==null) uploadImageToCloudinary()
   },[imageFile])

            
    return (
       
        <div  className={`w-full  mt-4 ${isCustomstyling ? '' : 'max-w-md mx-auto'}`}>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${  isEditMode ? "opacity-60" : "" } border-2 border-dashed rounded-lg p-4`}>
                <Input id="image-upload" type="file" 
                className="hidden" 
                 ref={inputRef}  onChange={handleImageFileChange}
                 disabled={isEditMode}
                 />
                
                 
                 {
                    !imageFile ?(
                    <Label
                    htmlFor="image-upload"
                    className={`${isEditMode ? 'cursor-not-allowed':""}flex flex-col items-center justify-center h-32 cursor-pointer`}  >
                      <CloudUpload className="w-10 h-10 text-muted-foreground mb-2" />
                      <span>Drag & drop or click to upload image</span>
                    </Label>
                     )  : (
                      imageLoadingState ?
                          
                          <Skeleton className='h-10 bg-gray-100'/>:
                          
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                          </div>
                          <p className="text-sm font-medium">{imageFile.name}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                          >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              

export default ProductImageUpload