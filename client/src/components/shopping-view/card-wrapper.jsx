import { Item } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCardItemsContent from "./card-items-content"
import { Navigate, useNavigate } from "react-router-dom";

    function UserCardWrapper({cardItems,setOpneCardSheet}){
       const navigate=useNavigate()

        const totalCartAmount =
    cardItems && cardItems.length > 0
      ? cardItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

           

        return (   <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4"> 
                {
                    cardItems && cardItems.length >0 ?
                    cardItems.map(Item=> < UserCardItemsContent cardItem={Item}/>) :null
                }
            </div>
            <div className="mt-8 space-y-4">
            <div className="flex justify-between">
             <span className="font-bold">Total</span>
             <span className="font-bold">${ totalCartAmount}</span>
           </div>
            </div>
            <Button onClick={()=> {
              navigate('/shop/checkout')
              setOpneCardSheet(false)
            }} 
              className="w-full mt-6">
                Checkout
            </Button>
        </SheetContent>
        )
    }



    export default UserCardWrapper