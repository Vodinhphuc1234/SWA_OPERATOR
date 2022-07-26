import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DoNotDisturbOnSharpIcon from "@mui/icons-material/DoNotDisturbOnSharp";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import SimpleMap from "../map";
import MapBox from "../map/MapBox";
import { getPlaceSuggests } from "src/utils/getPlaceSuggestions";
import CustomizedAutoComplete from "../CustomizedAutoComplete";

const GPSHandleModal = ({ open, setOpen, request }) => {
  //handle auto complete
  const handleCloseModal = () => {
    setOrigin(null);
    setDestination(null);
    setOpen(false);
  };

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  useEffect(() => {
    setOrigin({ ...request?.origin });
    setDestination({ ...request?.destination });
  }, [request]);

  console.log(origin, destination);

  //handle dialog
  const [checked, setChecked] = useState(false);
  //distance and duration computing
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();

  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseModal();
      }}
    >
      <>
        <Box
          sx={{
            position: "absolute",
            top: "6%",
            left: "20%",
            transform: "translate (-50%, -50%)",
            height: "90%",
            width: "70%",
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

          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                zIndex: 51,
                top: 110,
                left: 10,
                boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px",
                backgroundColor: "white",
                width: "50px",
                height: "50px",
                borderRadius: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setChecked(!checked);
                }}
              >
                {checked ? <ExpandLessIcon /> : <BorderColorRoundedIcon />}
              </IconButton>
            </Box>
            <Fade in={checked} orientation="horizontal">
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "white ",
                  zIndex: 50,
                  top: 170,
                  left: 10,
                  padding: "10px",
                  borderRadius: "10px",
                  width: "400px ",
                  borderWidth: "1px",
                  borderColor: "black",
                  borderStyle: "solid",
                }}
              >
                <Grid container spacing={3} sx={{ marginTop: "0" }}>
                  <Grid item lg={12} md={12} xs={12}>
                    <CustomizedAutoComplete
                      label="Origin..."
                      setLocation={setOrigin}
                      location={origin}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} xs={12}>
                    <CustomizedAutoComplete
                      label="Destination..."
                      setLocation={setDestination}
                      location={destination}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Grid container>
                      <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h6" component="span">
                          Duration:
                        </Typography>
                        <Typography variant="p" component="span">
                          {" "}
                          {duration}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h6" component="span">
                          Distance:
                        </Typography>
                        <Typography variant="p" component="span">
                          {" "}
                          {distance}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
            {/* <SimpleMap
              origin={origin}
              destination={destination}
              setDistance={setDistance}
              setDuration={setDuration}
              setDestination = {setDestination}
              setOrigin = {setOrigin}
            /> */}
            <MapBox
              origin={origin}
              destination={destination}
              setDistance={setDistance}
              setDuration={setDuration}
              setDestination={setDestination}
              setOrigin={setOrigin}
            />
          </Box>
          <Divider />
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
    </Modal>
  );
};

export default GPSHandleModal;
