import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




   const initialState={
    orderList:[],
    orderDetails:null
   }
   export const getAllOrdersForAdmin= createAsyncThunk(
    "/order/getAllOrdersForAdmin",
   
    async () => {
     
      const response = await axios.get(

        `http://localhost:5000/api/admin/orders/get`
       
      );
      
        console.log(response,"response")
      return response.data;
     
    }
    
  );
 
  export const getOrdersDetailsForAdmin = createAsyncThunk(
    "/order/getOrdersDetailsForAdmin",
    async (id) => {
      
      console.log(id,"id")
      const response = await axios.get(
        `http://localhost:5000/api/admin/orders/details/${id}`
       
      );

      
  
      return response.data;
      
    }
   
  );

  export const upadateOrderstatus = createAsyncThunk(
    "/order/upadateOrderstatus",
    async ({id,orderStatus}) => {
      
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/update/${id}`,
        {
          orderStatus
        }
       
      );

      
  
      return response.data;
      
    }
   
  ); 
const adminOrderSlice=createSlice({
    name:'adminOrderSlice',
     initialState,
     reducer:{
           resetOrderDetails:(state)=>{
            state.orderDetails=null
        }
     },
     extraReducers:(builder)=>{
         builder.addCase(getAllOrdersForAdmin.pending, (state) => {
                     state.isLoading = true;
                   })
                   .addCase(getAllOrdersForAdmin.fulfilled, (state,action) => {
                     console.log(action.payload.data,"action.payload.data")
                     state.isLoading = false;
                     state.orderList=action.payload.data
                   })
                   .addCase(getAllOrdersForAdmin.rejected, (state) => {
                     state.isLoading = false;
                     state.orderList=[]
                   })
                   .addCase(getOrdersDetailsForAdmin.pending, (state) => {
                     state.isLoading = true;
                   })
                   .addCase(getOrdersDetailsForAdmin.fulfilled, (state,action) => {
                     console.log(action.payload.data,"action.payload.data")
                     state.isLoading = false;
                     state.orderDetails=action.payload.data
                     
                   })
                   .addCase(getOrdersDetailsForAdmin.rejected, (state) => {
                     state.isLoading = false;
                     state.orderDetails = null;
                   });
                   
     }
}
)
  

export const {resetOrderDetails}=adminOrderSlice.reducer;

export default adminOrderSlice.reducer

