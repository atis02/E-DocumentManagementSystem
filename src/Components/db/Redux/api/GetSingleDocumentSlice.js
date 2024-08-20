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

const userID = JSON.parse(localStorage.getItem("user"));

export const getDocumentById = createAsyncThunk(
  "userGetDocumentById/getDocumentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `docs/get-item-doc?userId=${userID.id}&documentId=${id}`
      );
      console.log(response.data);

      return response.data.document;
    } catch (error) {
      toast.error("Failed to fetch document");
      console.log(error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice

const userGetDocumentById = createSlice({
  name: "userGetDocumentById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getDocumentById.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default userGetDocumentById.reducer;
