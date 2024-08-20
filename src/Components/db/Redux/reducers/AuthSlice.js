import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/AxiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: false,
  isAuth: false,
  user: null,
  token: null,
  error: null,
};

export const login = createAsyncThunk("login", async (credentials) => {
  try {
    const response = await AxiosInstance.post("/user/login", credentials);
    const token = response.data && response.data.token;
    const user = response.data;
    localStorage.setItem("token", JSON.stringify(token));
    return user;
  } catch (error) {
    toast.error(response.data.message);
  }
});
export const register = createAsyncThunk("register", async (credentials) => {
  try {
    const response = await AxiosInstance.post(
      "/user/registration",
      credentials
    );
    toast.success(
      response.data.message === "Registration seccseful"
        ? "Üstünlikli"
        : response.data.message
    );
  } catch (error) {
    toast.error(response.data.message);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null; // Reset error when a new login starts
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false; // Stop loading when login is successful
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store the error
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.loading = false; // Ensure loading is reset on logout
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;
export default authSlice.reducer;
