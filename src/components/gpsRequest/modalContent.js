import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import DoNotDisturbOnSharpIcon from "@mui/icons-material/DoNotDisturbOnSharp";

// const options = {
//   fields: ["ALL"],
//   strictBounds: [{country: "vn"}],
//   types: ["establishment"]
// };
const ModalContent = ({ handleCloseModal }) => {
  // const originRef = usePlacesWidget({
  //   apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  //   onPlaceSelected: (place) => {
  //     console.log(place);
  //   },
  //   options
  // });

  // const destinationRef = usePlacesWidget({
  //   apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  //   onPlaceSelected: (place) => {
  //     const lat = place.geometry.location.lat();
  //     console.log(lat);
  //   },
  //   options
  // });
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "20%",
          transform: "translate (-50%, -50%)",
          height: "80%",
          width: "60%",
          backgroundColor: "white",
          paddingY: "10px",
          borderRadius: "5px",
          boxShadow: 25,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            px: "10px",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", flexGrow: 1 }}>
            Add Request
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <DoNotDisturbOnSharpIcon />
          </IconButton>
        </Box>

        <Divider sx={{ marginY: "10px" }} />

        <Box
          sx={{
            px: "20px",
          }}
        >
          <Typography variant="h6" sx={{ color: "gray" }}>
            Coordinates
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: "0" }}>
            <Grid item lg={6} md={6} xs={12}>
              <TextField label="Origin" fullWidth></TextField>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField label="Destination" fullWidth></TextField>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ marginY: "10px" }} />

        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
        <Divider sx={{ marginY: "10px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </>
  );
};

export default ModalContent;
