import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DoNotDisturbOnSharpIcon from "@mui/icons-material/DoNotDisturbOnSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Fade, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import updateTrip from "src/api/trip/updateTrip";
import CustomizedAutoComplete from "../CustomizedAutoComplete";
import MapBox from "../map/MapBox";
import ToastCustomize from "../toast";
// import ToastCustomize from "src/components/toast";

const GPSHandleModal = ({ open, setOpen, request }) => {
  //state
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [loading, setLoading] = useState(false);
  const url = request?.url ? request.url : "";
  const router = useRouter();
  //handle auto complete
  const handleCloseModal = () => {
    setOrigin(null);
    setDestination(null);
    setOpen(false);
    setLoading(false);
  };

  const handleUpadteTrip = async () => {
    setLoading(true);
    const data = await updateTrip(url, origin, destination, distance, duration);
    setLoading(false);

    if (data == null) {
      toast(<ToastCustomize title="Update GPS ERR" content="Check Intenet Connection" />);
    } else if (data?.status === 403) {
      toast(<ToastCustomize title="Authentication Error" content={data?.data?.message} />);
      removeCookies("token");
      router.push("/");
    } else if (data?.data?.message) {
      toast(<ToastCustomize title="Update GPS ERR" content={data?.data?.message} />);
    } else {
      toast(<ToastCustomize title="Notification" content="Successfully" />);
      setOpen(false);
      router.reload();
    }
  };

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
  const [price, setPrice] = useState();

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
              Handle GPS Request
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
                top: 70,
                left: 20,
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
                  top: 130,
                  left: 20,
                  padding: "10px",
                  borderRadius: "10px",
                  width: "600px ",
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
                      <Grid item lg={4} md={4} xs={12}>
                        <Typography variant="h6" component="span">
                          Duration:
                        </Typography>
                        <Typography variant="p" component="span">
                          {duration} seconds
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <Typography variant="h6" component="span">
                          Distance:
                        </Typography>
                        <Typography variant="p" component="span">
                          {distance} km
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <Typography variant="h6" component="span">
                          Price:
                        </Typography>
                        <Typography variant="p" component="span">
                          {price} VNĐ
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
            <MapBox
              origin={origin}
              destination={destination}
              setDistance={setDistance}
              setDuration={setDuration}
              setPrice={setPrice}
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
            <LoadingButton
              loading={loading}
              disabled={loading}
              variant="contained"
              onClick={handleUpadteTrip}
            >
              Update Trip GPS
            </LoadingButton>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default GPSHandleModal;
