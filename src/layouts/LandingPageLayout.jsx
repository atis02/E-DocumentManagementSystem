import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../Components/db/Redux/api/UserGetDocumentSlice";
import { userSendedDocuments } from "../Components/db/Redux/api/UserSendedDocumentSlice";
// import Login from './Login'

export default function LandingPageLayout() {
  const admin = localStorage.getItem("token");
  const data = useSelector((state) => state.postDocument.data);
  const sendingData = useSelector((state) => state.userCreatedDocs.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocument());
  }, [dispatch]);
  useEffect(() => {
    dispatch(userSendedDocuments());
  }, [dispatch]);

  return (
    <Box>
      <Stack direction="row" maxHeight="100vh">
        <Sidebar data={data} sendingData={sendingData} />
        <Stack direction="column" width="100%">
          <Navbar />
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
}
