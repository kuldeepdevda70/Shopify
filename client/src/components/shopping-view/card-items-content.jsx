import { CarTaxiFront, Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { deleteCardItems, upadeCardQuantity } from "@/store/shop/card-slice"
import { useDispatch, useSelector } from "react-redux"
import { data } from "autoprefixer";
import { useToast } from "@/hooks/use-toast";

function UserCardItemsContent({cardItem}){
    const { user } = useSelector((state) => state.auth);
      const dispatch=useDispatch() 
       const{toast} =useToast()
       const {cardItems} = useSelector(state=>state.shopCard)
        const {productList}=useSelector(state=>state.shopProducts)

        function handleCardUpdateQuantity(getCardItem,typeOfAction){
         if(typeOfAction == 'plus'){
          let getCardItems=cardItems.items || []
          if(getCardItems.length){
             const indexOfCurrentCardItem=getCardItems.findIndex(Item=>Item.productId=== getCardItem?.productId)
          
          
             const getCurrentProductIndex = productList.findIndex(
              (product) => product._id === getCardItem?.productId
            );
             
             const getTotalStock = productList[getCurrentProductIndex].totalStock;
                   
                  if(indexOfCurrentCardItem>-1){
                    const getQuantity=getCardItems[indexOfCurrentCardItem].quantity
                    if(getQuantity +1 > getTotalStock){
                          toast({
                             title:`${getQuantity} quantity can be added for this item`,
                             variant: 'destructive'
                          })
                          return
                    }
                  }
      
             
  
          }
         }
            
    dispatch(
        upadeCardQuantity({
          userId: user?.id,
          productId: getCardItem?.productId,
          quantity:
            typeOfAction === "plus"
              ? getCardItem?.quantity + 1
              : getCardItem?.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is updated successfully",
          });
        }
      });
    }

         function handleCardItemDelete(getCardItem){
            console.log("getCartItem?.productId",getCardItem?.productId)
            dispatch( deleteCardItems({ userId: user?.id, productId: getCardItem?.productId }))
            .then((data) => {
                if (data?.payload?.success) {
                  toast({
                    title: "Cart item is deleted successfully",
                  });
                }
              });
         }

       
    return <div className="flex items-center space-x-4">
    <img
      src={cardItem?.image}
      alt={cardItem?.title}
      className="w-20 h-20 rounded object-cover"
    />
       <div className="flex-1">
        <h3 className="font-extrabold">{cardItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full" 
            size="icon"
             disabled={cardItem?.quantity===1}
              
              onClick={()=> handleCardUpdateQuantity(cardItem,'minus')}
            >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decreasee</span>
         </Button>
         <span className="font-semibold">{cardItem?.quantity}</span>
         <Button
            variant="outline"
            className="h-8 w-8 rounded-full" 
            size="icon"
            onClick={()=> handleCardUpdateQuantity(cardItem,'plus')}>
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decreasee</span>
         </Button>
        </div>

      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cardItem?.salePrice > 0 ? cardItem?.salePrice : cardItem?.price) *
            cardItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash onClick={()=>handleCardItemDelete(cardItem)} className="cursor-pointer mt-1 size={20}"/>
      </div>
    </div>
        
    
}

export default UserCardItemsContent