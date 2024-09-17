import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../../Components/db/Redux/api/UserGetDocumentSlice";
import { userSendedDocuments } from "../../Components/db/Redux/api/UserSendedDocumentSlice";

const index = () => {
  const data2 = useSelector((state) => state.postDocument.data);
  const sendingData = useSelector((state) => state.userCreatedDocs.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocument());
  }, [dispatch]);
  useEffect(() => {
    dispatch(userSendedDocuments());
  }, [dispatch]);

  const data = [
    {
      id: 0,
      value: data2.length,
      label: `${data2.length} sany Gelen Resminamalar`,
    },
    {
      id: 1,
      value: sendingData.length,
      label: `${sendingData.length} sany Ugradylan Resminamalar  `,
    },
  ];

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
        Baş sahypa
      </Typography>

      <Stack
        backgroundColor="#fff"
        spacing={4}
        minHeight="80vh"
        borderRadius="20px"
        justifyContent="center"
        m="0px 20px "
        pb="10px"
        boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
      >
        <Stack>
          <Typography fontSize={25} fontFamily="Montserrat" textAlign="center">
            Ähli resminamalaryň jemi : {sendingData.length + data2.length}
          </Typography>
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 10,
                  additionalRadius: -10,
                  color: "gray",
                },
              },
            ]}
            height={200}
            width={800}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
