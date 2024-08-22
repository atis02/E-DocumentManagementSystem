import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../reducers/AuthSlice";
import PostDocumentSlice from "./PostDocumentSlice";
import UserGetDocumentSlice from "./UserGetDocumentSlice";
import UserSendedDocumentSlice from "./UserSendedDocumentSlice";
import GetSingleDocumentSlice from "./GetSingleDocumentSlice";
import NextDocumentSlice from "./NextDocumentSlice";
import GetSingleOutSlice from "./GetSingleOutSlice";
import getDocTypeSlice from "./DocTypeSlice";
import ImageUpdateSlice from "./ImageUpdateSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    postDocument: PostDocumentSlice,
    userGetDoc: UserGetDocumentSlice,
    userCreatedDocs: UserSendedDocumentSlice,
    userGetDocumentById: GetSingleDocumentSlice,
    userGetOutDocument: GetSingleOutSlice,
    nextDocument: NextDocumentSlice,
    getDocTypes: getDocTypeSlice,
    imgAccount: ImageUpdateSlice,
  },
});
