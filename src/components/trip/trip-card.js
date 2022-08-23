import { CarRentalSharp, Person } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import SyncIcon from "@mui/icons-material/Sync";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const color = {
  canceled: "red",
  processing: "#EFF54B",
  complete: "green",
  canceled_by_driver: "red",
  pick_up: "blue",
  assigned: "#EFF54B"
};

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
      <Box sx={{ flexGrow: 1 }} />
      <Grid container>
        <Grid item lg={1} md={1} xs={1}>
          <CarRentalSharp fontSize="small" />
        </Grid>
        <Grid item lg={11} md={11} xs={11}>
          <Typography fontSize="small" fontWeight="bold">
            {trip?.driver_name}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={1} md={1} xs={1}>
          <Person fontSize="small" />
        </Grid>
        <Grid item lg={11} md={11} xs={11}>
          <Typography fontSize="small" fontWeight="bold">
            {trip?.rider_name}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2, color: "black" }} />

      <Grid container>
        <Grid item lg={1} md={1} xs={1}>
          <TripOriginIcon fontSize="small" />
        </Grid>
        <Grid item lg={11} md={11} xs={11}>
          <Typography fontSize="small">{trip.pick_up_address_line}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={1} md={1} xs={1}>
          <CircleIcon fontSize="small" />
        </Grid>
        <Grid item lg={11} md={11} xs={11}>
          <Typography fontSize="small">{trip.drop_off_address_line}</Typography>
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
            color="white"
            display="inline"
            sx={{
              borderStyle: "solid",
              backgroundColor: color[trip.status],
              borderWidth: "1px",
              py: "1px",
              px: "3px",
              borderRadius: "20px",
              fontSize: 12,
              paddingX: 1,
              fontWeight: "500",
            }}
            variant="body2"
          >
            {trip.status}
          </Typography>
        </Grid>

        {trip?.status == "canceled_by_driver" && (
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
        )}
      </Grid>
    </Box>
  </Card>
);

TripCard.propTypes = {
  trip: PropTypes.object.isRequired,
};
