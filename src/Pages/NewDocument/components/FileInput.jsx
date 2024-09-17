import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const FileInput = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    if (onFileChange) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <>
      <Box direction="row" justifyContent="center">
        <Stack position="relative" display="inline-block">
          <input
            type="file"
            onChange={handleFileChange}
            id="file"
            multiple
            className="file-input"
          />
          <label for="file" className="file-input-label"></label>
        </Stack>
      </Box>
    </>
  );
};

export default FileInput;
