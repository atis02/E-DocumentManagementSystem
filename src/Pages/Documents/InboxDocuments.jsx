import React, { useEffect, useRef, useState } from "react";
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
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import {
  getDocument,
  postReaded,
} from "../../Components/db/Redux/api/UserGetDocumentSlice";
import moment from "moment";
import "moment/locale/de";
import { getDocumentById } from "../../Components/db/Redux/api/GetSingleDocumentSlice";
import { toast } from "react-toastify";

const InboxDocuments = ({ ...props }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userGetDoc.data);
  const statuS = useSelector((state) => state.userGetDoc.status);
  const error = useSelector((state) => state.userGetDoc.error);

  const [open, setOpen] = useState(null);
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
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
    const sortedData = data.map(
      (item) =>
        item.document &&
        item.document.sort((a, b) => {
          if (isAscending) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        })
    );
    setIsAscending(!isAscending);
    return setDocument(sortedData);
  };

  useEffect(() => {
    dispatch(getDocument());
  }, [dispatch]);

  const handleReaded = (documentId, id, recipientId) => {
    const body = {
      recipientId: recipientId,
      documentId: documentId,
      id: id,
    };

    dispatch(postReaded(body));
  };
  const hasTrueStatus = data.filter(
    (item) =>
      item.document &&
      item.document.sharedDocuments.every((item) => item.status !== true)
  );
  const filteredArray = data.filter((item) =>
    item.document.sharedDocuments.every((subItem) => subItem.status === false)
  );

  return (
    <Box
      height="100vh"
      overflow="scroll"
      backgroundColor="#f2f9fc"
      width="100%"
    >
      <Stack p="0px 10px">
        <Typography
          fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          p="10px"
        >
          Gelen Resminamalar
        </Typography>
        <Stack
          backgroundColor="#fff"
          spacing={1}
          minHeight="80vh"
          borderRadius="20px"
          // m="0px 10px"
          // pb="10px"
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
                  {/* <SortByAlphaIcon
                sx={{ width: "30px", height: "30px", color: "blue" }}
                /> */}
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
              mr={-5}
            >
              Ýagdaýy(Kimde)
            </Typography>
            <Typography
              fontFamily="Montserrat"
              minWidth="100px"
              mr={-1}
              fontWeight={600}
              textAlign="center"
            >
              Möhleti(çenli)
            </Typography>
          </Stack>
          <Divider />
          {statuS === "loading..." ? (
            <Stack
              direction="column"
              height="100%"
              alignItems="center"
              sx={{ gap: "10px", mt: "20px" }}
            >
              <img
                src="/images/spinner.svg"
                style={{ width: 60, height: 60 }}
                alt="loader"
              />
              Loading...
            </Stack>
          ) : statuS === "failed" ? (
            <Typography fontSize="30px" textAlign="center" fontWeight="600">
              {error}
              {toast.error(error)}
            </Typography>
          ) : statuS === "succeeded" ? (
            <Stack>
              {data.length == 0 ? (
                <Typography
                  fontFamily="Montserrat"
                  textAlign="center"
                  fontSize={18}
                  pt="50px"
                >
                  Resminama ýok
                </Typography>
              ) : (
                data
                  .filter((elem) => {
                    if (titleSearch === "" && fromSearch === "") {
                      return elem;
                    } else if (
                      elem.document.name
                        .toLowerCase()
                        .includes(titleSearch.toLowerCase()) &&
                      elem.document.sender.firstname
                        .toLowerCase()
                        .includes(fromSearch.toLowerCase())
                    ) {
                      return elem;
                    }
                  })
                  .map((item, index) => (
                    <Stack
                      key={item.document.id}
                      onClick={() => {
                        localStorage.setItem(
                          "document",
                          JSON.stringify([item])
                        );
                      }}
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                      }}
                      className="document"
                    >
                      <NavLink
                        to={`/document/inbox/${item.document.id}`}
                        onClick={() => {
                          // JSON.stringify(
                          //   localStorage.setItem("docId", item.document.id)
                          // ),
                          handleReaded(
                            item.documentId,
                            item.id,
                            item.recipientId
                          );
                        }}
                        style={{
                          color: "#000",
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          maxWidth="100px"
                          minWidth="100px"
                          height={45}
                          spacing={1}
                        >
                          {item.readed === false ? (
                            <Stack
                              width={10}
                              height={10}
                              borderRadius="100%"
                              backgroundColor="blue"
                            ></Stack>
                          ) : (
                            ""
                          )}
                          <Typography>{index + 1}</Typography>

                          <Stack
                            justifyContent="center"
                            width="40%"
                            textAlign="center"
                            height="80%"
                            alignItems="center"
                            fontWeight={600}
                            fontSize={22}
                          >
                            {item.document.path.substring(
                              item.document.path.lastIndexOf(".") + 1
                            ) == "docx" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FFF"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                viewBox="0 0 96 96"
                                width="48"
                                height="48"
                              >
                                <path
                                  stroke="#979593"
                                  d="M67.1716 7H27c-1.1046 0-2 .8954-2 2v78c0 1.1046.8954 2 2 2h58c1.1046 0 2-.8954 2-2V26.8284c0-.5304-.2107-1.0391-.5858-1.4142L68.5858 7.5858C68.2107 7.2107 67.702 7 67.1716 7z"
                                />
                                <path
                                  fill="none"
                                  stroke="#979593"
                                  d="M67 7v18c0 1.1046.8954 2 2 2h18"
                                />
                                <path
                                  fill="#C8C6C4"
                                  d="M79 61H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0-6H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0-6H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0-6H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0 24H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1z"
                                />
                                <path
                                  fill="#185ABD"
                                  d="M12 74h32c2.2091 0 4-1.7909 4-4V38c0-2.2091-1.7909-4-4-4H12c-2.2091 0-4 1.7909-4 4v32c0 2.2091 1.7909 4 4 4z"
                                />
                                <path d="M21.6245 60.6455c.0661.522.109.9769.1296 1.3657h.0762c.0306-.3685.0889-.8129.1751-1.3349.0862-.5211.1703-.961.2517-1.319L25.7911 44h4.5702l3.6562 15.1272c.183.7468.3353 1.6973.457 2.8532h.0608c.0508-.7979.1777-1.7184.3809-2.7615L37.8413 44H42l-5.1183 22h-4.86l-3.4885-14.5744c-.1016-.4197-.2158-.9663-.3428-1.6417-.127-.6745-.2057-1.1656-.236-1.4724h-.0608c-.0407.358-.1195.8896-.2364 1.595-.1169.7062-.211 1.2273-.2819 1.565L24.1 66h-4.9357L14 44h4.2349l3.1843 15.3882c.0709.3165.1392.7362.2053 1.2573z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 96 96"
                                fill="#FFF"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                width="48"
                                height="48"
                              >
                                <path
                                  stroke="#979593"
                                  d="M67.1716,7H27c-1.1046,0-2,0.8954-2,2v78 c0,1.1046,0.8954,2,2,2h58c1.1046,0,2-0.8954,2-2V26.8284c0-0.5304-0.2107-1.0391-0.5858-1.4142L68.5858,7.5858 C68.2107,7.2107,67.702,7,67.1716,7z"
                                />
                                <path
                                  fill="none"
                                  stroke="#979593"
                                  d="M67,7v18c0,1.1046,0.8954,2,2,2h18"
                                />
                                <path
                                  fill="#C8C6C4"
                                  d="M51 61H41v-2h10c.5523 0 1 .4477 1 1l0 0C52 60.5523 51.5523 61 51 61zM51 55H41v-2h10c.5523 0 1 .4477 1 1l0 0C52 54.5523 51.5523 55 51 55zM51 49H41v-2h10c.5523 0 1 .4477 1 1l0 0C52 48.5523 51.5523 49 51 49zM51 43H41v-2h10c.5523 0 1 .4477 1 1l0 0C52 42.5523 51.5523 43 51 43zM51 67H41v-2h10c.5523 0 1 .4477 1 1l0 0C52 66.5523 51.5523 67 51 67zM79 61H69c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C80 60.5523 79.5523 61 79 61zM79 67H69c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C80 66.5523 79.5523 67 79 67zM79 55H69c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C80 54.5523 79.5523 55 79 55zM79 49H69c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C80 48.5523 79.5523 49 79 49zM79 43H69c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C80 42.5523 79.5523 43 79 43zM65 61H55c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C66 60.5523 65.5523 61 65 61zM65 67H55c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C66 66.5523 65.5523 67 65 67zM65 55H55c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C66 54.5523 65.5523 55 65 55zM65 49H55c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C66 48.5523 65.5523 49 65 49zM65 43H55c-.5523 0-1-.4477-1-1l0 0c0-.5523.4477-1 1-1h10c.5523 0 1 .4477 1 1l0 0C66 42.5523 65.5523 43 65 43z"
                                />
                                <path
                                  fill="#107C41"
                                  d="M12,74h32c2.2091,0,4-1.7909,4-4V38c0-2.2091-1.7909-4-4-4H12c-2.2091,0-4,1.7909-4,4v32 C8,72.2091,9.7909,74,12,74z"
                                />
                                <path d="M16.9492,66l7.8848-12.0337L17.6123,42h5.8115l3.9424,7.6486c0.3623,0.7252,0.6113,1.2668,0.7471,1.6236 h0.0508c0.2617-0.58,0.5332-1.1436,0.8164-1.69L33.1943,42h5.335l-7.4082,11.9L38.7168,66H33.041l-4.5537-8.4017 c-0.1924-0.3116-0.374-0.6858-0.5439-1.1215H27.876c-0.0791,0.2684-0.2549,0.631-0.5264,1.0878L22.6592,66H16.9492z" />
                              </svg>
                            )}
                          </Stack>
                        </Stack>
                        <Typography
                          fontFamily="Montserrat"
                          textAlign="center"
                          maxWidth="100px"
                          minWidth="100px"
                        >
                          {item.document.name}
                        </Typography>
                        <Typography
                          fontFamily="Montserrat"
                          textAlign="center"
                          maxWidth="100px"
                          minWidth="100px"
                        >
                          {item.document.docType && item.document.docType.name}
                        </Typography>
                        <Typography
                          fontFamily="Montserrat"
                          textAlign="center"
                          ml={2}
                          minWidth="150px"
                        >
                          {item.document.sender.firstname}{" "}
                          {item.document.sender.surname}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                          <Stack
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "100px",
                              ...(item.document.statusType === "ACTIVE"
                                ? { backgroundColor: "red" }
                                : { backgroundColor: "green" }),
                            }}
                          ></Stack>
                          <Typography
                            maxWidth="100px"
                            minWidth="100px"
                            fontFamily="Montserrat"
                            textAlign="center"
                          >
                            {item.document.statusType}
                            {item.document.sharedDocuments.map((elem) =>
                              elem.status == true
                                ? `(${elem.recipient.firstname})`
                                : ""
                            )}
                          </Typography>
                        </Stack>
                        <Typography
                          maxWidth="100px"
                          minWidth="100px"
                          fontFamily="Montserrat"
                          textAlign="start"
                          color={
                            item.document.endTime <=
                            moment().add(1, "days").format("YYYY-MM-DD")
                              ? "tomato"
                              : "#000"
                          }
                        >
                          {item.document.endTime < moment().format("YYYY-MM-DD")
                            ? "Tamamlanan"
                            : moment(item.document.endTime).format(
                                "DD-MM-YYYY"
                              )}
                        </Typography>
                      </NavLink>

                      <Divider />
                    </Stack>
                  ))
              )}
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
export default InboxDocuments;
