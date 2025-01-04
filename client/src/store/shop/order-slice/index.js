
import axios from "axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { json } from "react-router-dom";

const initialState={
    approvalUrl:null,
    isLoading:null,
    orderId:null,
    orderList:[],
    orderDetails:null
}

export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
      const response = await axios.post(
       ` ${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        orderData
      );
  
      return response.data;
    }
  );

  export const capturePayment = createAsyncThunk(
    "/order/capturePayment",
    async ({ paymentId, payerId, orderId }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
        {
          paymentId,
          payerId,
          orderId,
        }
      );
  
      return response.data;
    }
  );
 
  export const getAllOrdersByUserId = createAsyncThunk(
    "/order/getAllOrdersByUserId",
   
    async (userId) => {
      console.log(userId)
      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
       
      );
      
        console.log(response,"response")
      return response.data;
     
    }
    
  );
 
  export const getOrdersDetails = createAsyncThunk(
    "/order/getOrdersDetails",
    async (id) => {
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
       
      );

      
  
      return response.data;
      
    }
   
  );



const shoppingOrderSlice=createSlice({
     name:"shoppingOrderSlice",
     initialState,
     reducers:{
      resetOrderDetails:(state)=>{
          state.orderDetails=null
      }
     },
     extraReducers:(builder)=>{
           builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvalUrl = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem(
              "currentOrderId",
              JSON.stringify(action.payload.orderId)     )
           
          })
          .addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalUrl = null;
            state.orderId = null;
          })
          .addCase(getAllOrdersByUserId.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllOrdersByUserId.fulfilled, (state,action) => {
            console.log(action.payload.data,"action.payload.data")
            state.isLoading = false;
            state.orderList=action.payload.data
          })
          .addCase(getAllOrdersByUserId.rejected, (state) => {
            state.isLoading = false;
            state.orderList=[]
          })
          .addCase(getOrdersDetails.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrdersDetails.fulfilled, (state,action) => {
            console.log(action.payload.data,"action.payload.data")
            state.isLoading = false;
            state.orderDetails=action.payload.data
            
          })
          .addCase(getOrdersDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null;
          });
          
     }


})

export const {resetOrderDetails}=shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer