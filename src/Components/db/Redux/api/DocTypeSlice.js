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

export const getDocTypes = createAsyncThunk("getDocTypes", async () => {
  const response = await AxiosInstance.get(`/docs/doctypes`);
  return response.data;
});
export const createDocTypes = createAsyncThunk(
  "createDocTypes",
  async (body) => {
    const resp = await AxiosInstance.post(`/docs/doctype`, body);
    resp.data.message == "Successfully"
      ? toast.success("Üstünlikli döredildi!")
      : toast.error("Şowsuz!");
    const response = await AxiosInstance.get(`/docs/doctypes`);
    return response.data;
  }
);
// Create the slice

const getDocumentTypes = createSlice({
  name: "getDocumentTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getDocTypes.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getDocTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDocTypes.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDocTypes.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createDocTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createDocTypes.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });

    //create
  },
});

export default getDocumentTypes.reducer;
