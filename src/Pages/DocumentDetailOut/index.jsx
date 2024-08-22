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
import { FileMosaic } from "@files-ui/react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { updateDocument } from "../../Components/db/Redux/api/NextDocumentSlice";
import { getOutDocumentById } from "../../Components/db/Redux/api/GetSingleOutSlice";

const DocumentDetail = () => {
  const [documentDetail, setDocumentDetail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [documentVersion, setDocumentVersion] = useState(false);
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);

  const data = useSelector((state) => state.userGetOutDocument.data);
  const status = useSelector((state) => state.userGetOutDocument.status);
  const error = useSelector((state) => state.userGetOutDocument.error);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOutDocumentById(id));
  }, [dispatch, id]);

  const admin = JSON.parse(localStorage.getItem("user"));

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
  const handleClose = () => setModalOpen(false);

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
  const [open2, setOpen2] = useState(null);

  const handleDocument = () => {
    setDocumentDetail(!documentDetail);
    setDocumentVersion(false);
  };
  const handleVersion = () => {
    setDocumentVersion(!documentVersion);
    setDocumentDetail(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextDocument = (docId) => {
    const getIdOfTrue = () => {
      for (const document of data) {
        const sharedDocs = data.sharedDocuments || [];
        for (const sharedDoc of sharedDocs) {
          if (sharedDoc.status === true) {
            return {
              id: sharedDoc.id,
              recipientId: sharedDoc.recipientId,
              queue: sharedDoc.queue,
            };
          }
        }
      }
      return null;
    };
    const IdOfTrue = getIdOfTrue();

    const getQueueValue = (data, adminId) => {
      for (const document of data) {
        const sharedDocs = document.sharedDocuments || [];
        for (const sharedDoc of sharedDocs) {
          if (sharedDoc.status === true && sharedDoc.recipient.id === adminId) {
            return sharedDoc.queue;
          }
        }
      }
      return null;
    };
    const queueValue = getQueueValue(
      status === "succeeded" ? data : "",
      admin.id
    );
    const nextQueueUser = queueValue + 1;
    const findQueue = (data) => {
      for (const document of data) {
        const sharedDocs = document.sharedDocuments || [];
        for (const sharedDoc of sharedDocs) {
          if (sharedDoc.queue === nextQueueUser) {
            return {
              id: sharedDoc.id,
              nextRecipientId: sharedDoc.recipientId,
              queue: sharedDoc.queue,
            };
          }
        }
      }
      return null;
    };

    const queueStepUserID = findQueue(status === "succeeded" ? data : "");

    const body = new FormData();
    body.append("file", file);
    body.append("documentId", docId);
    body.append("userId", queueStepUserID.nextRecipientId);
    body.append(
      "shareDocUpdate",
      JSON.stringify([
        {
          recipientId: IdOfTrue.recipientId,
          status: false,
          queue: IdOfTrue.queue,
          id: IdOfTrue.id,
          documentId: docId,
        },
        {
          recipientId: queueStepUserID.nextRecipientId,
          status: true,
          queue: queueStepUserID.queue,
          id: queueStepUserID.id,
          documentId: docId,
        },
      ])
    );
    dispatch(updateDocument(body));
  };

  return (
    <Box height="100vh" overflow="scroll" width="100%">
      <Stack p="20px">
        <Typography fontSize="30px" fontWeight="600">
          Document
        </Typography>
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
        toast.error(error)
      ) : status === "succeeded" ? (
        <Stack p="15px" spacing={2}>
          {data.map((item, index) => (
            <Stack key={item.id} direction="row" justifyContent="space-between">
              <Stack direction="column" m="0 25px 0 20px" width="25%">
                <Stack mt={5} spacing={3}>
                  <Typography minWidth="100px" textAlign="start">
                    <span style={{ color: "gray" }}> Dörediji </span> :{" "}
                    {item.sender.firstname} {item.sender.surname}
                  </Typography>
                  <Typography minWidth="100px" textAlign="start">
                    <span style={{ color: "gray" }}>Döredilen senesi</span> :{" "}
                    {item.startTime}
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
                    <span style={{ color: "gray" }}>Description</span> :{" "}
                    {item.description}
                  </Typography>
                </Stack>

                <Box sx={{ maxWidth: 600, mt: "30px" }}>
                  <Toaster />
                  <Typography minWidth="100px" fontSize={20} textAlign="center">
                    Kabul edijiler:
                  </Typography>

                  <Stepper
                    activeStep={null}
                    // activeStep={activeStep.map((elem) => elem.queue)}
                    orientation="vertical"
                  >
                    {item.sharedDocuments.map((step, index) => (
                      <Step
                        sx={{
                          ...(step.status === true
                            ? { background: "lightblue", color: "#fff" }
                            : ""),
                        }}
                        key={index}
                      >
                        <StepLabel>
                          <Typography fontSize="20px" fontWeight={600}>
                            {step.recipient.firstname} {step.recipient.surname}
                          </Typography>
                        </StepLabel>

                        <Stack
                          sx={{
                            ...(step.status === true &&
                            admin.id === step.recipientId
                              ? ""
                              : { display: "none" }),
                          }}
                        >
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
                                      toast.success(
                                        "Document successfully sent!"
                                      )
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
                              onClick={() => handleNextDocument(item.id)}
                              disabled={
                                item.sharedDocuments.length === 1 ||
                                index === item.sharedDocuments.length - 1
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
                        </Stack>

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
                          </AccordionDetails>
                        </Accordion>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Stack>
              <Stack width="75%" spacing={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  <Box direction="row" justifyContent="center">
                    <Stack position="relative" display="inline-block">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        id="file"
                        className="file-input"
                      />
                      <label for="file" className="file-input-label"></label>
                    </Stack>
                    <Stack>
                      {fileInfo.length == 0 ? "File Not selected" : fileInfo}
                    </Stack>
                  </Box>

                  <Button
                    variant="outlined"
                    sx={{
                      ...(documentDetail
                        ? {
                            backgroundColor: "blue",
                            color: "#fff",
                            "&:hover": { backgroundColor: "blue" },
                          }
                        : { backgroundColor: "#fff" }),
                    }}
                    onClick={handleDocument}
                  >
                    Dokument
                  </Button>
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
                </Stack>
                {documentDetail && (
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={3}
                      mb="20px"
                    >
                      <Typography
                        fontSize={25}
                        minWidth="500px"
                        textAlign="center"
                      >
                        {item.name}
                      </Typography>
                    </Stack>
                    <Divider sx={{ width: "80%" }} />
                    <iframe
                      src={`https://alemdocs.alemtilsimat.com/api/static/docs/${item.path}`}
                      style={{
                        border: "none",
                        width: "100%",
                        height: "85vh",
                      }}
                    ></iframe>
                  </Stack>
                )}

                {documentVersion && (
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {item.versions.map((elem, index) => (
                      <>
                        <Stack
                          direction="row"
                          alignItems="center"
                          // spacing={2}
                          justifyContent="space-between"
                          mb="10px"
                          mt="10px"
                          width="100%"
                        >
                          <Typography>{index + 1}</Typography>
                          <Typography
                            fontSize={25}
                            minWidth="50%"
                            textAlign="center"
                          >
                            Uytgediji: {elem.changer.firstname}{" "}
                            {elem.changer.surname}
                          </Typography>
                          <Typography
                            fontSize={15}
                            minWidth="20%"
                            textAlign="center"
                          >
                            {elem.path}
                          </Typography>
                          <a
                            href={`https://alemdocs.alemtilsimat.com/api/static/docs/${elem.path}`}
                            download={elem.name}
                          >
                            <Button variant="contained">
                              Download File
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
