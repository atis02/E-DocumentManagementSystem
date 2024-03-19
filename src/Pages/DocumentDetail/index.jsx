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
} from "@mui/material";
import React, { useState, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { dbDoc } from "../../Components/db/dbDocuments.mjs";
import { Toaster } from "react-hot-toast";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FileMosaic } from "@files-ui/react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const DocumentDetail = ({ ...props }) => {
  const [open2, setOpen2] = useState(null);
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("document") || "[]")
  );
  const { name, id } = useParams();
  console.log(data);
  const handleOpen = (id) => {
    setOpen2(id === open2 ? null : id);
  };

  return (
    <Box height="100%" width="100%">
      <Stack p="20px">
        <Typography fontSize="30px" fontWeight="600">
          Document
        </Typography>
        <Typography>
          {name} / {id}
        </Typography>
      </Stack>
      <Stack p="15px" spacing={2}>
        {data.map((item) => (
          <Stack key={item.id} direction="row" justifyContent="space-between">
            <Stack direction="column" m="0 25px 0 20px" width="25%">
              <Stack spacing={3} direction="row" alignItems="center">
                {item.file_type.length == 1 ? (
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src={item.file_type.map((item2) =>
                      item2 ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ? "https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg"
                        : item2 === "pptx"
                        ? "https://upload.wikimedia.org/wikipedia/commons/1/16/Microsoft_PowerPoint_2013-2019_logo.svg"
                        : item2 ===
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        ? "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
                        : item2 === "application/pdf"
                        ? "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                        : ""
                    )}
                    alt=""
                  />
                ) : item.file_type.length >= 2 ? (
                  <FolderIcon
                    sx={{ color: "yellow", width: "60px", height: "60px" }}
                  />
                ) : (
                  <InsertDriveFileIcon
                    sx={{ color: "gray", width: "60px", height: "60px" }}
                  />
                )}
                <Typography minWidth="100px" textAlign="start">
                  {item.name}
                </Typography>

                <Button>
                  <NavLink
                    to="/docs/Ikramow Atamyrat ylmy iş Täze.docx"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    Source Link
                  </NavLink>
                </Button>
              </Stack>
              <Stack mt={5} spacing={3}>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}>Send date</span> :{" "}
                  {item.send_date}
                </Typography>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}>Sender </span> : O.Orazow (
                  {item.sender})
                </Typography>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}>Limit days</span> :(
                  {item.limit_date})
                </Typography>
                <Typography minWidth="100px" textAlign="start">
                  <span style={{ color: "gray" }}>Description</span> :{" "}
                  {item.description}
                </Typography>
              </Stack>

              <Box sx={{ maxWidth: 600, mt: "30px" }}>
                <Toaster />
                <Stepper
                  // activeStep={activeStep}
                  orientation="vertical"
                  // sx={{ gap: "20px" }}
                >
                  {item.steps.map((step, index) => (
                    <Step
                      // sx={{
                      //   ...(activeStep === index
                      //     ? { background: "lightgray" }
                      //     : ""),
                      // }}
                      key={step.id}
                    >
                      {/* icon={step.values[0]} */}
                      <StepLabel>
                        <Typography fontSize="20px" fontWeight={600}>
                          {step.values}
                        </Typography>
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
                          <Typography>
                            Description: {step.valuesDesc}
                          </Typography>
                          {/* {time ? ( */}
                          <Stack spacing={2} direction="row" color="gray">
                            <Typography>Send date:</Typography>
                            <Typography>
                              {new Date().getDate()}.{new Date().getMonth() + 1}
                              .{new Date().getFullYear()}
                            </Typography>
                            <Typography>
                              {new Date().getHours()}:{new Date().getMinutes()}
                            </Typography>
                          </Stack>
                          {/* ) : ( */}
                          {/* "" */}
                          {/* )} */}
                        </AccordionDetails>
                      </Accordion>

                      <StepContent>
                        {/* sub Stepper is start here */}
                        <Box ml={5} mb={2}>
                          <Stepper
                            // activeStep={subActiveStep}
                            orientation="vertical"
                            sx={{ m: "20px" }}
                          >
                            {step.subStepper.map((subStep, subIndex) => (
                              <Step
                                key={subStep.id}
                                // sx={{
                                //   ...(subActiveStep === subIndex
                                //     ? { background: "gray" }
                                //     : ""),
                                // }}
                              >
                                <StepLabel>
                                  <Typography fontSize="20px" fontWeight={600}>
                                    {subStep.subValues}
                                  </Typography>
                                </StepLabel>
                                {/* <StepContent></StepContent> */}
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                        {/* sub Stepper is end here */}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Stack>
            <Stack width="75%" spacing={2} className="document">
              {item.file_link.map((file, index) => (
                <Stack
                  key={file.id}
                  sx={{
                    ...(open === file.id ? { background: "lightgray" } : ""),
                    cursor: "pointer",
                  }}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => handleOpen(file.id)}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    // justifyContent="flex-start"
                    spacing={3}
                    mb="20px"
                  >
                    <Typography fontSize={25} textAlign="center">
                      {++index}
                    </Typography>
                    <Typography
                      fontSize={25}
                      minWidth="500px"
                      textAlign="center"
                    >
                      {file.name}
                    </Typography>
                    <FileMosaic
                      {...file}
                      onClick={() => handleOpen(file.id)}
                      preview
                    />
                  </Stack>
                  <Divider sx={{ width: "80%" }} />
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
        ))}
      </Stack>
    </Box>
  );
};

export default DocumentDetail;
