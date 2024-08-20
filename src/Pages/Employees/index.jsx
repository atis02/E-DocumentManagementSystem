import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Users } from "../../Components/db/users";

const index = () => {
  const [titleSearch, setTitleSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filtered, setFiltered] = useState(Users);
  const filteredUsers = () => {
    const updatedUsers = Users.filter((elem) => {
      if (titleSearch === "") {
        return elem;
      } else if (
        elem.fullName.toLowerCase().includes(titleSearch.toLowerCase())
      ) {
        return elem;
      }
    });
    return setFiltered(updatedUsers);
  };
  const style = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    minHeight: "60%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    border: "1px solid green",
    boxShadow: 44,
    gap: "10px",
    p: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
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
        Işgärler
      </Typography>
      <Stack
        backgroundColor="#fff"
        spacing={4}
        minHeight="80vh"
        borderRadius="20px"
        m="0px 20px "
        pb="10px"
        boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "row" }}
            alignItems="center"
            justifyContent="center"
            ml={{ xs: 2 }}
            p="15px"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
              sx={{ color: "#000", minWidth: "150px", mr: "20px" }}
              onChange={(e) => setTitleSearch(e.target.value)}
              value={titleSearch}
              placeholder="Ady boýunça gözle"
              InputProps={{
                sx: {
                  height: "45px",
                  color: "#000",
                  fontWeight: "600",

                  padding: "none",
                },
              }}
            />
            <Button variant="outlined" onClick={filteredUsers}>
              Gözle
            </Button>
            <Button
              variant="outlined"
              sx={{
                background: "red",
                color: "#fff",
                "&:hover": { backgroundColor: "red" },
              }}
              onClick={() => {
                setFiltered(Users);
                setTitleSearch("");
              }}
            >
              X
            </Button>
          </Stack>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "row" }}
            alignItems="center"
            justifyContent="center"
            ml={{ xs: 2 }}
            p="15px"
          >
            {/* <TextField
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
              sx={{ color: "#000", minWidth: "150px", mr: "20px" }}
              onChange={(e) => setTitleSearch(e.target.value)}
              value={titleSearch}
              placeholder="Ulanyjy Ady"
              InputProps={{
                sx: {
                  height: "45px",
                  color: "#000",
                  fontWeight: "600",

                  padding: "none",
                },
              }} 
            />*/}
            <Button
              sx={{
                // ...(Users.find((elem) => elem.email !== "admin")
                //   ? {
                //       background: "lightgray",
                //     }
                //   : { background: "green" }),
                color: "#fff",
                background: "rgb(7, 172, 7)",
                "&:hover": { background: "green" },
              }}
              // disabled={Users.find((elem) => elem.email !== "admin")}
              variant="outlined"
              onClick={handleOpen}
            >
              Ulanyjy Goşmak
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack alignItems="end" width="100%" mt={-2}>
                  <IconButton
                    sx={{ fontWeight: 600, fontSize: 20 }}
                    onClick={handleClose}
                  >
                    X
                  </IconButton>
                </Stack>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  sx={{ color: "#000" }}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  value={titleSearch}
                  placeholder="Ulanyjy Ady"
                  InputProps={{
                    sx: {
                      height: "45px",
                      color: "#000",
                      fontWeight: "600",
                      width: "380px",
                      padding: "none",
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  sx={{ color: "#000" }}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  value={titleSearch}
                  placeholder="Ulanyjy Familiýasy"
                  InputProps={{
                    sx: {
                      height: "45px",
                      color: "#000",
                      fontWeight: "600",
                      width: "380px",
                      padding: "none",
                      mt: "10px",
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  sx={{ color: "#000" }}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  value={titleSearch}
                  placeholder="Ulanyjy Wezipesi"
                  InputProps={{
                    sx: {
                      height: "45px",
                      color: "#000",
                      fontWeight: "600",
                      width: "380px",
                      padding: "none",
                      mt: "10px",
                    },
                  }}
                />
                <Button
                  sx={{
                    color: "#fff",
                    background: "blue",
                    "&:hover": { background: "green" },
                  }}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Goşmak
                </Button>
              </Box>
            </Modal>
          </Stack>
        </Stack>
        <Stack>
          {filtered.length <= 0 ? (
            <Typography
              fontFamily="Montserrat"
              textAlign="center"
              fontSize={18}
              // pt="50px"
            >
              Users not Found
            </Typography>
          ) : (
            filtered.map((item, index) => (
              <Stack
                key={item.id}
                onClick={() => {
                  localStorage.setItem("document", JSON.stringify([item]));
                }}
                color="#000"
                direction="row"
                spacing={2}
                p="5px 20px"
                className="document"
              >
                <Typography>{index + 1}.</Typography>
                <Typography>{item.fullName}</Typography>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
