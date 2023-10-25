import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Slices/CounterSlice";
import { productSlice } from "./Slices/productSlice";
import { userSlice } from "./Slices/userSlice";
import { categorySlice } from "./Slices/categorySlice";

const store = configureStore({
  reducer: {
    counterSlice: counterSlice.reducer,
    productSlice: productSlice.reducer,
    userSlice: userSlice.reducer,
    categorySlice: categorySlice.reducer,
  },
});

export default store;
