import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getListTrips from "src/api/trip/getListTrips";
import ToastCustomize from "src/components/toast";
import { TripCard } from "src/components/trip/trip-card";
import { DashboardLayout } from "../components/dashboard-layout";

const Trips = () => {
  //pagign
  const [offset, setOffset] = useState(0);

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const asyncFunc = async () => {
      setLoading(true);

      const data = await getListTrips({
        params: {
          offset,
          limit: 30,
          with_count: true,
        },
      });

      if (data == null) {
        toast(<ToastCustomize title="Network ERR" content="Check network connection" />);
      } else if (data?.data?.message) {
        toast(<ToastCustomize title="Fetching data err" content={data.data.message} />);
      } else {
        setTrips((prev) => [...prev, ...data.results]);
      }

      setLoading(false);
    };
    asyncFunc();
  }, [offset]);
  return (
    <>
      <Head>
        <title>Trips</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <div
          style={{
            height: "88vh",
            overflowY: "auto",
          }}
          onScroll={(event) => {
            console.log(event.currentTarget.scrollTop);
            console.log(event.currentTarget.scrollHeight);
            if (
              event.currentTarget.scrollTop ==
                event.currentTarget.scrollHeight - event.currentTarget.clientHeight &&
              !loading
            ) {
              console.log("Scrooll");
              setOffset((prev) => prev + 30);
            }
          }}
        >
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item key={trip.self} lg={3} md={4} xs={6}>
                <TripCard trip={trip} />
              </Grid>
            ))}
            {loading && (
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <LoadingButton loading={true} size="large" style={{ color: "red" }} />
              </Grid>
            )}
          </Grid>
        </div>
        {/* </Container> */}
      </Box>
    </>
  );
};

Trips.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Trips;
