
import Address from '@/components/shopping-view/address'
import img from '../../assets/account.jpg'
import { useDispatch, useSelector } from 'react-redux'
import UserCardItemsContent from '@/components/shopping-view/card-items-content'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { data } from 'autoprefixer';
import { useToast } from '@/hooks/use-toast';



function ShoppingCheckOut(){
      const {cardItems}=useSelector((state) => state.shopCard);
      const {user}=useSelector((state) => state.auth);
       const {approvalUrl}=useSelector((state)=>state.shopOrder)
      const [currentSelectedAddress,setCurrentSelectedAddress]=useState(null)
      const [isPaymentStart,setIsPaymentStart]=useState(false)
     const dispatch=useDispatch()
      const {toast}=useToast()

       console.log(cardItems,"cardItems")
      
      const totalCartAmount =
            cardItems &&  cardItems.items && cardItems.items.length > 0
             ? cardItems.items.reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.salePrice > 0
                ? currentItem?.salePrice
                : currentItem?.price) *
                currentItem?.quantity,
            0
          )
        : 0;
      
        function handleInitiatepaypalpayment(){
          if( cardItems.length===0){
            toast({
              title:'Your Card is empty. Please add items to proceed',
              variant : 'destructive'
            })
            return;
           } 
              if(currentSelectedAddress==null){
               toast({
                 title:'Please Select one address to proceed',
                 variant : 'destructive'
               })
               return;
              } 
            
           const OrderData={
            userId :user?.id,
            cardId: cardItems?._id,
            cardItems: cardItems.items.map((singleCardItem) => ({
              productId: singleCardItem?.productId,
              title: singleCardItem?.title,
              image: singleCardItem?.image,
              price:
              singleCardItem?.salePrice > 0
                  ? singleCardItem?.salePrice
                  : singleCardItem?.price,
              quantity: singleCardItem?.quantity,
            })),
            addressInfo: {
              addressId: currentSelectedAddress?._id,
              address: currentSelectedAddress?.address,
              city: currentSelectedAddress?.city,
              pincode: currentSelectedAddress?.pincode,
              phone: currentSelectedAddress?.phone,
              notes: currentSelectedAddress?.notes,
            },
            OrderStatus :'pending',
             paymentMethod: 'paypal',
             paymentStatus: 'pending',
             totalAmount :totalCartAmount,
             orderDate : new Date(),
             orderUpdateDate:new Date(),
             paymentId:'',
            payerId: ''
           }
             
           dispatch(createNewOrder(OrderData)).then((data)=>{
               console.log(data,"kuldeep")
               if(data?.payload?.success){
                    setIsPaymentStart(true)
               } else{
                 setIsPaymentStart(false)
               }
             })  
        }

           if(approvalUrl){
            window.location.href=approvalUrl;
           }

       return (
        <div className="flex flex-col">
          <div className="relative h-[300px] w-full overflow-hidden">
            <img src={img} className="h-full w-full object-cover object-center" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
            <Address
                  selectedId={currentSelectedAddress}
               setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
            <div className="flex flex-col gap-4">
              {cardItems && cardItems.items && cardItems.items.length > 0
                ? cardItems.items.map((item) => (
                    <UserCardItemsContent cardItem={item} />
                  ))
                : null}

             <div className="mt-8 space-y-4">
            <div className="flex justify-between">
             <span className="font-bold">Total</span>
             <span className="font-bold">${ totalCartAmount}</span>
           </div>
            </div>
            <div className='mt-4 w-full '>
                <Button onClick={handleInitiatepaypalpayment} className="w-full">
                     {
                         isPaymentStart ? 'Processing PayPal Payment....'
                         : "checkout with Paypal" 
                     }
                 </Button>
            </div>
            </div>
            
          </div>

        </div>
    )
}

export default ShoppingCheckOut