import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Login from './Login'

export default function LandingPageLayout() {
  return (
    <Box>
      <Stack direction="row" height="100%">
        <Sidebar />
        <Stack direction="column" width="100%">
          <Navbar />
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
}
