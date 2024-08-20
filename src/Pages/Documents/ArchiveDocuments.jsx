import React, { useRef, useState } from "react";
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
  Backdrop,
} from "@mui/material";
import { dbDoc } from "../../Components/db/dbDocuments.mjs";
import { NavLink } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
const ArchiveDocuments = ({ ...props }) => {
  const [open, setOpen] = useState(null);
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [document, setDocument] = useState(dbDoc);
  const [titleSearch, setTitleSearch] = useState("");
  const [fromSearch, setFromSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [isAscending, setIsAscending] = useState(true);

  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const filterByStatus = (status) => {
    const updatedDoc = dbDoc.filter((x) => x.status === status);
    setDocument(updatedDoc);
  };
  const filterByCat = (category) => {
    const updatedDoc = dbDoc.filter((x) => x.typeDoc === category);
    setDocument(updatedDoc);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 1,
    p: 4,
  };
  const sortData = () => {
    const sortedData = document.sort((a, b) => {
      if (isAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setIsAscending(!isAscending);
    return setDocument(sortedData);
  };
  return (
    <Box
      height="100vh"
      overflow="scroll"
      backgroundColor="#f2f9fc"
      width="100%"
    >
      <Stack>
        <Typography
          fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          p="10px"
        >
          Arhiw
        </Typography>
        <Stack
          backgroundColor="#fff"
          spacing={1}
          minHeight="80vh"
          borderRadius="20px"
          m="0px 10px"
          pb="10px"
          boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
        >
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="space-between"
            m="15px 0"
          >
            <Stack
              direction={{ lg: "row", md: "row", sm: "row", xs: "row" }}
              alignItems="center"
              ml={{ xs: 2 }}
              pt="10px"
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
              <Stack direction="row" alignItems="center">
                Süzgüçler
                <IconButton
                  sx={{ mr: "10px" }}
                  onClick={() => setOpenFilter(!openFilter)}
                >
                  <FilterAltIcon
                    sx={{ width: "40px", height: "40px", color: "blue" }}
                  />
                </IconButton>
                <Button
                  sx={{ fontSize: "20px", mr: "20px" }}
                  onClick={sortData}
                >
                  {isAscending ? "Z-A ⬆️" : "A-Z ⬇️"}
                </Button>
                {openFilter && (
                  <Stack
                    top={{ lg: 200, md: 200, sm: 200, xs: 220 }}
                    zIndex={10}
                    backgroundColor="#fff"
                    borderRadius="7px"
                    border="1px solid lightgray"
                    right={50}
                    width={350}
                    height={500}
                    position="absolute"
                    color="#000"
                  >
                    <Stack>
                      <Typography
                        textAlign="center"
                        p="10px"
                        fontWeight={600}
                        fontFamily="Montserrat"
                        fontSize={18}
                      >
                        Sene Aralygy:
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker", "DatePicker"]}
                        >
                          <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            pl={{ lg: 5, md: 5, sm: 5, xs: 0 }}
                          >
                            <DatePicker
                              format="DD/MM/YYYY"
                              label="Başlangyç Sene"
                              defaultValue={dayjs()}
                            />
                            <Stack justifyContent="center">
                              <KeyboardArrowUpIcon />
                            </Stack>
                            <DatePicker
                              format="DD/MM/YYYY"
                              label="Ahyrky Sene"
                              value={value}
                              onChange={(newValue) => setValue(newValue)}
                            />
                          </Stack>
                        </DemoContainer>
                      </LocalizationProvider>
                    </Stack>
                    <Typography
                      textAlign="center"
                      mt="10px"
                      p="5px"
                      fontWeight={600}
                      fontFamily="Montserrat"
                      fontSize={18}
                    >
                      Dörediji :
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      autoComplete="off"
                      sx={{
                        color: "#000",
                        ml: "40px",
                        width: {
                          lg: "280px",
                          md: "100%",
                          sm: "100%",
                          xs: "75%",
                        },
                      }}
                      onChange={(e) => setFromSearch(e.target.value)}
                      value={fromSearch}
                      placeholder="Dörediji boýunça gözle"
                      InputProps={{
                        sx: {
                          height: "45px",
                          color: "#000",
                          fontWeight: "600",

                          padding: "none",
                        },
                      }}
                    />
                    <Typography
                      textAlign="center"
                      p="5px"
                      fontWeight={600}
                      fontFamily="Montserrat"
                      fontSize={18}
                    >
                      Kategoriýa :
                    </Typography>
                    <FormControl
                      variant="outlined"
                      sx={{
                        m: 1,
                        display: "flex",
                        alignItems: "center",
                        width: "260px",
                        ml: "40px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Kategoriýasy
                      </InputLabel>
                      <Select
                        // labelId="demo-simple-select-standard-label"
                        // id="demo-simple-select-standard"
                        value={age}
                        // disableUnderline
                        sx={{ width: "260px" }}
                        onChange={handleChangeAge}
                        label="Category"
                      >
                        <MenuItem
                          onClick={() => filterByCat("Arza")}
                          value="Arza"
                        >
                          Arza
                        </MenuItem>
                        <MenuItem
                          onClick={() => filterByCat("Şertnama")}
                          value="Şertnama"
                        >
                          Şertnama
                        </MenuItem>
                        <MenuItem
                          onClick={() => filterByCat("Arenda")}
                          value="Arenda"
                        >
                          Arenda
                        </MenuItem>
                        <MenuItem
                          onClick={() => filterByCat("Faktura")}
                          value="Faktura"
                        >
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
                    <Typography
                      textAlign="center"
                      p="5px"
                      fontWeight={600}
                      fontFamily="Montserrat"
                      fontSize={18}
                    >
                      Statusy:
                    </Typography>
                    <FormControl
                      variant="outlined"
                      sx={{ pb: "15px", minWidth: 260, ml: "40px" }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Statusy
                      </InputLabel>
                      <Select
                        value={status}
                        onChange={handleChangeStatus}
                        label="Status"
                        sx={{ width: "260px" }}
                      >
                        <MenuItem
                          value="Hemmesi"
                          onClick={() => setDocument(dbDoc)}
                        >
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
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-around"
            // m="0 90px 0 20px"
          >
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              fontWeight={600}
              textAlign="center"
            >
              Dokument
            </Typography>
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              fontWeight={600}
              textAlign="center"
              ml={-2.5}
            >
              Ady
            </Typography>
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              fontWeight={600}
              ml={-2}
              textAlign="center"
            >
              Görnüşi
            </Typography>
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              fontWeight={600}
              ml={1}
              textAlign="center"
            >
              Dörediji
            </Typography>
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              fontWeight={600}
              textAlign="center"
            >
              Ýagdaýy
            </Typography>
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              fontWeight={600}
              textAlign="center"
            >
              Senesi
            </Typography>
          </Stack>
          <Divider />

          <Stack>
            {document.length <= 0 ? (
              <Typography
                fontFamily="Montserrat"
                textAlign="center"
                fontSize={18}
                pt="50px"
              >
                Document not Found
              </Typography>
            ) : (
              document
                .filter((elem) => {
                  if (titleSearch === "" && fromSearch === "") {
                    return elem;
                  } else if (
                    elem.title
                      .toLowerCase()
                      .includes(titleSearch.toLowerCase()) &&
                    elem.sender.toLowerCase().includes(fromSearch.toLowerCase())
                  ) {
                    return elem;
                  }
                })
                .map((item, index) => (
                  <Stack
                    key={item.id}
                    onClick={() => {
                      localStorage.setItem("document", JSON.stringify([item]));
                    }}
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      // justifyContent: "space-between",
                      // display: "flex",
                    }}
                    className="document"
                  >
                    {/* <Stack spacing={3} direction="row" alignItems="center"> */}
                    <NavLink
                      to={`/document/${item.title}/${item.id}`}
                      style={{
                        color: "#000",
                        // gap: "20px",
                        textDecoration: "none",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        // margin: "0 0 0 50px",
                      }}
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        maxWidth="100px"
                        minWidth="100px"
                        height={45}
                      >
                        <Stack
                          border="1px solid blue"
                          justifyContent="center"
                          width="40%"
                          textAlign="center"
                          height="80%"
                          alignItems="center"
                          borderRadius="100%"
                          backgroundColor="blue"
                          color="#fff"
                          fontWeight={600}
                          fontSize={22}
                        >
                          {index + 1}
                        </Stack>
                      </Stack>
                      <Typography
                        fontFamily="Montserrat"
                        textAlign="center"
                        maxWidth="100px"
                        minWidth="100px"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        fontFamily="Montserrat"
                        textAlign="center"
                        maxWidth="100px"
                        minWidth="100px"
                      >
                        {item.typeDoc}
                      </Typography>
                      <Typography
                        fontFamily="Montserrat"
                        textAlign="center"
                        ml={2}
                        maxWidth="100px"
                        minWidth="100px"
                      >
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
                        <Typography
                          maxWidth="100px"
                          minWidth="100px"
                          fontFamily="Montserrat"
                          textAlign="center"
                        >
                          {item.status}
                        </Typography>
                      </Stack>
                      <Typography
                        maxWidth="100px"
                        minWidth="100px"
                        fontFamily="Montserrat"
                        textAlign="start"
                      >
                        {item.send_date}
                      </Typography>
                    </NavLink>

                    {/* <Button onClick={() => handleOpen(item.id)}>Open</Button> */}
                    {/* </Stack> */}
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
                          style={{
                            border: "none",
                            width: "100%",
                            height: "85vh",
                          }}
                        ></iframe>
                      </Stack>
                    )}

                    <Divider />
                  </Stack>
                ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ArchiveDocuments;
