import { Box, IconButton } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

import { PhoneEnabled } from "@mui/icons-material";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";
import getListTrips from "src/api/trip/getListTrips";
import CustomizedTable from "src/components/CustomizedTable";
import { DashboardLayout } from "src/components/dashboard-layout";
import GPSHandleModal from "src/components/gpsRequest/GPSHandleModal";
import AddRequestModal from "src/components/requests/modals/add-resquest-modal";
import getLatLng from "src/utils/geoLatLngFromAddress";

const Requests = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const { trips, totalItem } = data;

  // GPS handle
  const [selectedGPSRequest, setSelectedGPSRequest] = useState(null);
  const [openGPSModal, setOpenGPSModal] = useState(false);

  //init columns
  const columns = [
    { field: "id", headerName: "ID", flex: 1, headerClassName: "super-app-theme--header" },
    {
      field: "rider_name",
      headerName: "Customer Name",
      flex: 5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "rider_phone_number",
      headerName: "Phone Number",
      flex: 5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date_created",
      headerName: "Request time",
      // valueFormatter: ({ value }) => `${format(value, "dd/MM/yyyy HH:mm:ss")}`,
      flex: 5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "pick_up_address_line",
      headerName: "Origin Location",
      flex: 10,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "drop_off_address_line",
      headerName: "Destination",
      flex: 10,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "self",
      headerName: "URL",
      flex: 10,
      headerClassName: "super-app-theme--header",
    },
    {
      flex: 2,
      field: "this",
      headerName: "Answer",
      headerClassName: "super-app-theme--header",
      renderCell: () => {
        return (
          <IconButton sx={{ borderStyle: "solid", borderWidth: "1px", borderColor: "green" }}>
            <PhoneEnabled sx={{ color: "green" }} />
          </IconButton>
        );
      },
    },
    {
      flex: 2,
      field: "that",
      headerName: "Reject",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const onClick = async () => {
          //get ret
          const originLatLng = await getLatLng(params.row["pick_up_address_line"]);
          const destinationLatLng = await getLatLng(params.row["drop_off_address_line"]);

          setSelectedGPSRequest({
            id: params.row.id,
            customerName: params.row["rider_name"],
            phoneNumber: params.row["rider_phone_number"],
            origin: {
              description: params.row["pick_up_address_line"],
              coordinates: {
                lat: originLatLng.Latitude,
                lng: originLatLng.Longitude,
              },
            },

            destination: {
              description: params.row["drop_off_address_line"],
              coordinates: {
                lat: destinationLatLng.Latitude,
                lng: destinationLatLng.Longitude,
              },
            },
            url: params.row.self,
          });
          setOpenGPSModal(true);
        };
        return (
          <IconButton
            sx={{ borderStyle: "solid", borderWidth: "1px", borderColor: "blue" }}
            onClick={async () => {
              await onClick();
            }}
          >
            <PersonPinCircleIcon sx={{ color: "blue" }} />
          </IconButton>
        );
      },
    },
  ];

  const router = useRouter();
  const [paging, setPaging] = useState({ limit: 20, offset: 0 });
  useEffect(() => {
    console.log(paging);
    router.query.limit = paging.limit;
    router.query.offset = paging.offset;
    router.push(router);
  }, [paging]);

  // const { trips, totalItem } = data;

  return (
    <>
      <Head>
        <title>GPS Requests</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Box sx={{ height: "88vh", width: "100%" }}>
          <CustomizedTable
            paging={paging}
            setPaging={setPaging}
            rows={trips}
            columns={columns}
            totalItem={totalItem}
          />
        </Box>
      </Box>
      <AddRequestModal
        openModal={openModal}
        handleCloseModal={() => {
          setOpenModal(false);
        }}
      />
      <GPSHandleModal open={openGPSModal} setOpen={setOpenGPSModal} request={selectedGPSRequest} />
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
        pick_up_address_coordinates_is_null: true,
        drop_off_address_coordinates_is_null: true,
        with_count: true,
      },
    },
    { req, res }
  );

  console.log(data);

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
