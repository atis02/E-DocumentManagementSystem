import React from "react";
import QRCode from "qrcode.react";
import { Stack } from "@mui/material";

function QRCodeComponent({ value }) {
  return (
    <Stack>
      <h1>QR Code </h1>
      <QRCode value={value} />
    </Stack>
  );
}

export default QRCodeComponent;
