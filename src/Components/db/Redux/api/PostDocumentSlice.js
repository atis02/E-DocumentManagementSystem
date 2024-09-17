import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { userSendedDocuments } from "./UserSendedDocumentSlice";
import { getDocument } from "./UserGetDocumentSlice";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const getSms = createAsyncThunk("getSms", async () => {
  const response = await AxiosInstance.get(`/sms-phones/first`);
  return response.data;
});

export const createDocument = createAsyncThunk(
  "createDocument",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const resp = await AxiosInstance.post("/docs/share", body);
      if (resp.status === 200) {
        toast.success("Resminama üstünlikli döredildi!");
        // Optionally dispatch an action to refresh documents list
        dispatch(getDocument());
        dispatch(userSendedDocuments()); // Refresh documents list if needed
      } else {
        toast.warn("Ýalňyşlyk");
      }
      return resp.data;
    } catch (error) {
      toast.error("Ýalňyşlyk!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Create the slice

const postDocument = createSlice({
  name: "postDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSms.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getSms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(getSms.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })

      //create

      .addCase(createDocument.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.data = action.payload; // Update data with fetched documents
      })
      .addCase(userSendedDocuments.fulfilled, (state, action) => {
        state.sendingData = action.payload; // Refresh sendingData
      });
  },
});

export default postDocument.reducer;
