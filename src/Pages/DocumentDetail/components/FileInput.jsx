import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const FileInput = () => {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileInfo(
        `Faýl ady: ${selectedFile.name}, 
        Faýl göwrümi: ${
          selectedFile.size > 1000000000
            ? selectedFile.size / 1000000000 + "GB"
            : selectedFile.size > 1000000
            ? selectedFile.size / 1000000 + "MB"
            : selectedFile.size > 1000
            ? selectedFile.size / 1000 + "KB"
            : selectedFile.size + "Bytes"
        } `
      );
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
            className="file-input"
          />
          <label for="file" className="file-input-label"></label>
        </Stack>
        <Stack>
          {fileInfo.length == 0 ? (
            "Faýl saýlanmady"
          ) : (
            <Typography>{fileInfo}</Typography>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default FileInput;
