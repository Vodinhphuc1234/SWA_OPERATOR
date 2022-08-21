import { Add, AddCircleOutline } from "@mui/icons-material";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Box, Fab, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getMessagingToken } from "src/utils/firebase";
import AddRequestModal from "../requests/modals/add-resquest-modal";

function PushNotificationLayout({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const handleOpenCall = (phoneNumber) => {
    setOpenModal(true);
    setPhoneNumber(phoneNumber);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const state = useEffect(() => {
    // Calls the getMessage() function if the token is there
    const setToken = async () => {
      try {
        const token = await getMessagingToken();
        console.log(token);
        if (token) {
          console.log("token", token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event.data);
        toast(
          <Box p={2}>
            <Grid container>
              <Grid item lg={12} md={12} xs={12}>
                <Typography variant="h6" color={"black"} component="div">
                  {event.data?.notification?.title}
                </Typography>
                <Typography variant="p" component="div">
                  {event.data?.notification?.body}
                </Typography>
              </Grid>

              <Grid item lg={12} md={12} xs={12} display="flex" marginTop={3}>
                <Grid item lg={6} md={6} xs={6} display="flex" justifyContent="center">
                  <IconButton
                    sx={{
                      backgroundColor: "red",
                      width: "50px",
                      height: "50px",
                      ":hover": "opacity: 0.5",
                    }}
                  >
                    <PhoneDisabledIcon sx={{ color: "white" }} />
                  </IconButton>
                </Grid>
                <Grid item lg={6} md={6} xs={6} display="flex" justifyContent="center">
                  <IconButton
                    sx={{
                      backgroundColor: "green",
                      width: "50px",
                      height: "50px",
                      ":hover": "opacity: 0.5",
                    }}
                    onClick={() => {
                      handleOpenCall(event.data?.notification?.body);
                    }}
                  >
                    <PhoneEnabledIcon sx={{ color: "white" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      });
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={40000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AddRequestModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        phoneNumber={phoneNumber}
      />
      {children}

      <Fab
        draggable={true}
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "20%", right: 20 }}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Add />
      </Fab>
    </>
  );
}

export default PushNotificationLayout;
