import React, { useEffect, useState } from "react";
import {
  MenuItem,
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
  Checkbox,
  Box,
  FormControlLabel,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Edit";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { createDocument } from "../../Components/db/Redux/api/PostDocumentSlice";

import moment from "moment";
import {
  createDocTypes,
  getDocTypes,
} from "../../Components/db/Redux/api/DocTypeSlice";
import { toast } from "react-toastify";

function NewDocument() {
  const [files, setFiles] = useState(null);
  const [users, setUsers] = useState([]);
  const [plusDoctype, setPlusDoctype] = useState("");
  const dispatch = useDispatch();
  const [sendDate, setSendDate] = useState(dayjs());
  const [limitDate, setLimitDate] = useState(dayjs());
  const [openModal, setOpenModal] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [permission, setPermission] = useState([]);
  const [depTitle, setDeptitle] = useState("");
  const [posTitle, setPostitle] = useState("");
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);

  const handleOpen = () => {
    setOpenModal(true), setSeconds(15);
  };
  const handleClose = () => {
    clear();
    setOpenModal(false);
  };
  const [titleDoc, setTitleDoc] = useState({
    title: "",
    typeDoc: "",
    description: "",
  });
  useEffect(() => {
    if (openModal && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [openModal, seconds]);

  const handleFormChange = (e) => {
    setTitleDoc({
      ...titleDoc,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (event) => {
    setDeptitle(event.target.value);
    setPostitle("");
  };
  const handleChangePosition = (event) => {
    setPostitle(event.target.value);
    setDeptitle("");
  };

  // Handle checkbox state changes
  const handleChangeCheckBoxes = (event, index, checkbox) => {
    const i = permission.findIndex((obj) => obj.key === checkbox.key);
    if (i !== -1) {
      const updatedPermissions = [
        ...permission.slice(0, i),
        { ...permission[i], value: !checkbox.value },
        ...permission.slice(i + 1),
      ];
      setPermission(updatedPermissions);
    }
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
  useEffect(() => {
    const department = async () => {
      await AxiosInstance.get("/department/get").then((res) => {
        setDepartment(res.data);
      });
    };
    const position = async () => {
      await AxiosInstance.get("/position/get").then((res) => {
        setPosition(res.data);
      });
    };

    const permissionData = async () => {
      await AxiosInstance.get("/docs/permissions").then((res) => {
        setPermission(res.data);
      });
    };
    permissionData();
    department();
    position();
  }, []);

  const admin = JSON.parse(localStorage.getItem("user"));

  const handleDelete = (elem) => {
    setFiles((prevFile) => prevFile.filter((file) => file !== elem));
  };
  // steps func is start
  const [open, setOpen] = useState(false);
  const [openRassylka, setOpenRassylka] = useState(false);
  const [rassylkaPeople, setRassylkaPeople] = useState([]);
  const [openDoctype, setOpenDoctype] = useState(false);
  const [values, setValues] = useState("");
  const [valuesDesc, setValuesDesc] = useState("");
  const [stepUser, setStepUser] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [time, setTime] = useState(false);
  const [userId, setUserId] = useState();
  const [addStep, setAddStep] = useState(null);
  const [deleteId, setDeleteId] = useState();
  const [permissionTitle, setPermissionTitle] = useState("");

  // const handleFileChange = (files) => {
  //   setFiles(Array.from(files));
  // };
  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);
  };

  const filteredLoggedUsers = users.filter((item) => item.id !== admin.id);

  const filteredUsers = filteredLoggedUsers.filter((item) => {
    if (item.departmentId == depTitle) {
      return item.departmentId;
    }
    if (item.positionId == posTitle) {
      return item.positionId;
    }
  });

  const handleChangeStep = (e, newValues) => {
    setValues(
      newValues.firstname +
        " " +
        newValues.surname +
        " " +
        `(${newValues.position.name})`
    );
    setUserId(newValues.id);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== newValues.id));
  };
  const handleChangeStepRassylka = (e, newValues) => {
    setRassylkaPeople(newValues);
  };
  const handleAddStepRassylka = () => {
    setOpenRassylka(false);
  };

  const handleChangeDesc = (e) => {
    setValuesDesc(e.target.value);
  };
  const handleChangePermission = (event) => {
    setPermissionTitle(event.target.value);
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
          permissions: permission,
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
    border: "1px solid transparent",
    borderRadius: "20px",
    boxShadow: 4,
    p: 3,
  };
  const clear = () => {
    setSendDate(dayjs()),
      setLimitDate(dayjs()),
      setTitleDoc({
        title: "",
        typeDoc: "",
        description: "",
      });
    setStepUser([]), setFiles(null);
    setRassylkaPeople([]);
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
    } else if (limitDate == "YYYY-MM-DD" || sendDate == "YYYY-MM-DD") {
      toast.error("Sene ýalňyş");
    } else if (rassylkaPeople.length === 0 && stepUser.length === 0) {
      toast.error("Ugratmaly adamlary saýlaň");
    } else if (sendDate > limitDate) {
      toast.error("Ugratmaly sene Seretmeli möhletden uly bolup bilmeýär!");
    } else if (files === null) {
      toast.error("Resminamany saylan!");
    } else {
      const body = new FormData();

      //stepUser[0].status = true;

      if (!rassylkaPeople.length) {
        stepUser[0].status = true;
      }

      body.append(
        "doc",
        JSON.stringify({
          docInfo: {
            name: titleDoc.title,
            type: titleDoc.typeDoc,
            description: titleDoc.description,
            statusType: "ACTIVE",
            startTime: sendDate,
            endTime: limitDate,
          },
          user: {
            id: admin.id,
          },
          recivers: stepUser.length == 0 ? rassylkaPeople : stepUser,
        })
      );
      body.append("file", files);
      dispatch(createDocument(body));
      handleOpen();

      setTimeout(() => {
        handleClose();
      }, 15000);
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={sendDate}
                    onChange={(newValue) => {
                      setSendDate(newValue);
                    }}
                    sx={{
                      width: "100%",
                      ...(sendDate > limitDate
                        ? {
                            border: "1px solid red",
                            borderRadius: "20px",
                          }
                        : ""),
                    }}
                    slotProps={{
                      textField: {
                        helperText:
                          sendDate > limitDate
                            ? "Seretmeli möhletden öňde bolup bilmeýär!"
                            : "",
                      },
                    }}
                  />
                  <Typography width="30%" textAlign="center">
                    Seretmeli möhleti
                  </Typography>
                  <DatePicker
                    value={limitDate}
                    onChange={(newValue) => {
                      setLimitDate(newValue);
                    }}
                    format="YYYY-MM-DD"
                    sx={{
                      borderRadius: "20px",

                      width: "100%",
                      ...(limitDate < sendDate
                        ? {
                            border: "1px solid red",
                            borderRadius: "5px",
                          }
                        : ""),
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Stack>

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
              sx={{
                borderRadius: "50px",
              }}
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
              <Typography fontSize={20} mb={2}>
                Ugradyjy : {admin.firstname + " " + admin.surname}
              </Typography>
              <Stack direction="row" width="100%" spacing={2}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="select-label">Bölümi boýunça</InputLabel>
                  <Select
                    labelId="select-label"
                    value={depTitle}
                    onChange={handleChange}
                    label="Select Option"
                    sx={{
                      borderRadius: "20px",
                    }}
                  >
                    {department.map((elem) => (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="select-label">Wezipesi boýunça</InputLabel>
                  <Select
                    labelId="select-label"
                    value={posTitle}
                    onChange={handleChangePosition}
                    label="Select Option"
                    sx={{
                      borderRadius: "20px",
                    }}
                  >
                    {position.map((elem) => (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stepper activeStep={null} orientation="vertical">
                {stepUser.length !== 0 &&
                  stepUser.map((step, index) => (
                    <Step
                      key={step.id + index}
                      sx={{
                        mt: "10px",
                        borderRadius: "20px",
                        border: "1px solid gray",
                        p: 2,
                        pb: 4,
                      }}
                    >
                      <StepLabel className="step">
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          spacing={2}
                        >
                          <Typography
                            fontSize="20px"
                            // color="#000"
                            fontWeight={600}
                          >
                            {step.values}
                          </Typography>
                          {step.permissions.map((item) =>
                            item.key == "READ" ? (
                              <AutoStoriesIcon />
                            ) : item.key == "EDIT" && item.value === true ? (
                              <EditIcon />
                            ) : (
                              ""
                            )
                          )}
                        </Stack>
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
                            height: "50px",
                          }}
                          onClick={() => {
                            handleDelete2(step.id);
                            setDeleteId(step);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Stack>
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
                      disableClearable
                      id="combo-box-demo"
                      options={
                        filteredUsers.length === 0
                          ? filteredLoggedUsers
                          : filteredUsers
                      }
                      focused
                      filterSelectedOptions
                      getOptionLabel={(option) =>
                        option.firstname +
                        " " +
                        option.surname +
                        " " +
                        `(${option.position.name})`
                      }
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
                    <Stack direction="row" justifyContent="center">
                      {permission.map((checkbox, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={checkbox.value === true}
                              value={checkbox.key}
                              defaultChecked={checkbox.value == true}
                              onChange={(event) =>
                                handleChangeCheckBoxes(event, index, checkbox)
                              }
                              inputProps={{
                                "aria-label": checkbox.key,
                              }}
                            />
                          }
                          label={checkbox.key}
                        />
                      ))}
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      width="100%"
                      spacing={2}
                    >
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: "blue",
                          color: "#fff",
                          "&:hover": { background: "black" },
                          width: "25%",
                        }}
                      >
                        goşmak
                      </Button>
                      <Button
                        onClick={() => setOpen(false)}
                        sx={{
                          backgroundColor: "red",
                          width: "5%",
                          color: "#fff",
                          "&:hover": { background: "black" },
                        }}
                      >
                        X
                      </Button>
                    </Stack>
                  </form>
                ) : (
                  ""
                )}
                {openRassylka ? (
                  <form
                    last="true"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "30px",
                    }}
                    onSubmit={handleAddStepRassylka}
                  >
                    <Typography>
                      Rassylka üçin ugratmaly adamlary saýla
                    </Typography>
                    <Autocomplete
                      disableClearable
                      id="combo-box-demo"
                      options={
                        filteredUsers.length === 0
                          ? filteredLoggedUsers
                          : filteredUsers
                      }
                      focused
                      multiple={true}
                      filterSelectedOptions
                      getOptionLabel={(option) =>
                        option.firstname +
                        " " +
                        option.surname +
                        " " +
                        `(${option.position.name})`
                      }
                      onChange={handleChangeStepRassylka}
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
                    {/* <Stack direction="row" justifyContent="center">
                      {permission.map((checkbox, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={checkbox.value === true}
                              value={checkbox.key}
                              defaultChecked={checkbox.value == true}
                              onChange={(event) =>
                                handleChangeCheckBoxes(event, index, checkbox)
                              }
                              inputProps={{
                                "aria-label": checkbox.key,
                              }}
                            />
                          }
                          label={checkbox.key}
                        />
                      ))}
                    </Stack> */}
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      width="100%"
                      spacing={2}
                    >
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: "blue",
                          color: "#fff",
                          "&:hover": { background: "black" },
                          width: "25%",
                        }}
                      >
                        goşmak
                      </Button>
                      <Button
                        onClick={() => setOpenRassylka(false)}
                        sx={{
                          backgroundColor: "red",
                          width: "5%",
                          color: "#fff",
                          "&:hover": { background: "black" },
                        }}
                      >
                        X
                      </Button>
                    </Stack>
                  </form>
                ) : (
                  ""
                )}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  mt={3}
                >
                  {open || openRassylka || rassylkaPeople.length ? (
                    ""
                  ) : (
                    <Button
                      sx={{ gap: "10px", width: "100%" }}
                      onClick={() => {
                        setOpen(!open);
                        setOpenRassylka(false);
                      }}
                      last="true"
                      variant="outlined"
                    >
                      <GroupAddIcon />
                      Kime Ugratmaly
                    </Button>
                  )}
                  {open || openRassylka || stepUser.length ? (
                    ""
                  ) : (
                    <Button
                      sx={{ gap: "10px", width: "100%" }}
                      onClick={() => {
                        setOpenRassylka(!openRassylka);
                        setOpen(false);
                      }}
                      last="true"
                      variant="outlined"
                    >
                      <GroupAddIcon />
                      Rassylka
                    </Button>
                  )}
                </Stack>
              </Stepper>
              {rassylkaPeople.length ? (
                <Stack mt={2}>
                  <Typography fontSize={25} mb={1}>
                    Kabul edijiler:
                  </Typography>
                  {rassylkaPeople.length
                    ? rassylkaPeople.map((item, index) => (
                        <Typography fontSize={20}>
                          {index + 1}. {item.firstname} {item.surname}
                        </Typography>
                      ))
                    : ""}
                </Stack>
              ) : (
                ""
              )}
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
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>
                <Box sx={style}>
                  <Stack alignItems="end" width="100%" mt={-2}>
                    <IconButton
                      sx={{ fontWeight: 600, fontSize: 20 }}
                      onClick={handleClose}
                    >
                      X
                    </IconButton>
                  </Stack>
                  <Stack
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                    width={"100%"}
                  >
                    <Typography mt={-4} textAlign="center" fontSize={25}>
                      {seconds}
                    </Typography>
                    <Typography width={"100%"} textAlign="center" fontSize={25}>
                      Resminama döredildi.
                    </Typography>
                    <Stack
                      direction="column"
                      width={"100%"}
                      p="10px"
                      spacing={2}
                      alignItems="start"
                      justifyContent="space-between"
                    >
                      <Typography>Ady: {titleDoc.title}</Typography>
                      <Typography>Görnüşi: {titleDoc.typeDoc}</Typography>
                      <Typography>Bellik: {titleDoc.description}</Typography>
                      <Typography>
                        Döredilen senesi :{" "}
                        {moment(new Date()).format("YYYY-MM-DD HH:mm")}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </>
            </Modal>
          </Stack>
        </Stack>

        <Stack
          width="45%"
          sx={{
            height: "100%",
            pt: "50px",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="column" width="90%" spacing={1}>
              <Stack direction="row" justifyContent="center">
                <Stack position="relative" display="inline-block">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="file"
                    multiple
                    className="file-input"
                  />
                  <label htmlFor="file" className="file-input-label"></label>
                </Stack>
              </Stack>
              {files !== null ? (
                <>
                  <Typography>Ady :{files.name}</Typography>
                  <Typography>Göwrümi : {files.size}B</Typography>
                </>
              ) : (
                "Faýl saýlaň"
              )}
              {/* {files.length == 0
                ? "Faýl saýlanmady"
                : files.map((elem) => (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        Faýl ady: {elem.name}, Faýl göwrümi:{" "}
                        {elem.size > 1000000000
                          ? elem.size / 1000000000 + "GB"
                          : elem.size > 1000000
                          ? elem.size / 1000000 + "MB"
                          : elem.size > 1000
                          ? elem.size / 1000 + "KB"
                          : elem.size + "Bytes"}
                      </Typography>

                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          gap: "5px",
                          height: "50px",
                        }}
                        onClick={() => handleDelete(elem)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  ))} */}
            </Stack>
            <div>
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
        </Stack>
      </Stack>
    </Box>
  );
}
export default NewDocument;
