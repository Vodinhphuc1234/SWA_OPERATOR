import { PhoneEnabled } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getListTrips from "src/api/trip/getListTrips";
import CustomizedTable from "src/components/CustomizedTable";
import { DashboardLayout } from "src/components/dashboard-layout";

const color = {
  canceled: "red",
  processing: "#EFF54B",
  complete: "green",
  canceled_by_driver: "red",
  pick_up: "blue",
};
const columns = [
  { field: "id", headerName: "ID", flex: 0.5, headerClassName: "super-app-theme--header" },
  {
    field: "rider_name",
    headerName: "Customer Name",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "rider_phone_number",
    headerName: "Phone Number",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "date_created",
    headerName: "Request time",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "pick_up_address_line",
    headerName: "Origin",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "drop_off_address_line",
    headerName: "Destination",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      return (
        <Typography
          color="white"
          display="inline"
          sx={{
            borderStyle: "solid",
            backgroundColor: color[params.value],
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
          {params.value}
        </Typography>
      );
    },
  },
  {
    field: "this",
    headerName: "ReCall",
    headerClassName: "super-app-theme--header",
    renderCell: () => {
      return (
        <IconButton sx={{ borderStyle: "solid", borderWidth: "1px", borderColor: "green" }}>
          <PhoneEnabled sx={{ color: "green" }} />
        </IconButton>
      );
    },
  },
];

const Requests = ({ data }) => {
  const router = useRouter();
  const [paging, setPaging] = useState({ limit: 20, offset: 0 });
  useEffect(() => {
    console.log(paging);
    router.query.limit = paging.limit;
    router.query.offset = paging.offset;
    router.push(router);
  }, [paging]);

  const { trips, totalItem } = data;

  useEffect(() => {
    if (data?.error) {
      toast(
        <Box p={2}>
          <Grid container>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h6" color={"black"} component="div">
                Data Fetching Error
              </Typography>
              <Typography variant="p" component="div">
                {data.error}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      );
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Request</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Box sx={{ height: "91vh", width: "100%" }}>
          <CustomizedTable
            paging={paging}
            setPaging={setPaging}
            rows={trips}
            columns={columns}
            totalItem={totalItem}
          />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ query, req, res }) => {
  var result = {};
  let { offset, limit } = query;

  const data = await getListTrips(
    {
      params: {
        offset,
        limit,
        with_count: true,
      },
    },
    { req, res }
  );

  if (data == null) {
    result.error = "Check your internet";
  } else if (data?.data?.message) {
    result.error = data.data.message;
  } else {
    var id = 1;
    data.results.forEach((item) => {
      item.id = id++;
    });

    result = {
      totalItem: data.count,
      trips: data.results,
    };
  }

  return {
    props: {
      data: result,
    },
  };
};

Requests.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Requests;
