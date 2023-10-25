import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
  "catagory/fetchCategory",
  async () => {
    const res = await axios.get("http://localhost:3000/readCategory", {
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    });
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categorys: [],
  },
  extraReducers: {
    [fetchCategory.fulfilled]: (state, action) => {
      state.categorys = action.payload;
    },
  },
});
