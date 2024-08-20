import React, { useEffect, useRef, useState } from "react";
import {
  MenuItem,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Typography,
  TextField,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  StepContent,
  Modal,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Dropzone, FileMosaic } from "@files-ui/react";
import toast, { Toaster } from "react-hot-toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { createDocument } from "../../Components/db/Redux/api/PostDocumentSlice";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  createDocTypes,
  getDocTypes,
} from "../../Components/db/Redux/api/DocTypeSlice";

function NewDocument() {
  const [files, setFiles] = useState();
  const [users, setUsers] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [plusDoctype, setPlusDoctype] = useState("");
  const dispatch = useDispatch();

  const sendDateRef = useRef("");
  const limitDate = useRef("");

  const [titleDoc, setTitleDoc] = useState({
    title: "",
    typeDoc: "",
    description: "",
  });

  const handleFormChange = (e) => {
    setTitleDoc({
      ...titleDoc,
      [e.target.name]: e.target.value,
    });
  };

  const updateFiles = (e) => {
    setFiles(e.target.files[0]);
    // files.length > 0 ? toast.success("Document succesfully uploaded!") : "";
  };
  useEffect(() => {
    const Users = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await AxiosInstance.get("/user/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    };
    Users();
  }, []);
  const data = useSelector((state) => state.getDocTypes.data);
  const status = useSelector((state) => state.getDocTypes.status);
  const error = useSelector((state) => state.getDocTypes.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getDocTypes());
    }
  }, [status, dispatch]);

  const admin = JSON.parse(localStorage.getItem("user"));

  const handleDelete = (id) => {
    const updatedFiles = files.filter((x) => x.id != id);
    setFiles(updatedFiles);
  };
  // steps func is start
  const [open, setOpen] = useState(false);
  const [openDoctype, setOpenDoctype] = useState(false);
  const [values, setValues] = useState("");
  const [valuesDesc, setValuesDesc] = useState("");
  const [stepUser, setStepUser] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [time, setTime] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [addStep, setAddStep] = useState(null);
  const [deleteId, setDeleteId] = useState();
  //sub step func started
  const filteredLoggedUsers = users.filter((item) => item.id !== admin.id);

  const handleClose = () => setModalOpen(false);

  const handleNext = (index) => {
    setModalOpen(true);
    setTime(index === time ? null : index);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    toast.success("Document was send BACK!");
  };

  const handleChangeStep = (e, newValues) => {
    setValues(newValues.login);
    setUserId(newValues.id);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== newValues.id));
  };
  const handleChangeDesc = (e) => {
    setValuesDesc(e.target.value);
  };

  const handleAddStep = (e) => {
    const lastElement = stepUser.length > 0 && stepUser[stepUser.length - 1];
    e.preventDefault();
    values == lastElement.values
      ? toast.error("Ozunden ozune ugradyp bolanok!")
      : values !== ""
      ? stepUser.push({
          id: userId,
          values: values,
          status: false,
        })
      : "";
    setValues("");
    setValuesDesc("");
    setOpen(false);
    setAddStep(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 4,
    p: 1,
  };
  const clear = () => {
    (sendDateRef.current.value = ""),
      (limitDate.current.value = ""),
      setTitleDoc({
        title: "",
        typeDoc: "",
        description: "",
      });
    setStepUser([]), setFiles();
  };
  const handleDelete2 = (id) => {
    const updatedStep = stepUser.filter((item) => item.id !== id);

    setStepUser(updatedStep);
  };

  const handleSubmit = (e) => {
    if (titleDoc.title.trim().length <= 0) {
      toast.error("Resminamanyň adyny doly giriziň!");
    } else if (titleDoc.typeDoc.trim().length <= 0) {
      toast.error("Resminamanyň görnüşini saýlaň!");
    } else if (
      limitDate.current.value == "YYYY-MM-DD" ||
      sendDateRef.current.value == "YYYY-MM-DD"
    ) {
      toast.error("Sene ýalňyş");
    } else if (stepUser.length <= 0) {
      toast.error("Ugratmaly adamlary saýlaň");
    } else if (sendDateRef.current.value > limitDate.current.value) {
      toast.error("Ugratmaly sene Seretmeli möhletden uly bolup bilmeýär!");
    } else if (files === undefined) {
      toast.error("Resminamany saylan!");
    } else {
      const body = new FormData();

      stepUser[0].status = true;
      body.append(
        "doc",
        JSON.stringify({
          docInfo: {
            name: titleDoc.title,
            type: titleDoc.typeDoc,
            description: titleDoc.description,
            statusType: "ACTIVE",
            startTime: sendDateRef.current.value,
            endTime: limitDate.current.value,
          },
          user: {
            id: admin.id,
          },
          recivers: stepUser,
        })
      );
      body.append("file", files);
      dispatch(createDocument(body));
      clear();
    }
  };
  console.log(data);

  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileInfo(
        `File name: ${selectedFile.name}, File size: ${
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
  const handleSubmitDocType = () => {
    const body = {
      documentType: plusDoctype,
    };
    dispatch(createDocTypes(body));
    setPlusDoctype("");
    setOpenDoctype(false);
  };
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="scroll"
    >
      <Toaster />
      <Typography p="10px" fontSize="30px" fontWeight="600">
        Täze Resminama
      </Typography>
      <Stack
        p="20px"
        backgroundColor="#fff"
        minHeight="80vh"
        borderRadius="20px"
        m="0px 20px"
        boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
        direction="row"
        spacing={7}
      >
        <Stack mt="30px" width="55%" spacing={2}>
          <Stack>
            <Typography fontSize="24px" color="gray" fontWeight="600">
              Esasy Maglumatlar
            </Typography>
            <Divider />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography width="30%" textAlign="end">
              Resminamanyň ady
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Resminamanyň ady"
              name="title"
              value={titleDoc.title}
              autoComplete="off"
              variant="outlined"
              onChange={handleFormChange}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography minWidth="22.5%" textAlign="end">
              Resminamanyň görnüşi
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Resminamanyň görnüşi
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={titleDoc.typeDoc}
                label="Resminamanyň görnüşi"
                onChange={handleFormChange}
                name="typeDoc"
              >
                {status === "loading..." ? (
                  <Stack
                    direction="column"
                    height="100%"
                    alignItems="center"
                    sx={{ gap: "10px", mt: "20px" }}
                  >
                    <CircularProgress />
                    Loading...
                  </Stack>
                ) : status === "failed" ? (
                  toast.error(error)
                ) : status === "succeeded" ? (
                  data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  ""
                )}
              </Select>
            </FormControl>
            <IconButton
              variant="outlined"
              onClick={() => setOpenDoctype(!openDoctype)}
            >
              {openDoctype ? <CloseIcon /> : <AddIcon />}
            </IconButton>
            {openDoctype && (
              <Stack direction="row" alignItems="center">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Resminamanyň görnüşini goş"
                  name="title"
                  sx={{ width: "150px" }}
                  value={plusDoctype}
                  autoComplete="off"
                  variant="outlined"
                  onChange={(e) => setPlusDoctype(e.target.value)}
                />
                <Button variant="outlined" onClick={handleSubmitDocType}>
                  Goşmak
                </Button>
              </Stack>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" width="100%" spacing={2}>
            <Typography width="30%" textAlign="end">
              Ugratmaly Sene
            </Typography>
            <Stack width="100%">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <DatePicker
                    inputRef={sendDateRef}
                    format="YYYY-MM-DD"
                    value={sendDateRef.current.value}
                    // defaultValue={new Date()}
                    sx={{
                      width: "100%",
                      ...(sendDateRef.current.value > limitDate.current.value
                        ? {
                            border: "1px solid red",
                            borderRadius: "5px",
                          }
                        : ""),
                    }}
                    slotProps={{
                      textField: {
                        helperText:
                          sendDateRef.current.value > limitDate.current.value
                            ? "Seretmeli möhletden öňde bolup bilmeýär!"
                            : "",
                      },
                    }}
                  />
                  <Typography width="30%" textAlign="center">
                    Seretmeli möhleti
                  </Typography>
                  <DatePicker
                    // defaultValue={new Date()}
                    inputRef={limitDate}
                    format="YYYY-MM-DD"
                    sx={{
                      width: "100%",
                      ...(limitDate.current.value < sendDateRef.current.value
                        ? {
                            border: "1px solid red",
                            borderRadius: "5px",
                          }
                        : ""),
                    }}
                    value={limitDate.current.value}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography width="30%" textAlign="end">
              Kimden:
            </Typography>
            <Typography width="100%" textAlign="start">
              {admin.login}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}></Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography width="30%" textAlign="end">
              Bellik
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              rows={4}
              value={titleDoc.description}
              onChange={handleFormChange}
              name="description"
              multiline
              label="(Hokman däl)"
              variant="outlined"
            />
          </Stack>
          <Stack>
            <Typography fontSize="24px" color="gray" fontWeight="600">
              Goşmaça Maglumatlar
            </Typography>
            <Divider />
            <Box
              sx={{
                maxWidth: 600,
                mt: "30px",
              }}
            >
              <Toaster />
              <Typography fontSize={20} mb={2}>
                Ugradyjy : {admin.login}
              </Typography>

              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                // sx={{ gap: "20px" }}
              >
                {stepUser.length !== 0 &&
                  stepUser.map((step, index) => (
                    <Step
                      // sx={{
                      //   ...(activeStep === index
                      //     ? { background: "lightgray" }
                      //     : ""),
                      // }}
                      key={step.id + index}
                    >
                      <StepLabel className="step">
                        <Typography fontSize="20px" fontWeight={600}>
                          {step.values}
                        </Typography>
                      </StepLabel>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        mt="10px"
                        p="0 10px"
                        spacing={2}
                      >
                        <Accordion sx={{ width: "80%" }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              border: "1px solid lightgray",
                            }}
                          >
                            <Typography>Details</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Bellikler: {step.valuesDesc}
                            </Typography>
                            {time ? (
                              <Stack spacing={2} direction="row" color="gray">
                                <Typography>Send date:</Typography>
                                <Typography>
                                  {new Date().getDate()}.
                                  {new Date().getMonth() + 1}.
                                  {new Date().getFullYear()}
                                </Typography>
                                <Typography>
                                  {new Date().getHours()}:
                                  {new Date().getMinutes()}
                                </Typography>
                              </Stack>
                            ) : (
                              ""
                            )}
                          </AccordionDetails>
                        </Accordion>

                        <Button
                          variant="outlined"
                          color="error"
                          // disabled={admin.id === step.id}
                          sx={{
                            gap: "5px",
                          }}
                          onClick={() => {
                            handleDelete2(step.id);
                            setDeleteId(step);
                          }}
                        >
                          {step.values}

                          <DeleteIcon />
                        </Button>
                      </Stack>

                      <StepContent>
                        {/* <Modal
                          open={modalOpen}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          BackdropProps={{
                            style: {
                              backgroundColor: "#7F7F7F",
                              opacity: "0.6",
                            },
                          }}
                        >
                          <Box sx={style} height="130px">
                            <Typography textAlign="center" fontSize={22}>
                              Resminamany ugratmak isleýärsiňizmi?
                            </Typography>
                            <Stack
                              alignItems="center"
                              direction="row"
                              justifyContent="center"
                              height="100%"
                              spacing={6}
                            >
                              <Button
                                sx={{
                                  background: "green",
                                  color: "#fff",
                                  "&:hover": { background: "#000" },
                                }}
                                onClick={() =>
                                  setActiveStep(
                                    (prevActiveStep) => prevActiveStep + 1,
                                    handleClose(),
                                    toast.success("Document successfully sent!")
                                  )
                                }
                              >
                                Tassykla
                              </Button>
                              <Button
                                sx={{
                                  background: "red",
                                  color: "#fff",
                                  "&:hover": { background: "#000" },
                                }}
                                onClick={handleClose}
                              >
                                Ret et
                              </Button>
                            </Stack>
                          </Box>
                        </Modal>
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => handleNext(index)}
                            disabled={
                              stepUser.length === 1 ||
                              index === stepUser.length - 1
                            }
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Ugratmak
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Yzyna
                          </Button>
                        </Box> */}
                      </StepContent>
                    </Step>
                  ))}
                {open ? (
                  <form
                    last="true"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "30px",
                    }}
                    onSubmit={handleAddStep}
                  >
                    <Autocomplete
                      // multiple={true}
                      disableClearable
                      id="combo-box-demo"
                      options={filteredLoggedUsers}
                      filterSelectedOptions
                      getOptionLabel={(option) => option.login}
                      onChange={handleChangeStep}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          name="user_name"
                          focused
                          id="outlined-basic"
                          autoComplete="off"
                          label="Wezipe , Bölüm , Işgär "
                          variant="outlined"
                        />
                      )}
                    />
                    <TextField
                      fullWidth
                      name="description"
                      value={valuesDesc}
                      onChange={handleChangeDesc}
                      autoComplete="off"
                      id="outlined-basic"
                      label="Bellik"
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: "blue",
                        color: "#fff",
                        "&:hover": { background: "black" },
                      }}
                    >
                      goşmak
                    </Button>
                  </form>
                ) : (
                  ""
                )}
                <Button
                  sx={{ mt: "20px", gap: "10px" }}
                  onClick={() => setOpen(!open)}
                  last="true"
                  variant="outlined"
                >
                  <GroupAddIcon />
                  Kime Ugratmaly
                </Button>
              </Stepper>
            </Box>
          </Stack>
          <Stack alignItems="start">
            <Button
              onClick={handleSubmit}
              sx={{
                ml: "230px",
                background: "#185ABD",
                color: "#fff",
                width: "150px",
                height: "50px",
                "&:hover": { background: "#000" },
              }}
            >
              Registrasiýa
            </Button>
          </Stack>
        </Stack>

        <Stack
          width="45%"
          sx={{
            height: "100%",
            pt: "50px",
          }}
        >
          <Stack direction="row" spacing={3}>
            <input type="file" onChange={(e) => setFiles(e.target.files[0])} />{" "}
            {/* <Dropzone
              onChange={updateFiles}
              style={{
                ...(files.length > 0 ? { height: "240px", width: "100%" } : ""),
              }}
              value={files}
            >
              files
              {files.length > 0 ? `${files.length} sany faýl geçirildi ` : ""}
            </Dropzone> */}
            {/* <Stack>
              <div class="file-input-wrapper">
                <input
                  type="file"
                  onChange={updateFiles}
                  id="file"
                  className="file-input"
                  style={{
                    ...(files.length > 0
                      ? { height: "240px", width: "100%" }
                      : ""),
                  }}
                />
                <label for="file" className="file-input-label"></label>
              </div>
              <div>{fileInfo.length == 0 ? "File Not selected" : fileInfo}</div>
            </Stack> */}
            <div
            // style={{
            //   ...(files.length > 0
            //     ? { display: "flex" }
            //     : { flexDirection: "column" }),
            // }}
            >
              <Link
                to="/docs/NewDocument.docx"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg"
                  style={{ width: "144px", height: "186px" }}
                  alt=""
                />
                <Typography textAlign="center" color="#000">
                  Täze Word Resminama
                </Typography>
              </Link>
              <Link
                to="/docs/test.xlsx"
                style={{
                  textDecoration: "none",
                }}
                target="_blank"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
                  style={{ width: "134px", height: "186px" }}
                  alt=""
                />
                <Typography textAlign="center" color="#000">
                  Täze Excel Resminama
                </Typography>
              </Link>
            </div>
          </Stack>
          <Typography fontSize={25} textAlign="center" mt="40px" mb="10px">
            {/* {files.length > 0 ? "Faýly görmek  üçin basyň!" : ""} */}
          </Typography>
          {/* <Stack spacing={5}>
            {files.map((file, index) => (
              <Stack
                key={file.id}
                sx={{
                  ...(open === file.id ? { background: "lightgray" } : ""),
                }}
                direction="column"
                justifyContent="center"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  spacing={4}
                  mb="20px"
                >
                  <Typography fontSize={25} textAlign="center">
                    {++index}
                  </Typography>
                  <FileMosaic
                    {...file}
                    onClick={() => handleOpen(file.id)}
                    preview
                  />
                  <CheckCircleIcon sx={{ color: "green" }} />
                  <IconButton onClick={() => handleDelete(file.id)}>
                    <DeleteIcon
                      sx={{ color: "red", width: "40px", height: "40px" }}
                    />
                  </IconButton>
                </Stack>
                <Divider />
                {open2 === file.id && (
                  <Stack
                    width="95%"
                    mt="20px"
                    direction="row"
                    alignItems="center"
                    p="15px"
                  >
                    {file.type == "image/jpeg" ? (
                      console.log("have")
                    ) : (
                      <iframe
                        src="/docs/Ikramow Atamyrat ylmy iş Täze.docx"
                        style={{
                          border: "none",
                          width: "100%",
                          height: "85vh",
                        }}
                      ></iframe>
                    )}
                  </Stack>
                )}
              </Stack>
            ))}
          </Stack> */}
        </Stack>
      </Stack>
    </Box>
  );
}
export default NewDocument;
