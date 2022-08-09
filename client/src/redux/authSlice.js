import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null, //tra thong tin tu api login
      isFetching: false, // loading
      error: false, // error
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true; // khi bat dau dang nhap => loading
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false; // khi dang nhap xong load xong roi
      state.login.currentUser = action.payload; // tra thong tin nguoi dung
      state.login.error = false; //error
    },
    loginFailed: (state) => {
      state.login.isFetching = false; // loading false
      state.login.error = true; //error
    },
    registerStart: (state) => {
      state.register.isFetching = true; // khi bat dau dang nhap => loading
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false; // khi dang nhap xong load xong roi
      state.register.error = false; //error
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false; // loading false
      state.register.error = true; //error
      state.register.success = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
} = authSlice.actions;

export default authSlice.reducer;
