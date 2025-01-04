import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: []
};

export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",

  async (keyword) => {
     console.log(keyword,"keyword")
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
    );
    console.log("Full API Response:", response.data)

    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers:{
    resetSearchResult:(state)=>{
       state.searchResults=[]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
          console.log("action.payload.data;",action.payload.data)
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
       console.log("state.searchResults",state.searchResults)
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});



export const {resetSearchResult}=searchSlice.actions

export default searchSlice.reducer;