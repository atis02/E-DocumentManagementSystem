import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  refreshToken:null,
};

const authSlice = createSlice
    ({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    }
  },
});

export const { loginSuccess, logout,setRefreshToken } = authSlice.actions;
export default authSlice.reducer;