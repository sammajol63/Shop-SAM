import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }) => {
    const res = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (res.data.access_token) {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
    }
    return res.data.access_token;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ email, name, password }) => {
    const res = await axios.post(
      "http://localhost:3000/registerUser",
      {
        email,
        name,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return res.data;
  }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("http://localhost:3000/readUser", {
    headers: {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("access_token"),
    },
  });
  return res.data;
});

export const detailUser = createAsyncThunk("user/detailUser", async (id) => {
  const res = await axios.get(`http://localhost:3000/detailUser/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      access_token: localStorage.getItem("access_token"),
    },
  });
  return res.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, name }) => {
    const res = await axios.put(
      `http://localhost:3000/updateUser/${id}`,
      {
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return res.data;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUSer", async (id) => {
  const res = await axios.delete(`http://localhost:3000/deleteUser/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      access_token: localStorage.getItem("access_token"),
    },
  });
  return res.data;
});

export const lupaPassword = createAsyncThunk(
  "users/lupaPassword",
  async ({ email }) => {
    const res = await axios.put("http://localhost:3000/forgotPassword", {
      email,
    });
    console.log(res.data);
    return res.data;
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ token, password }) => {
    const res = await axios.put("http://localhost:3000/resetPassword", {
      token,
      password,
    });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    isError: null,
    loginUsers: [],
    users: [],
    singleUser: [],
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginUsers = action.payload;
    },
    [login.error]: (state, action) => {
      state.isError = action.error;
    },
    [fetchUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [fetchUser.error]: (state, action) => {
      state.isError = action.error;
    },
    [detailUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.id === action.payload.id ? action.payload : state.users;
    },
    [updateUser.error]: (state, action) => {
      state.isError = action.error;
    },
    [deleteUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((el) => el.id !== id);
      }
    },
    [deleteUser.error]: (state, action) => {
      state.isError = action.error;
    },
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    },
    [register.error]: (state, action) => {
      state.isError = action.error;
    },
    [lupaPassword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [lupaPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.id === action.payload.id ? action.payload : state.users;
    },
    [lupaPassword.error]: (state, action) => {
      state.isError = action.error;
    },
  },
});

export const { searchUser } = userSlice.actions;
