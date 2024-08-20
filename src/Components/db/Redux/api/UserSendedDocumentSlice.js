import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const userSendedDocuments = createAsyncThunk(
  "userSendedDocuments",
  async () => {
    const userID = JSON.parse(localStorage.getItem("user"));
    console.log(userID.id);

    const response = await AxiosInstance.get(`docs/send/${userID.id}`);
    return response.data;
  }
);

// Create the slice

const SendedDocuments = createSlice({
  name: "SendedDocuments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(userSendedDocuments.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(userSendedDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(userSendedDocuments.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });

    //create
  },
});

export default SendedDocuments.reducer;
