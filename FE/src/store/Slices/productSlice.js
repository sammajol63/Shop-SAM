import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const res = await axios.get("http://localhost:3000/coba", {
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    });
    return res.data;
  }
);

export const detailProduct = createAsyncThunk(
  "product/detailProduct",
  async (id) => {
    const res = await axios.get(`http://localhost:3000/detailProduct/${id}`, {
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    });
    return res.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addproduct",
  async ({ file, name, description, price, categoryId }) => {
    const res = await axios.post(
      "http://localhost:3000/createProduct",
      {
        file,
        name,
        description,
        price,
        categoryId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, name, description, price, categoryId }) => {
    const res = await axios.put(
      `http://localhost:3000/updateProduct/${id}`,
      {
        name,
        description,
        price,
        categoryId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/deleteProduct/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return res.data;
  }
);
export const transaction = createAsyncThunk(
  "product/transaction",
  async ({ no_order, total, name }) => {
    const res = await axios.post(
      "http://localhost:3000/transaction",
      { no_order, total, name },
      {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    console.log(res.data);
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    isError: null,
    products: [],
    productContainer: [],
    filterData: [],
    singleProduct: [],
    cart: [],
    searchData: [],
  },
  reducers: {
    filterProduct: (state, action) => {
      if (action.payload == "all") {
        state.products = state.filterData;
      } else {
        state.products = state.filterData.filter(
          (el) => el.categoryId == action.payload
        );
        console.log(action.payload);
      }
    },
    searchProduct: (state, action) => {
      state.products = state.productContainer.filter((el) =>
        el.name.toLowerCase().includes(action.payload)
      );
    },
    removeProduct: (state, action) => {
      state.products.pop(action.payload);
    },
    addToCart: (state, action) => {
      let oldItems = state.cart.filter((data) => data.id !== action.payload.id);
      let newItems = state.cart.filter((data) => data.id == action.payload.id);
      let newQty = newItems.length ? newItems[0]?.qty + 1 : 1;
      newItems.length
        ? (newItems[0] = { ...action.payload, qty: newQty })
        : (newItems = [{ ...action.payload, qty: newQty }]);
      oldItems.push(newItems[0]);
      state.cart = oldItems;
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((data) => data.id != action.payload);
    },
    increment: (state, action) => {
      state.cart
        ?.filter((data) => data.id === action.payload)
        .map((data) => {
          const currentdata = data.qty;
          data.qty = currentdata + 1;
          return data;
        });
    },
    decrement: (state, action) => {
      state.cart
        ?.filter((data) => data.id === action.payload)
        .map((data) => {
          const currentdata = data.qty;
          if (currentdata == 1) {
            data.qty = currentdata;
          } else {
            data.qty = currentdata - 1;
          }
          return data;
        });
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.productContainer = action.payload;
      state.filterData = action.payload;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isError = action.error;
    },
    [addProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload);
    },
    [addProduct.rejected]: (state, action) => {
      state.isError = action.error;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.products.pop(action.payload);
    },
    [detailProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
    },
    [updateProduct.fulfilled]: (state, action) => {
      console.log(state, action, "<><><>");
    },
  },
});

export const {
  findId,
  addToCart,
  deleteItem,
  increment,
  decrement,
  removeProduct,
  searchProduct,
  filterProduct,
} = productSlice.actions;
