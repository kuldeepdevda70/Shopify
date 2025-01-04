import { Action } from "@radix-ui/react-toast";
import axios from "axios";
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'


 const initialState ={
       cardItems:[],
      isLoading: false
 }

 export const addToCard=createAsyncThunk('card/addCard', async({userId, productId,quantity})=>{
    console.log("Received parameters:", { userId, productId, quantity });
     const respose=await axios.post(
         `${import.meta.env.VITE_API_URL}/api/shop/card/add`,
         {
            userId,
            productId,
            quantity
         }
         
     )

      return respose.data 
 })

 export const fetchCardItems=createAsyncThunk('card/fetchCardItems', async(userId)=>{
    
    const respose=await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/card/get/${userId}`,
        
    )
       console.log(respose,'respose')
     return respose.data 
})

export const deleteCardItems=createAsyncThunk('card/deleteCardItems', async({userId, productId})=>{
    console.log(userId,productId)
    
    const respose=await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/shop/card/${userId}/${productId}`,
       
    )

     return respose.data 
})

export const upadeCardQuantity=createAsyncThunk('card/upadeCardQuantity', async({userId, productId,quantity})=>{
       console.log(userId, productId,"quantity",quantity)
    const respose=await axios.put(
       ` ${import.meta.env.VITE_API_URL}/api/shop/card/update-cart`,
        {
           userId,
           productId,
           quantity
        }
    )

     return respose.data 
})

const shoppingCardSlice=createSlice({
    name:'shoppingCard',
    initialState,

    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCard.pending,(state)=>{
             state.builder=true
        }).addCase(addToCard.fulfilled,(state,action)=>{
            state.isLoading=true
            state.cardItems=action.payload.data
        }).addCase(addToCard.rejected, (state)=>{
            state.isLoading=false,
            state.cardItems=[]
        })
        .addCase(fetchCardItems.pending,(state)=>{
            state.builder=true
       }).addCase(fetchCardItems.fulfilled,(state,action)=>{
          console.log(action.payload.data,"action.payload.data")
           state.isLoading=true
           state.cardItems=action.payload.data
       }).addCase(fetchCardItems.rejected, (state)=>{
           state.isLoading=false,
           state.cardItems=[]
       })
       .addCase(upadeCardQuantity.pending,(state)=>{
        state.builder=true
      }).addCase(upadeCardQuantity.fulfilled,(state,action)=>{
        console.log(action.payload.data,"action.payload.data")
       state.isLoading=true
       state.cardItems=action.payload.data
      }).addCase(upadeCardQuantity.rejected, (state)=>{
       state.isLoading=false,
       state.cardItems=[]
     })
     .addCase(deleteCardItems.pending,(state)=>{
        state.builder=true
      }).addCase(deleteCardItems.fulfilled,(state,action)=>{
       state.isLoading=true
       state.cardItems=action.payload.data
      }).addCase(deleteCardItems.rejected, (state)=>{
       state.isLoading=false,
       state.cardItems=[]
     })
       
         
    }
})

export default shoppingCardSlice.reducer;