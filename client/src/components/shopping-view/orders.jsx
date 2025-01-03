import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import ShoppingOrdersDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrdersDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
    
function ShoppingOrders() {
  const[openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth)
  const {orderList,orderDetails}=useSelector((state)=>state.shopOrder)
    
   function handleFetchOrderDetails(getId){
       console.log(getId,"getId")
           dispatch(getOrdersDetails(getId))
  }

   useEffect(()=>{
       dispatch(getAllOrdersByUserId(user?.id))
       console.log(user?.id)
   },[dispatch])

       useEffect (()=>{

             if(orderDetails !==null) setOpenDetailsDialog(true)

             
       },[orderDetails])
   

   console.log(orderDetails,"orderDetails")
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                orderList && orderList.length >0 ?
                orderList.map((orderItem)=>
                  <TableRow>
              <TableCell>{orderItem ?._id}</TableCell>
              <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
              <TableCell>
              <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmes"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                      {orderItem?.orderStatus }
           </Badge>
         </TableCell>

              <TableCell>{orderItem?.totalAmount}</TableCell>
              <TableCell>
                {/* Dialog Setup */}
                <Dialog  open={openDetailsDialog} 
                onOpenChange={()=>{
                     setOpenDetailsDialog(false)
                     dispatch(resetOrderDetails())
                }}>
                <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                  {/* Dialog Content */}
                  <DialogContent>
                    <ShoppingOrdersDetailsView  orderDetails={orderDetails} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
                )
                :null
            }
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
