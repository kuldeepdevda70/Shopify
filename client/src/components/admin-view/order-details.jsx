import { Separator } from "@radix-ui/react-dropdown-menu";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import CommonForm from "@/common/form";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, upadateOrderstatus } from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast"
;



    const initialFormData={
         status:''
    }
function AdminOrderDetailsView({orderDetails}) {

     const [formData,setFormData]=useState(initialFormData)
     const {user}=useSelector(state=>state.auth)
     const dispatch=useDispatch()
     const {toast}=useToast() 

         function handleUpdateStatus(event){
                event.preventDefault()
                console.log(formData,"formData")
                 const {status}=formData;
                

                 dispatch(upadateOrderstatus({id:orderDetails?._id,orderStatus :status})).then(data=>{
                    console.log(data,'1234')

                    if(data?.payload?.success){
                          dispatch(getOrdersDetailsForAdmin(orderDetails?._id))
                           dispatch (getAllOrdersForAdmin())
                          setFormData (initialFormData)
                          toast({
                            title:data?.payload?.message,
                          });
                       
                    }
                 })
         }
  return (
    <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-6">
          <div className="grid gap-2">
                    <div className="flex mt-6 items-center  justify-between">
                      <p className="font-medium">Order ID</p>
                      {/* Label for Order ID */}
                      <Label className="text-sm font-medium text-gray-700">{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center  justify-between">
                      <p className="font-medium">Order Date</p>
                      {/* Label for Order ID */}
                      <Label className="text-sm font-medium text-gray-700">{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center  justify-between">
                      <p className="font-medium">Order Price</p>
                      {/* Label for Order ID */}
                      <Label className="text-sm font-medium text-gray-700">${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center  justify-between">
                      <p className="font-medium">
                      Payment Method</p>
                      {/* Label for Order ID */}
                      <Label className="text-sm font-medium text-gray-700">{orderDetails?.
                      paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center  justify-between">
                      <p className="font-medium">Order Price</p>
                      {/* Label for Order ID */}
                      <Label className="text-sm font-medium text-gray-700">{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center  justify-between">
                      <p className="font-medium">Payment Status</p>
                      {/* Label for Order ID */}
                      <Label className="text-sm font-medium text-gray-700">
                        
                      <Badge
                        className={`py-1 px-3 ${
                          orderDetails?.orderStatus === "confirmes"
                            ? "bg-green-500"
                            : orderDetails?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                      {orderDetails?.orderStatus }
                     </Badge></Label>
                    </div>
                  </div>
                       <Separator/>
         <div className="grid gap-4">
                      <div className="grid gap-2">
                          <div className="font-medium">Order Details</div>
                          <ul className="grid gap-3">
                            {
                              orderDetails?.cardItems &&  orderDetails.cardItems.length >0 ?
                              orderDetails?.cardItems.map(Item=>  <li className="flex items-center justify-between">
                                <span>Title:{Item.title}</span>
                                <span> Quantity:{Item.quantity}</span>
                                <span>Price:${Item.price}</span>
                            </li>):null
                            }
                             
                          </ul>
                      </div>
                  </div>
         <div className="grid gap-4">
                  <div className="grid gap-2">
                  <div className="font-medium">Shipping Info</div>
                      <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user.userName}</span>
                             <span>{orderDetails?.addressInfo?.address}</span>
                             <span>{orderDetails?.addressInfo?.city}</span>
                             <span>{orderDetails?.addressInfo?.pincode}</span>
                             <span>{orderDetails?.addressInfo?.phone}</span>
                             <span>{orderDetails?.addressInfo?.notes}</span>
                      </div>
                   </div>  
                  </div>
        <div>
             <CommonForm formControls={
                [
                    
                        {
                            label: "Order Status",
                            name: "status",
                            componentType: "select",
                            options: [
                                { id: "pending", label: "Pending" },  
                              { id: "inProcess", label: "In Process" },
                              { id: "inShipping", label: "In Shipping" },
                              { id: "delivered", label: "Delivered" },
                              { id: "rejected", label: "Rejected" },
                             
                            ],
                          },
                    
                ]
             }
                formData={formData}
                setFormData={setFormData}
                 ButtonText={'Update Order Status'}
                 onSubmit={handleUpdateStatus}
             />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
