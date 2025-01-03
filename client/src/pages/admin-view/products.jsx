import CommonForm from "@/common/form"
import ProductImageUpload from "@/components/admin-view/image-upload"
import AdminProductTile from "@/components/admin-view/product.tile"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetHeader, SheetTitle,Sheet } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config/index"
import { useToast } from "@/hooks/use-toast"
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice"
import { Item } from "@radix-ui/react-select"
import { data } from "autoprefixer"
import { Key } from "lucide-react"


import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

   
    


 const initialFormData ={
    image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
 }

function AdminProducts(){
    const [openCreateProductsDialog,setOpenCreateProductsDialog]=useState(false)
    
    const [formData,setFormData]= useState(initialFormData)
    const [imageFile,setImageFile]=useState(null)
    const [uploadedImageUrl,setUploadedImageUrl]= useState('')
    const [imageLoadingState,setImageLoadingState]=useState(false)
    const [currentEditedId,setCurrentEditedId]=useState(null)
    const { productList } = useSelector((state) => state.adminProducts);
    const {toast}= useToast()
    
    const dispatch =useDispatch()
      function onSubmit(event){

         event.preventDefault()

         currentEditedId !== null
         ? dispatch(
             editProduct({
               id: currentEditedId,
               formData,
             })
           ).then((data) => {

             console.log(data, "edit");
             if(data?.payload?.success) {
              dispatch(fetchAllProducts())
              setFormData(initialFormData);
              setOpenCreateProductsDialog(false)
              setCurrentEditedId(null)
             }

           }) :


         dispatch(addNewProduct({
           ...formData,
           image:uploadedImageUrl
         })).then((data)=>{
            console.log(data)
           if(data?.payload?.success){
            dispatch(fetchAllProducts())
             setOpenCreateProductsDialog(false)
            setImageFile(null);
            setFormData(initialFormData)
             toast ({
               title: 'product add successfully'
             })
           }
         })
      }

      function  handleDelete(getCurrentProductId){
        console.log('getCurrentProductId',getCurrentProductId)

        dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
          if(data?.payload?.success){
            dispatch(fetchAllProducts())
          }
        })
      }

      function isFormValid(){
         return Object.keys(formData).map (Key=> formData[Key]!=='').every(Item=> Item)
      }

      useEffect(()=>{
         dispatch(fetchAllProducts())
      },[dispatch])

      console.log('productList',uploadedImageUrl,productList)

      
    return (
     <Fragment>
        <div className="mb-5  w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Product </Button>

        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {
             productList && productList.length > 0 ?
             productList.map(productItem=>(
             <AdminProductTile setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
            product={productItem}
            handleDelete={handleDelete}
            />
              )) : null
          }
        </div>
        <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
         
         setOpenCreateProductsDialog(false);
            setCurrentEditedId(null)
            setFormData(initialFormData)
        }}>
          
      
        <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
                <SheetTitle>
                  {
                    currentEditedId !==null ?
                    'Edit Product' : 'Add New Product'
                  }
                </SheetTitle>
            </SheetHeader>
            <ProductImageUpload  imageFile={imageFile}
             setImageFile={setImageFile}
             uploadedImageUrl={uploadedImageUrl}
             setUploadedImageUrl={setUploadedImageUrl}
             setImageLoadingState={setImageLoadingState}
             imageLoadingState={imageLoadingState}
             isEditMode={currentEditedId !==null}
              />

            <CommonForm
              formData={formData} onSubmit={onSubmit} setFormData={setFormData} 
               buttonText={currentEditedId !==null ? 'Edit': 'Add'} formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
        </SheetContent>
        </Sheet>
     </Fragment>
    )
}

export default AdminProducts