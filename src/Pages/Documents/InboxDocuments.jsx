import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { dbDoc } from "../../Components/db/dbDocuments.mjs";
import { NavLink } from "react-router-dom";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "../../Components/db/Redux/actions/sendMessages";
import DocumentDetail from "../DocumentDetail";

export default function InboxDocuments() {
  const [open, setOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };
  const stateDocs = useSelector((state) => state.sendedDocs);
  console.log(stateDocs);

  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSend = (document) => {
    // setModalOpen(true);
    dispatch(sendMessages(document));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    minHeight: "500px",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 4,
    p: 4,
  };

  return (
    <Box height="100%" width="100%">
      <Stack p="20px 30px">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="30px" mb="10px" fontWeight="600">
            Inbox
          </Typography>
          <IconButton>
            <FilterAltIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
        </Stack>
        <Divider />

        <Stack
          direction="row"
          m="15px 0 15px 0"
          alignItems="center"
          spacing={3}
        >
          <Typography width="80px"></Typography>
          <Typography color="gray" minWidth="90px">
            Name
          </Typography>
          <Typography color="gray" minWidth="150px">
            From
          </Typography>
          <Typography color="gray" minWidth="240px">
            Status
          </Typography>
          <Typography color="gray">Date</Typography>
        </Stack>
        <Divider />
        <Stack spacing={2}>
          {dbDoc.map((item) => (
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
                <Stack>
                  <Button onClick={handleModalOpen}>
                    SEND to
                    <ForwardToInboxIcon sx={{ ml: "10px" }} />
                  </Button>
                  <div>
                    <Modal
                      open={modalOpen}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      BackdropProps={{
                        style: {
                          backgroundColor: "#7F7F7F",
                          opacity: "0.1",
                        },
                      }}
                    >
                      <Box sx={style} maxHeight="800px" overflow="scroll">
                        <Stack alignItems="end">
                          <IconButton onClick={handleClose}>X</IconButton>
                        </Stack>
                        <DocumentDetail />
                      </Box>
                    </Modal>
                  </div>
                </Stack>
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
              <Divider />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
