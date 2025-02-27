import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request

export const getDocument = createAsyncThunk("getDocument", async () => {
  const userID = JSON.parse(localStorage.getItem("user"));

  const response = await AxiosInstance.get(`docs/get/${userID.id}`);
  return response.data;
});
export const postReaded = createAsyncThunk("postReaded", async (body) => {
  const userID = JSON.parse(localStorage.getItem("user"));

  const resp = await AxiosInstance.patch("/docs/isreaded", body);
  const response = await AxiosInstance.get(`docs/get/${userID.id}`);
  return response.data;
});
// Create the slice

const userGetDocument = createSlice({
  name: "userGetDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getDocument.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postReaded.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postReaded.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postReaded.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default userGetDocument.reducer;
