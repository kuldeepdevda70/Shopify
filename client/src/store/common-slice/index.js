import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: []
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",

  async () => {
    
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    console.log("Full API Response:", response.data)

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
    "/order/addFeatureImage",
  
    async (image) => {
      
      const response = await axios.post(
        `http://localhost:5000/api/common/feature/add`,
        {image}
      );
      console.log("Full API Response:", response.data)
  
      return response.data;
    }
  );

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers:{
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
          console.log("action.payload.data;",action.payload.data)
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
       console.log("state.searchResults",state.searchResults)
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});





export default commonSlice.reducer;