import CommonForm from "@/common/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"
import { addressFormControls } from "@/config"
import { Item } from "@radix-ui/react-dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice"
import { data } from "autoprefixer"
import AddressCard from "./address-card"
import { useToast } from "@/hooks/use-toast"
import { Variable } from "lucide-react"


  function Address({setCurrentSelectedAddress,selectedId}){

         const initialAddressFormData={
              address :'',
              city:'',
              pincode:'',
              notes:''

         }

      const [formData,setFormData]=useState( initialAddressFormData)
       const [currentEditedId,setCurrentEditedId]=useState(null)
       
         const dispatch= useDispatch()

         const {user}=useSelector(state=>state.auth)
         const {addressList}=useSelector(state=>state.shopAddress)
         const {toast}=useToast()
            

            function handleManageAddress( event){
                    event.preventDefault()
                     if(addressList.length >=3 && currentEditedId===null){
                         setFormData(initialAddressFormData)
                         toast({
                            title:' You can Add max 3 Addresses',
                             variant:'destructive'
                         })

                          return;
                     }
                     
                     currentEditedId !==null ? dispatch(editaAddress({
                        userId : user?.id, addressId: currentEditedId, formData
                     })).then((data)=>{
                        if(data?.payload?.success){
                             dispatch(fetchAllAddresses(user?.id))
                             setCurrentEditedId(null)
                             setFormData(initialAddressFormData)
                             toast({
                                title: 'Address updated successfully'
                                })
                        }
                     }) :
                         dispatch (addNewAddress({
                            ...formData,
                            userId:user?.id
                         })).then(data=>{
                             console.log(data,"data")
                             if(data?.payload?.success){
                                    dispatch(fetchAllAddresses(user?.id))
                                    setFormData(initialAddressFormData)
                                    toast({
                                    title: 'Address Added successfully'
                                    })
                             }
                         })
            }

               function handleDeleteAddress(getCurrentAddress){
                           console.log(getCurrentAddress ,"getCurrentAddress")

                           dispatch(deleteAddress({userId:user?.id, addressId:getCurrentAddress?._id})).then(data=>{
                                if(data?.payload?.success){
                                      dispatch(fetchAllAddresses(user?.id))
                                      toast({
                                        title: 'Address deleted successfully'
                                        })
                                }
                           })
               } 
              
              
              
               function handleEditAddress(getCuurentAddress) {
                setCurrentEditedId(getCuurentAddress?._id);
                setFormData({
                  ...formData,
                  address: getCuurentAddress?.address,
                  city: getCuurentAddress?.city,
                  phone: getCuurentAddress?.phone,
                  pincode: getCuurentAddress?.pincode,
                  notes: getCuurentAddress?.notes,
                });
              }

             function isFormValid(){
                 return Object.keys(formData).map(key=> formData[key].trim() !=='').every(Item=>Item)

             }

             useEffect(() => {
                dispatch(fetchAllAddresses(user?.id));
              }, [dispatch]);
            
              console.log(addressList, "addressList");

              
     return(
      <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                    selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;