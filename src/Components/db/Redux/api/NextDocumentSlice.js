import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getDocumentById } from "./GetSingleDocumentSlice";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request

export const updateDocument = createAsyncThunk(
  "updateDocument",
  async ({ body, id }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await AxiosInstance.patch("/docs/updata-version", body);
      toast.success("Resminama üstünlikli ugradyldy!");
      // Optionally dispatch an action to refresh documents list
      dispatch(getDocumentById(id));
      // Refresh documents list if needed
      return resp.data;
    } catch (error) {
      toast.error("Ýalňyşlyk!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateDocumentWithoutFile = createAsyncThunk(
  "updateDocumentWithoutFile",
  async ({ body, id }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await AxiosInstance.patch("/docs/update-share-status", body);
      toast.success("Document successfully sent!");
      // Optionally dispatch an action to refresh documents list
      dispatch(getDocumentById(id));
      // Refresh documents list if needed
      return resp.data;
    } catch (error) {
      toast.error("Failed to create document");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice

const userNextDocument = createSlice({
  name: "userNextDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(updateDocument.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDocumentWithoutFile.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateDocumentWithoutFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateDocumentWithoutFile.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });

    //create
  },
});

export default userNextDocument.reducer;
