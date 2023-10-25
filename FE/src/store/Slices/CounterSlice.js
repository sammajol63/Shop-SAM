import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterProduct: 99,
};

export const counterSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.counterProduct = state.counterProduct + 1;
    },
    decrement: (state) => {
      state.counterProduct = state.counterProduct - 1;
    },
    addByAmount: (state, action) => {
      console.log(action.payload);
      state.counterProduct += action.payload;
    },
  },
});

export const { increment, decrement, addByAmount } = counterSlice.actions;
