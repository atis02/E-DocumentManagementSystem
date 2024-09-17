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

export const getUsers = createAsyncThunk("getUsers", async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await AxiosInstance.get("/user/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});
export const updateImg = createAsyncThunk("updateImg", async (body) => {
  const resp = await AxiosInstance.post(`/user/updata-img`, body);
  resp.data.message == "User profil photo updated successfully"
    ? toast.success("Üstünlikli döredildi!")
    : toast.error("Şowsuz!");

  return resp;
});
// Create the slice

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getUsers.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
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

export default users.reducer;
