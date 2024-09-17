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
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentById } from "../../Components/db/Redux/api/GetSingleDocumentSlice";
import moment from "moment";
import {
  updateDocument,
  updateDocumentWithoutFile,
} from "../../Components/db/Redux/api/NextDocumentSlice";
import { finishDocument } from "../../Components/db/Redux/api/FinishDocumentSlice";
import { getCleanedFilename } from "../../Components/db/getFileName";
const DocumentDetail = () => {
  const [documentDetail, setDocumentDetail] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [documentVersion, setDocumentVersion] = useState(false);
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);
  const data = useSelector((state) => state.userGetDocumentById.data);
  const status = useSelector((state) => state.userGetDocumentById.status);
  const error = useSelector((state) => state.userGetDocumentById.error);
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDocumentById(id));
  }, [dispatch, id]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileInfo(
        `Faýl ady: ${selectedFile.name}, 
        Faýl göwrümi: ${
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
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "35%",
    bgcolor: "#fff",
    border: "1px solid #000",
    boxShadow: 1,
    borderRadius: 7,
    p: 2,
  };
  const handleDocument = () => {
    setDocumentDetail(!documentDetail);
    setDocumentVersion(false);
  };
  const handleVersion = () => {
    setDocumentVersion(!documentVersion);
    setDocumentDetail(false);
  };
  const getIdOfTrue = () => {
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
    return null;
  };
  const IdOfTrue = getIdOfTrue();
  const getQueueValue = (adminId) => {
    const sharedDocs = data.sharedDocuments || [];
    for (const sharedDoc of sharedDocs) {
      if (sharedDoc.status === true && sharedDoc.recipient.id === adminId) {
        return sharedDoc.queue;
      }
    }
    return null;
  };
  const queueValue = getQueueValue(admin.id);
  const findQueue = () => {
    const sharedDocs = data.sharedDocuments || [];
    for (const sharedDoc of sharedDocs) {
      if (sharedDoc.queue === queueValue + 1) {
        return {
          id: sharedDoc.id,
          nextRecipientId: sharedDoc.recipientId,
          queue: sharedDoc.queue,
        };
      }
    }
    return null;
  };
  const queueStepUserID = findQueue();
  const handleNextDocument = (docId) => {
    const body = new FormData();
    body.append("file", file);
    body.append("documentId", docId);
    body.append("userId", IdOfTrue.recipientId);
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
    dispatch(updateDocument({ body, id }));
    handleClose();
  };
  const handleNextWithoutFile = (docId) => {
    const body = {
      shareDocUpdate: [
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
      ],
    };

    dispatch(updateDocumentWithoutFile({ body, id }));
    handleClose();
  };
  const findPrevQueue = () => {
    const sharedDocs = data.sharedDocuments || [];
    for (const sharedDoc of sharedDocs) {
      if (sharedDoc.queue === queueValue - 1) {
        return {
          id: sharedDoc.id,
          nextRecipientId: sharedDoc.recipientId,
          queue: sharedDoc.queue,
        };
      }
    }
    return null;
  };
  const prevQueue = findPrevQueue();
  const handlePrevDocument = (docId) => {
    const body = new FormData();
    body.append("file", file);
    body.append("documentId", docId);
    body.append("userId", IdOfTrue.recipientId);
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
          recipientId: prevQueue.nextRecipientId,
          status: true,
          queue: prevQueue.queue,
          id: prevQueue.id,
          documentId: docId,
        },
      ])
    );
    dispatch(updateDocument({ body, id }));
    handleClose();
  };

  const handlePrevWithoutFile = (docId) => {
    const body = {
      shareDocUpdate: [
        {
          recipientId: IdOfTrue.recipientId,
          status: false,
          queue: IdOfTrue.queue,
          id: IdOfTrue.id,
          documentId: docId,
        },
        {
          recipientId: prevQueue.nextRecipientId,
          status: true,
          queue: prevQueue.queue,
          id: prevQueue.id,
          documentId: docId,
        },
      ],
    };

    dispatch(updateDocumentWithoutFile({ body, id }));
    handleClose();
  };
  const lastElement =
    status === "succeeded" &&
    data.sharedDocuments &&
    data.sharedDocuments.length > 0 &&
    data.sharedDocuments[data.sharedDocuments.length - 1];

  const handleFinishDocument = () => {
    const body = {
      recipientId: lastElement.recipientId,
      id: lastElement.id,
      documentId: lastElement.documentId,
    };

    dispatch(finishDocument({ body, id }));
  };
  const firstTrueIndex =
    data.sharedDocuments &&
    data.sharedDocuments.findIndex((item) => item.status === true);
  const hasTrueStatus =
    data.sharedDocuments &&
    data.sharedDocuments.some((item) => item.status === true);
  const EditIsTrue =
    data.sharedDocuments &&
    data.sharedDocuments
      .map((entry) => (entry.recipientId == admin.id ? entry.permissions : [])) // Map to arrays
      .flat() // Flatten the arrays into a single array
      .filter((doc) => doc.key == "EDIT" && doc.value === true);

  return (
    <Box height="100vh" overflow="scroll" width="100%">
      <Stack p="20px">
        <Typography fontSize="30px" fontWeight="600">
          {data.name}
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
        <Typography fontSize="30px" textAlign="center" fontWeight="600">
          {error}
          {toast.error(error)}
        </Typography>
      ) : status === "succeeded" ? (
        <Stack p="15px" spacing={2}>
          <Stack
            key={status === "succeeded" && data.id}
            direction="row"
            justifyContent="space-between"
          >
            <Stack direction="column" m="0 25px 0 20px" width="25%">
              <Stack mt={5} spacing={3}>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}> Dörediji </span> :{" "}
                  {data.sender && data.sender.firstname}{" "}
                  {data.sender && data.sender.surname}
                </Typography>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}>Döredilen senesi</span> :{" "}
                  {moment(data.createdAt).format("YYYY-MM-DD HH:mm")}
                </Typography>
                <Typography
                  sx={{
                    ...(data.endTime <=
                    moment().add(1, "days").format("YYYY-MM-DD")
                      ? { color: "tomato" }
                      : "#000"),
                  }}
                  minWidth="100px"
                  textAlign="start"
                >
                  <span style={{}}>Möhleti(çenli)</span> : {data.endTime}
                </Typography>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}>Description</span> :{" "}
                  {data.description}
                </Typography>
              </Stack>
              <Box sx={{ maxWidth: 600, mt: "30px" }}>
                <Toaster />
                <Typography minWidth="100px" fontSize={20} textAlign="center">
                  Kabul edijiler:
                </Typography>
                {/* {data.versions && data.versions.length > 1 ? ( */}
                {data.docType && data.docType.name === "Rassylka" ? (
                  <Stack orientation="vertical" mt={2}>
                    {data.sharedDocuments && data.sharedDocuments.length > 0
                      ? data.sharedDocuments.map((step, index) => (
                          <Stack
                            direction="row"
                            alignItems={"center"}
                            spacing={2}
                            mb={1}
                            key={index}
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
                        ))
                      : ""}
                  </Stack>
                ) : (
                  <Stack activestep={queueValue - 1} orientation="vertical">
                    {data.sharedDocuments && data.sharedDocuments.length > 0
                      ? data.sharedDocuments.map((step, index) => (
                          <Stack key={index}>
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
                                  <Typography fontSize="20px" fontWeight={600}>
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
                                        <AutoStoriesIcon key={item} />
                                      ) : item.key == "EDIT" &&
                                        item.value === true ? (
                                        <EditIcon />
                                      ) : item.key == "DELETE" ? (
                                        ""
                                      ) : (
                                        ""
                                      )
                                    )}
                                  </Stack>
                                </Stack>
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
                                      opacity: "0.4",
                                    },
                                  }}
                                >
                                  <Box sx={style}>
                                    <Typography
                                      textAlign="center"
                                      fontSize={22}
                                    >
                                      {file === null
                                        ? "Siz Resminama girizmediňiz girizilen resminama bilen ylalaşýarsyňyzmy?"
                                        : "Resminamany ugratmak isleýärsiňizmi?"}
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
                                        onClick={() => {
                                          file === null
                                            ? handleNextWithoutFile(data.id)
                                            : handleNextDocument(data.id);
                                        }}
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
                                    onClick={handleOpen}
                                    disabled={
                                      data.sharedDocuments.length === 1 ||
                                      index === data.sharedDocuments.length - 1
                                    }
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Ugratmak
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    disabled={index === 0}
                                    onClick={() => {
                                      file === null
                                        ? handlePrevWithoutFile(data.id)
                                        : handlePrevDocument(data.id);
                                    }}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Yzyna
                                  </Button>
                                  {lastElement.status === true ? (
                                    <Button
                                      onClick={handleFinishDocument}
                                      variant="outlined"
                                      color="success"
                                    >
                                      Finish
                                    </Button>
                                  ) : (
                                    ""
                                  )}
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
            <Stack width="75%" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Box
                  sx={{
                    width: "50%",
                    ...(IdOfTrue !== null &&
                    IdOfTrue.recipientId === admin.id &&
                    EditIsTrue.length !== 0
                      ? { display: "block" }
                      : { display: "none" }),
                  }}
                >
                  <Stack position="relative" display="inline-block">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      id="file"
                      className="file-input"
                    />
                    <label htmlFor="file" className="file-input-label"></label>
                  </Stack>
                  <Stack width="60%">
                    {fileInfo.length == 0 ? "Faýl saýlaň" : fileInfo}
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
                      {data.name}
                    </Typography>
                  </Stack>
                  <Divider sx={{ width: "80%" }} />
                  <iframe
                    src={`https://alemdocs.alemtilsimat.com/api/static/docs/${data.path}`}
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
                  {data.versions.map((elem, index) => (
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
                          {getCleanedFilename(elem.path)}
                          {/* {elem.path} */}
                        </Typography>
                        <a
                          href={`https://alemdocs.alemtilsimat.com/api/static/docs/${elem.path}`}
                          download={elem.name}
                          // target="_blank"
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
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </Box>
  );
};

export default DocumentDetail;
