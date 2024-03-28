import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { dbDoc } from "../../Components/db/dbDocuments.mjs";
import { NavLink } from "react-router-dom";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DocumentDetail from "../DocumentDetail";

export default function InboxDocuments() {
  const [open, setOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [document, setDocument] = useState(dbDoc);
  const [titleSearch, setTitleSearch] = useState("");
  const [fromSearch, setFromSearch] = useState("");

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const filterByStatus = (status) => {
    const updatedDoc = dbDoc.filter((x) => x.status === status);
    setDocument(updatedDoc);
    console.log(updatedDoc);
  };
  const filterByCat = (category) => {
    const updatedDoc = dbDoc.filter((x) => x.typeDoc === category);
    setDocument(updatedDoc);
  };
  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

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
            Gelen Resminalamalar
          </Typography>
        </Stack>
        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          // spacing={3}
          p="0 85px 0 30px"
        >
          <Typography width="70px" textAlign="center">
            Süzgüç
          </Typography>
          <TextField
            id="outlined-basic"
            // label="From"
            variant="outlined"
            sx={{ height: "35px" }}
            onChange={(e) => setTitleSearch(e.target.value)}
            value={titleSearch}
            placeholder="Ady boýunça gözle"
            InputProps={{
              sx: {
                border: "1px solid #424242",
                borderRadius: "35px",
                height: "35px",
                color: "#000",
                fontWeight: "600",

                padding: "none",
              },
            }}
          />
          <FormControl
            variant="standard"
            sx={{ pb: "15px", m: 1, minWidth: 120 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Kategoriýasy
            </InputLabel>
            <Select
              // labelId="demo-simple-select-standard-label"
              // id="demo-simple-select-standard"
              value={age}
              // disableUnderline
              onChange={handleChangeAge}
              label="Category"
            >
              <MenuItem onClick={() => filterByCat("Arza")} value="Arza">
                Arza
              </MenuItem>
              <MenuItem
                onClick={() => filterByCat("Şertnama")}
                value="Şertnama"
              >
                Şertnama
              </MenuItem>
              <MenuItem onClick={() => filterByCat("Arenda")} value="Arenda">
                Arenda
              </MenuItem>
              <MenuItem onClick={() => filterByCat("Faktura")} value="Faktura">
                Faktura
              </MenuItem>
              <MenuItem
                onClick={() => filterByCat("Bildiris")}
                value="Bildiris"
              >
                Bildiris
              </MenuItem>
              <MenuItem
                onClick={() => filterByCat("Ise almak")}
                value="Ise almak"
              >
                Ise almak
              </MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              // label="From"
              variant="outlined"
              sx={{ height: "35px" }}
              onChange={(e) => setFromSearch(e.target.value)}
              placeholder="Ugradyjy"
              InputProps={{
                sx: {
                  border: "1px solid #424242",
                  borderRadius: "35px",
                  height: "35px",
                  color: "#000",
                  fontWeight: "600",

                  padding: "none",
                },
              }}
            />
          </Stack>
          <FormControl variant="standard" sx={{ pb: "15px", minWidth: 180 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Statusy
            </InputLabel>
            <Select value={status} onChange={handleChangeStatus} label="Status">
              <MenuItem value="Hemmesi" onClick={() => setDocument(dbDoc)}>
                Hemmesi
              </MenuItem>
              <MenuItem
                value="Barlagda"
                onClick={() => filterByStatus("Barlagda")}
              >
                Barlagda
              </MenuItem>
              <MenuItem
                value="Yzyna gaýtarylan"
                onClick={() => filterByStatus("Yzyna gaýtarylan")}
              >
                Yzyna gaýtarylan
              </MenuItem>
              <MenuItem
                value="Tassyklanan"
                onClick={() => filterByStatus("Tassyklanan")}
              >
                Tassyklanan
              </MenuItem>
            </Select>
          </FormControl>

          <Typography color="gray" width="52px" fontSize={18}>
            Senesi
          </Typography>
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
