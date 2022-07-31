import { Box, IconButton } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

import { DashboardLayout } from "src/components/dashboard-layout";
import AddRequestModal from "src/components/requests/modals/add-resquest-modal";
import GPSHandleModal from "src/components/gpsRequest/GPSHandleModal";
import { format } from "date-fns";
import { PhoneEnabled } from "@mui/icons-material";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import CustomizedTable from "src/components/CustomizedTable";
import getLatLng from "src/utils/geoLatLngFromAddress";
import "mapbox-gl/dist/mapbox-gl.css";

const gpsRequests = [
  {
    id: 1,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 2,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 3,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 4,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 5,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 6,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 7,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 8,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 9,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 10,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 11,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 12,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 13,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 14,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 15,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
  {
    id: 16,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    amountTime: "16 mins"
  },
];

const Requests = ({ customers }) => {
  const [openModal, setOpenModal] = useState(false);

  // GPS handle
  const [selectedGPSRequest, setSelectedGPSRequest] = useState(null);
  const [openGPSModal, setOpenGPSModal] = useState(false);

  //init columns
  const columns = [
    { field: "id", headerName: "ID", flex: 1, headerClassName: "super-app-theme--header" },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "requestTime",
      headerName: "Request time",
      valueFormatter: ({ value }) => `${format(value, "dd/MM/yyyy HH:mm:ss")}`,
      flex: 5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "amountTime",
      headerName: "Amount Time",
      flex: 5,
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
  ];

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
            rows={gpsRequests}
            columns={columns}
            onSelectionChange={(newSelection) => {
              console.log(newSelection);
            }}
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

Requests.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Requests;
