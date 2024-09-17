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

export const finishDocument = createAsyncThunk(
  "finishDocument",
  async ({ body, id }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await AxiosInstance.patch("/docs/finish", body);
      toast.success("Resminama üstünlikli tamamlandy!");
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
// Create the slice

const userFinishDocument = createSlice({
  name: "userFinishDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(finishDocument.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(finishDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(finishDocument.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default userFinishDocument.reducer;
