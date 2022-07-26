import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import CircleIcon from "@mui/icons-material/Circle";
import SyncIcon from "@mui/icons-material/Sync";

export const TripCard = ({ trip, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent sx={{ py: "10px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
        <Grid item lg={6} md={6} xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 1,
            }}
          >
            <Avatar alt="Trip" src={trip.media} variant="square" />
          </Box>
          <Typography align="center" color="textPrimary" gutterBottom variant="h6">
            {trip.title}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 1,
            }}
          >
            <Avatar alt="Trip" src={trip.media} variant="square" />
          </Box>
          <Typography align="center" color="textPrimary" gutterBottom variant="h6">
            {trip.title}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }} />
      <Grid container>
        <Grid item lg={1} md={1} xs={1}>
          <TripOriginIcon fontSize="small" />
        </Grid>
        <Grid item lg={11} md={11} xs={11}>
          <Typography fontSize="small">Bui Dinh Tuy</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={1} md={1} xs={1}>
          <CircleIcon fontSize="small" />
        </Grid>
        <Grid item lg={11} md={11} xs={11}>
          <Typography fontSize="small">Bui Dinh Tuy</Typography>
        </Grid>
      </Grid>
    </CardContent>
    {/* <Box sx={{ flexGrow: 1 }} /> */}
    <Divider />
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            color="red"
            display="inline"
            sx={{
              borderStyle: "solid",
              borderColor: "red",
              borderWidth: "1px",
              py: "1px",
              px: "3px",
              borderRadius: "20px",
            }}
            variant="body2"
          >
            Driver Cancle 
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button sx={{ color: "green" }} startIcon={<SyncIcon />}>
            Rollback
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

TripCard.propTypes = {
  trip: PropTypes.object.isRequired,
};
