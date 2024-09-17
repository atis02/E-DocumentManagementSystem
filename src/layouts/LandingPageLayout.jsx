import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../Components/db/Redux/api/UserGetDocumentSlice";
import { userSendedDocuments } from "../Components/db/Redux/api/UserSendedDocumentSlice";
import { toast, ToastContainer } from "react-toastify";
// import Login from './Login'

export default function LandingPageLayout() {
  const [hasNotified, setHasNotified] = useState(false);
  const admin = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const data = useSelector((state) => state.postDocument.data);
  const sendingData = useSelector((state) => state.userCreatedDocs.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocument());
    dispatch(userSendedDocuments());
  }, [dispatch]);

  const filteredUsers = data.length
    ? data
        .map((entry) => entry.document.sharedDocuments) // Map to arrays
        .flat() // Flatten the arrays into a single array
        .filter(
          (doc) =>
            // doc.status === true &&
            doc.recipient.id === user.id && doc.readed === false
        )
        .map((doc) => doc.recipient)
    : "";

  useEffect(() => {
    const notificationState = localStorage.getItem("documentNotificationShown");

    if (
      !notificationState &&
      filteredUsers.length > 0
      // &&
      // filteredDocs.length > 0
    ) {
      // Show the notification
      toast.info(
        `Size ${
          filteredUsers.length > 0
            ? filteredUsers.length
            : // : filteredDocs.length > 0
              // ? filteredDocs.length
              ""
        } sany dokument geldi!`,
        {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      // Mark that the notification has been shown
      localStorage.setItem("documentNotificationShown", "true");
      setHasNotified(true);
    }
  }, [filteredUsers]);

  return (
    <Box>
      <Stack direction="row" maxHeight="100vh">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Sidebar data={filteredUsers} sendingData={sendingData} />
        <Stack direction="column" width="100%">
          <Navbar />
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
}
