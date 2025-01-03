import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
      reviews:[]
}

export const addReview = createAsyncThunk(
    "/order/addReview",
  
    async (formdata) => {
      
      const response = await axios.post(
        "http://localhost:5000/api/shop/review/add",
         formdata
      );
      console.log("Full API Response:", response.data)
  
      return response.data;
    }
  );

  export const  getReview = createAsyncThunk(
    "/order/getReview",
  
    async (id) => {
      const response = await axios.get(
        `http://localhost:5000/api/shop/review/${id}`
      );
    
      return response.data;
    });

const reviewSlice=createSlice({
    name:"reviewSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getReview.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getReview.fulfilled,(state,action)=>{
            state.isLoading=false
            state.reviews=action.payload.data
        })
        .addCase(getReview.rejected,(state)=>{
           console.log(" state.reviews", state.reviews)
            state.isLoading=false
            state.reviews=[]
        })
    }
})

export default reviewSlice.reducer