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

export const getImg = createAsyncThunk("getImg", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.img;
});
export const updateImg = createAsyncThunk("updateImg", async (body) => {
  const resp = await AxiosInstance.post(`/user/updata-img`, body);
  resp.data.message == "User profil photo updated successfully"
    ? toast.success("Üstünlikli döredildi!")
    : toast.error("Şowsuz!");

  return resp;
});
// Create the slice

const userImg = createSlice({
  name: "userImg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getImg.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getImg.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getImg.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateImg.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateImg.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateImg.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });

    //create
  },
});

export default userImg.reducer;
