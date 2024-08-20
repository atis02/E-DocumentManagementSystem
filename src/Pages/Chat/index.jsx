import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import QRCodeComponent from "../Account/components/QRCodeComponent";

const index = () => {
  const [qrValue, setQrValue] = useState("");

  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="scroll"
    >
      <Typography
        p="10px 20px"
        fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
        fontFamily="Montserrat"
        fontWeight="600"
      >
        Söhbetdeşlik
      </Typography>
      <Stack
        backgroundColor="#fff"
        spacing={4}
        minHeight="80vh"
        borderRadius="20px"
        m="0px 20px "
        pb="10px"
        boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
        alignItems="center"
        justifyContent="center"
      >
        <QRCodeComponent value={qrValue} />
        <TextField
          type="text"
          value={qrValue}
          onChange={(e) => setQrValue(e.target.value)}
          placeholder="URL ýada tekst"
        />
      </Stack>
    </Box>
  );
};

export default index;
