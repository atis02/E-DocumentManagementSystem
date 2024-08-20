import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const index = () => {
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
        Bildirişler
      </Typography>
      <Stack
        backgroundColor="#fff"
        spacing={4}
        minHeight="80vh"
        borderRadius="20px"
        m="0px 20px "
        pb="10px"
        boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
      ></Stack>
    </Box>
  );
};

export default index;
