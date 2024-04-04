import React, { useRef, useState } from "react";
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
  createFilterOptions,
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
import { dbDoc } from "../../Components/db/dbDocuments.mjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { users } from "../../Components/db/dbUsers.mjs";

export default function NewDocument() {
  const [type, setType] = useState("");
  const [files, setFiles] = useState([]);
  const [open2, setOpen2] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [value2, setValue2] = useState(dayjs());
  const [formData, setFormData] = useState();

  const textFieldRef = useRef("");
  const textFieldRef2 = useRef("");
  const textFieldRef3 = useRef();
  const newTextFieldRef = useRef(null);
  const descTextFieldRef = useRef(null);
  const handleOpen = (id) => {
    setOpen2(id === open2 ? null : id);
  };
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
    files.length > 0 ? toast.success("Document succesfully uploaded!") : "";
  };
  const admin = JSON.parse(localStorage.getItem("token") || "[]");

  const handleDelete = (id) => {
    const updatedFiles = files.filter((x) => x.id != id);
    setFiles(updatedFiles);
  };
  // steps func is start
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState("");
  const [valuesDesc, setValuesDesc] = useState();
  const [stepUser, setStepUser] = useState([
    {
      id: admin.user.id,
      values: [admin.user.fullName],
      valuesDesc,
      subStepper: [],
    },
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [time, setTime] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [steps, setSteps] = useState();
  const [addStep, setAddStep] = useState(null);
  //sub step func started
  const [subStepUser, setSubStepUser] = useState([]);
  const [subAddStep, setSubAddStep] = useState(null);
  const [subValues, setSubValues] = useState();
  const [subValuesDesc, setSubValuesDesc] = useState();
  const [subActiveStep, setSubActiveStep] = useState(0);

  const handleSubChange = (e) => {
    setSubValues(e.target.value);
  };
  const handleSubChangeDesc = (e) => {
    setSubValuesDesc(e.target.value);
  };

  const handleSubNext = (id) => {
    setSubActiveStep((prev) => prev + 1);
  };
  const handleSubBack = (index) => {
    console.log(index);
    setSubActiveStep((index) => (index === index ? index - 1 : ""));
  };

  const handleSubAddStep = (e) => {
    e.preventDefault();

    setSubStepUser(
      subValues === ""
        ? ""
        : stepUser.map((item, index) =>
            activeStep === index
              ? item.subStepper.push({
                  id: Math.floor(Math.random() * 1000),
                  subValues,
                  subValuesDesc,
                })
              : ""
          )
    );

    setSubValues("");
    setSubAddStep(null);
  };

  //sub step func end

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
    setValues(newValues);
  };
  const handleChangeDesc = (e) => {
    setValuesDesc(e.target.value);
  };
  const handleAddStep = (e) => {
    e.preventDefault();
    values !== ""
      ? setStepUser([
          ...stepUser,
          {
            id: Math.floor(Math.random() * 1000),
            values,
            valuesDesc,
            subStepper: [],
          },
        ])
      : "";
    setValues("");
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

  const handleDelete2 = (id) => {
    const updatedStep =
      id !== admin.id ? stepUser.filter((x) => x.id !== id) : stepUser;
    setStepUser(updatedStep);
  };
  const handleSubmit = (e) => {
    type === "" ||
    newTextFieldRef.current.value === "" ||
    textFieldRef.current.value > textFieldRef2.current.value
      ? toast.error("Invalid data")
      : dbDoc.push({
          ...formData,
          id: Math.floor(Math.random() * 1000),
          send_date: textFieldRef.current.value,
          limit_date: textFieldRef2.current.value,
          title: newTextFieldRef.current.value,
          typeDoc: textFieldRef3.current.value,
          statusType: "3",
          sender: "Admin",
          file_link: files,
          file_type: files.map((x) => x.type),
          description: descTextFieldRef.current.value,
          steps: stepUser,
          status: "Barlagda",
        }) &&
        toast.success("Document succesfully registered!") &&
        setFormData("");
  };

  return (
    <Box width="100%">
      <Toaster />
      <Typography p="20px" fontSize="30px" fontWeight="600">
        Täze Resminama
      </Typography>
      <Stack p="20px" direction="row" spacing={7}>
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
              inputRef={newTextFieldRef}
              fullWidth
              id="outlined-basic"
              label="Resminamanyň ady"
              // error={
              //   newTextFieldRef.current && newTextFieldRef.current.value === ""
              // }
              name="title"
              autoComplete="off"
              variant="outlined"
              // onChange={handleFormChange}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography width="30%" textAlign="end">
              Resminamanyň görnüşi
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Resminamanyň görnüşi
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                // error={
                //   textFieldRef3.current && textFieldRef3.current.value === ""
                // }
                label="Resminamanyň görnüşi"
                onChange={(e) => setType(e.target.value)}
                inputRef={textFieldRef3}
                name="select"
              >
                <MenuItem value="Arza">Arza</MenuItem>
                <MenuItem value="Şertnama">Şertnama</MenuItem>
                <MenuItem value="Arenda">Arenda</MenuItem>
                <MenuItem value="Faktura">Faktura</MenuItem>
                <MenuItem value="Bildiris">Bildiris</MenuItem>
                <MenuItem value="Ise almak">Ise almak</MenuItem>
              </Select>
            </FormControl>
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
                    inputRef={textFieldRef}
                    format="DD/MM/YYYY"
                    value={value}
                    sx={{
                      width: "100%",
                      ...(textFieldRef.current.value >
                      textFieldRef2.current.value
                        ? {
                            border: "1px solid red",
                            borderRadius: "5px",
                          }
                        : ""),
                    }}
                    slotProps={{
                      textField: {
                        helperText:
                          textFieldRef.current.value >
                          textFieldRef2.current.value
                            ? "Send data can`t be large than due data!"
                            : "",
                      },
                    }}
                  />
                  <Typography width="30%" textAlign="center">
                    Seretmeli möhleti
                  </Typography>
                  <DatePicker
                    inputRef={textFieldRef2}
                    format="DD/MM/YYYY"
                    sx={{
                      width: "100%",
                      ...(textFieldRef2.current.value <
                      textFieldRef.current.value
                        ? {
                            border: "1px solid red",
                            borderRadius: "5px",
                          }
                        : ""),
                    }}
                    value={value2}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography width="30%" textAlign="end">
              Kimden
            </Typography>
            <Typography width="100%" textAlign="start">
              A. Ikramow
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
              inputRef={descTextFieldRef}
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
            <Box sx={{ maxWidth: 600, mt: "30px" }}>
              <Toaster />
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                // sx={{ gap: "20px" }}
              >
                {stepUser.map((step, index) => (
                  <Step
                    sx={{
                      ...(activeStep === index
                        ? { background: "lightgray" }
                        : ""),
                    }}
                    key={step.id}
                  >
                    <StepLabel>
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
                          <Typography>Bellikler: {step.valuesDesc}</Typography>
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
                        disabled={admin.user.id === step.id}
                        sx={{
                          gap: "5px",
                        }}
                        onClick={() => handleDelete2(step.id)}
                      >
                        {step.values}
                        <DeleteIcon />
                      </Button>
                    </Stack>

                    <StepContent>
                      {/* sub Stepper is start here */}
                      <Box ml={5} mb={2}>
                        <Stepper
                          activeStep={subActiveStep}
                          orientation="vertical"
                          sx={{ m: "20px" }}
                        >
                          {step.subStepper.map((subStep, subIndex) => (
                            <Step
                              key={subStep.id}
                              sx={{
                                ...(subActiveStep === subIndex
                                  ? { background: "gray" }
                                  : ""),
                              }}
                            >
                              <StepLabel>
                                <Typography fontSize="20px" fontWeight={600}>
                                  {subStep.subValues}
                                </Typography>
                              </StepLabel>
                              <StepContent>
                                <Box sx={{ mb: 2 }}>
                                  <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={() => handleSubNext(subStep.id)}
                                    // disabled={
                                    // subStepUser.length === 1
                                    // index === subStepUser.length - 1
                                    // }
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Ugratmak
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    disabled={subIndex === 0}
                                    onClick={() => handleSubBack(subIndex)}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Ret etmek
                                  </Button>
                                </Box>
                              </StepContent>
                            </Step>
                          ))}
                        </Stepper>

                        <Stack direction="row" mt="10px">
                          <Button
                            variant="outlined"
                            onClick={() => setSubAddStep(!subAddStep)}
                          >
                            <GroupAddIcon sx={{ mr: "10px" }} />
                            Goşmaça yzygiderlik goş
                          </Button>
                        </Stack>

                        {subAddStep ? (
                          <form
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              marginTop: "30px",
                            }}
                            onSubmit={handleSubAddStep}
                          >
                            <TextField
                              fullWidth
                              name="user_name"
                              onChange={handleSubChange}
                              id="outlined-basic"
                              autoComplete="off"
                              label="Id"
                              error={subValues === ""}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              name="description"
                              onChange={handleSubChangeDesc}
                              autoComplete="off"
                              id="outlined-basic"
                              label="Description"
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
                      </Box>
                      {/* sub Stepper is end here */}

                      <Modal
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
                            index === stepUser.length - 1 ||
                            (subStepUser.length != 0 &&
                              subActiveStep != subStepUser[0])
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
                      </Box>
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
                      multiple={true}
                      disableClearable
                      id="combo-box-demo"
                      options={users.map((elem) => elem.fullName)}
                      filterSelectedOptions
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
            <Dropzone
              onChange={updateFiles}
              style={{
                ...(files.length > 0 ? { height: "240px", width: "100%" } : ""),
              }}
              value={files}
            >
              {files.length > 0 ? `${files.length} sany faýl geçirildi ` : ""}
            </Dropzone>
            <div
              style={{
                ...(files.length > 0
                  ? { display: "flex" }
                  : { flexDirection: "column" }),
              }}
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
            {files.length > 0 ? "Faýly görmek  üçin basyň!" : ""}
          </Typography>
          <Stack spacing={5}>
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
