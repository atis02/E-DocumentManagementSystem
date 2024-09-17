import {
  Box,
  Stack,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  StepContent,
  IconButton,
  Divider,
  Modal,
  CircularProgress,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";
import { getOutDocumentById } from "../../Components/db/Redux/api/GetSingleOutSlice";
import { getCleanedFilename } from "../../Components/db/getFileName";

const DocumentDetail = () => {
  const [documentDetail, setDocumentDetail] = useState(false);
  const [documentVersion, setDocumentVersion] = useState(false);

  const data = useSelector((state) => state.userGetOutDocument.data);
  const status = useSelector((state) => state.userGetOutDocument.status);
  const error = useSelector((state) => state.userGetOutDocument.error);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOutDocumentById(id));
  }, [dispatch, id]);

  const admin = JSON.parse(localStorage.getItem("user"));

  const handleVersion = () => {
    setDocumentVersion(!documentVersion);
    setDocumentDetail(false);
  };

  const firstTrueIndex = data.map((elem) =>
    elem.sharedDocuments.findIndex((item) => item.status === true)
  );
  const hasTrueStatus = data.map((item) =>
    item.sharedDocuments.some((item) => item.status === true)
  );
  return (
    <Box height="100vh" overflow="scroll" width="100%">
      <Stack p="20px">
        {data.map((item) => (
          <Typography key={item.id} fontSize="30px" fontWeight="600">
            {item.name}
          </Typography>
        ))}
      </Stack>
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
        <Typography key={item.id} fontSize="30px" fontWeight="600">
          {error}
          {toast.error(error)}
        </Typography>
      ) : status === "succeeded" ? (
        <Stack p="15px" spacing={2}>
          {data.map((item, index) => (
            <Stack key={item.id} direction="row" justifyContent="space-between">
              <Stack direction="column" m="0 25px 0 20px" width="35%">
                <Stack mt={5} spacing={3}>
                  <Typography minWidth="100px" textAlign="start">
                    <span style={{ color: "gray" }}> Dörediji </span> :{" "}
                    {item.sender.firstname} {item.sender.surname}
                  </Typography>
                  <Typography minWidth="100px" textAlign="start">
                    <span style={{ color: "gray" }}>Döredilen senesi</span> :{" "}
                    {moment(item.createdAt).format("YYYY-MM-DD HH:mm")}
                  </Typography>
                  <Typography
                    sx={{
                      ...(item.endTime <=
                      moment().add(1, "days").format("YYYY-MM-DD")
                        ? { color: "tomato" }
                        : "#000"),
                    }}
                    minWidth="100px"
                    textAlign="start"
                  >
                    <span style={{}}>Möhleti(çenli)</span> : {item.endTime}
                  </Typography>
                  <Typography minWidth="100px" textAlign="start">
                    <span style={{ color: "gray" }}>Bellik</span> :{" "}
                    {item.description ? item.description : "Bellik ýok"}
                  </Typography>
                  <Typography minWidth="100px" textAlign="start">
                    <span style={{ color: "gray" }}>Ýagdaýy</span> :{" "}
                    {item.statusType}
                    {item.sharedDocuments.map((elem) =>
                      elem.status == true
                        ? `(${
                            elem.recipient.firstname +
                            " " +
                            elem.recipient.surname
                          })`
                        : ""
                    )}
                  </Typography>
                </Stack>

                <Box sx={{ mt: "30px" }}>
                  <Toaster />

                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    mb={2}
                    width="100%"
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        ...(documentVersion
                          ? {
                              backgroundColor: "blue",
                              color: "#fff",
                              "&:hover": { backgroundColor: "blue" },
                            }
                          : { backgroundColor: "#fff" }),
                      }}
                      onClick={handleVersion}
                    >
                      Dokument Wersiyalar
                    </Button>
                    {documentVersion && (
                      <Stack
                        direction="column"
                        alignItems="center"
                        width="100%"
                        justifyContent="center"
                      >
                        {item.versions.map((elem, index) => (
                          <>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Typography>{index + 1}</Typography>
                              <Typography fontSize={25} textAlign="center">
                                Uytgediji: {elem.changer.firstname}{" "}
                                {elem.changer.surname}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              // spacing={2}
                              justifyContent="space-between"
                              mb="10px"
                              mt="10px"
                              width="100%"
                            >
                              <Typography
                                fontSize={15}
                                minWidth="20%"
                                textAlign="center"
                              >
                                {getCleanedFilename(elem.path)}
                              </Typography>
                              <a
                                href={`https://alemdocs.alemtilsimat.com/api/static/docs/${elem.path}`}
                                download={elem.name}
                              >
                                <Button variant="contained">
                                  <ArrowDownwardIcon />
                                </Button>
                              </a>
                            </Stack>
                            <Divider sx={{ color: "gray", width: "100%" }} />
                          </>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                  <Typography minWidth="100px" fontSize={20} textAlign="center">
                    Kabul edijiler:
                  </Typography>
                  {item.docType && item.docType.name === "Rassylka" ? (
                    <Stack orientation="vertical">
                      {item.sharedDocuments && item.sharedDocuments.length > 0
                        ? item.sharedDocuments.map((step, index) => (
                            <Stack>
                              <Stack
                                direction="row"
                                alignItems={"center"}
                                spacing={2}
                                mb={1}
                              >
                                <Stack
                                  borderRadius="100%"
                                  backgroundColor="blue"
                                  width={25}
                                  height={25}
                                  alignItems="center"
                                >
                                  <Typography color="#fff">
                                    {index <= firstTrueIndex - 1 ||
                                    hasTrueStatus === false ? (
                                      <CheckIcon />
                                    ) : (
                                      index + 1
                                    )}
                                  </Typography>
                                </Stack>
                                <Typography fontSize="20px" fontWeight={600}>
                                  {step.recipient.firstname}{" "}
                                  {step.recipient.surname}
                                </Typography>
                              </Stack>
                            </Stack>
                          ))
                        : ""}
                    </Stack>
                  ) : (
                    <Stack orientation="vertical" mt={2}>
                      {item.sharedDocuments && item.sharedDocuments.length > 0
                        ? item.sharedDocuments.map((step, index) => (
                            <Stack>
                              <Stack
                                backgroundColor="gray"
                                height={50}
                                width="1px"
                                ml={4}
                                mb={-1.4}
                                sx={{
                                  ...(index === 0
                                    ? { display: "none" }
                                    : { display: "block" }),
                                }}
                              ></Stack>
                              <Step
                                sx={{
                                  ...(step.status === true
                                    ? { background: "lightblue", color: "#fff" }
                                    : ""),
                                  mt: "10px",
                                  borderRadius: "20px",
                                  border: "1px solid gray",
                                  p: 1,
                                  pb: 4,
                                }}
                                key={step.recipient.id}
                              >
                                <StepLabel>
                                  <Stack
                                    direction="row"
                                    alignItems={"center"}
                                    justifyContent="space-between"
                                    spacing={2}
                                    mb={1}
                                  >
                                    <Stack
                                      borderRadius="100%"
                                      backgroundColor="blue"
                                      width={25}
                                      height={25}
                                      alignItems="center"
                                    >
                                      <Typography color="#fff">
                                        {index <= firstTrueIndex - 1 ||
                                        hasTrueStatus === false ? (
                                          <CheckIcon />
                                        ) : (
                                          index + 1
                                        )}
                                      </Typography>
                                    </Stack>
                                    <Typography
                                      fontSize="20px"
                                      fontWeight={600}
                                    >
                                      {step.recipient.firstname}{" "}
                                      {step.recipient.surname}
                                    </Typography>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems={"center"}
                                    >
                                      {step.permissions.map((item) =>
                                        item.key == "READ" ? (
                                          <AutoStoriesIcon />
                                        ) : item.key === "EDIT" &&
                                          item.value === true ? (
                                          <EditIcon />
                                        ) : (
                                          ""
                                        )
                                      )}
                                    </Stack>
                                  </Stack>
                                </StepLabel>

                                <Accordion>
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
                                    <Typography>Description:</Typography>
                                    <Stack
                                      spacing={2}
                                      direction="row"
                                      color="gray"
                                    >
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
                                  </AccordionDetails>
                                </Accordion>
                              </Step>
                            </Stack>
                          ))
                        : ""}
                    </Stack>
                  )}
                </Box>
              </Stack>
              <Stack width="65%" mt={-10}>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <iframe
                    src={`https://alemdocs.alemtilsimat.com/api/static/docs/${item.path}`}
                    style={{
                      border: "none",
                      width: "100%",
                      height: "84vh",
                    }}
                  ></iframe>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </Box>
  );
};

export default DocumentDetail;
