import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/store/auth-slice/index.js";
import adminProductsSlice from './admin/products-slice'
import adminOrderSlice from "./admin/order-slice/index"

import shopProductsSlice from "./shop/product-slice"
import shopCardSlice from "./shop/card-slice"
import shopAddressSlice from "./shop/address-slice"
import shopOrderSlice from "./shop/order-slice"
import shopSearchSlice from "./shop/search-slice"
import shopReviewSlice from "./shop/review-slice"
import commonFeatureSlice from "./common-slice/index"






const store = configureStore({
    reducer: {
        auth: authReducer, // The "auth" state slice is managed by authReducer
       adminProducts: adminProductsSlice,
        shopProducts:shopProductsSlice,
        adminOrder: adminOrderSlice,
        shopCard:shopCardSlice,
         shopAddress: shopAddressSlice,
         shopOrder:shopOrderSlice,
         shopSearch:shopSearchSlice,
         shopReview:shopReviewSlice,
         commonFeature:commonFeatureSlice
         
    },
});

export default store;
