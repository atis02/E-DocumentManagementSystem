import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { dbDoc } from "../../Components/db/dbDocuments.mjs";
import { NavLink, json } from "react-router-dom";
import { Document, Page } from "react-pdf";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMessages } from "../../Components/db/Redux/actions/sendMessages";

export default function DeletedDocuments() {
  const [open, setOpen] = useState(null);

  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };
  const stateDocs = JSON.parse(localStorage.getItem("deletedDocs")) || [];

  console.log(stateDocs);
  return (
    <Box height="100%" width="100%">
      <Stack p="20px 30px">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="30px" mb="10px" fontWeight="600">
            Deleted Documents
          </Typography>
          <IconButton>
            <FilterAltIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
        </Stack>
        <Divider />

        <Stack mt="20px" spacing={2}>
          {stateDocs.length === 0 ? (
            <Typography textAlign="center" fontSize="25px" pt="50px">
              No Deleted Documents
            </Typography>
          ) : (
            stateDocs.map((item) => (
              <Stack
                key={item.id}
                onClick={() => {
                  localStorage.setItem("document", JSON.stringify([item]));
                }}
                style={{
                  color: "#000",
                  textDecoration: "none",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <Stack spacing={3} direction="row" alignItems="center">
                  <NavLink
                    to={`/document/${item.name}/${item.id}`}
                    style={{
                      color: "#000",
                      gap: "20px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ width: "60px", height: "60px" }}
                      src={
                        item.file_type === "doc"
                          ? "https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg"
                          : item.file_type === "pptx"
                          ? "https://upload.wikimedia.org/wikipedia/commons/1/16/Microsoft_PowerPoint_2013-2019_logo.svg"
                          : item.file_type === "xlsx"
                          ? "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
                          : "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                      }
                      alt=""
                    />

                    <Typography minWidth="110px" textAlign="start">
                      {item.name}
                    </Typography>
                    <Typography minWidth="100px" textAlign="start">
                      {item.sender}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Stack
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "100px",
                          ...(item.statusType === "2"
                            ? { backgroundColor: "yellow" }
                            : item.statusType === "1"
                            ? { backgroundColor: "green" }
                            : { backgroundColor: "red" }),
                        }}
                      ></Stack>
                      <Typography minWidth="260px" textAlign="start">
                        {item.status}
                      </Typography>
                    </Stack>
                    <Typography minWidth="100px" textAlign="start">
                      {item.send_date}
                    </Typography>
                    <Typography minWidth="100px" textAlign="start">
                      Limit date: {item.limit_date}{" "}
                    </Typography>
                  </NavLink>

                  <Button onClick={() => handleOpen(item.id)}>Open</Button>
                </Stack>
                {open === item.id && (
                  <Stack
                    width="90%"
                    mt="20px"
                    direction="row"
                    alignItems="center"
                    ml="70px"
                  >
                    <iframe
                      src={item.file_link}
                      style={{ border: "none", width: "100%", height: "85vh" }}
                    ></iframe>
                  </Stack>
                )}
                <Divider sx={{ mt: "10px" }} />
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
