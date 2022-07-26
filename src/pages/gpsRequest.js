import { Box, Container, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react/cjs/react.development";

import { DashboardLayout } from "src/components/dashboard-layout";
import AddRequestModal from "src/components/requests/modals/add-resquest-modal";
import GPSHandleModal from "src/components/gpsRequest/GPSHandleModal";
import { format } from "date-fns";
import { PhoneEnabled } from "@mui/icons-material";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import CustomizedTable from "src/components/CustomizedTable";
import getLatLng from "src/utils/geoLatLngFromAddress";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
import MapBox from "src/components/map/MapBox";
// const MapBox = dynamic(() => import("src/components/map/MapBox"), {
//   ssr: false,
// });

const gpsRequests = [
  {
    id: 1,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "110 Nguyen thi minh khai, quan 3, ho chi minh",
  },
  {
    id: 2,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 3,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 4,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 5,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "110 Nguyen thi minh khai, quan 3, ho chi minh",
  },
  {
    id: 6,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 7,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 8,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 9,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "110 Nguyen thi minh khai, quan 3, ho chi minh",
  },
  {
    id: 10,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 11,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 12,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 13,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "110 Nguyen thi minh khai, quan 3, ho chi minh",
  },
  {
    id: 14,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 15,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
  },
  {
    id: 16,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657443575000,
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
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
      field: "origin",
      headerName: "Origin Location",
      // valueFormatter: ({ value }) => `${format(value, "dd/MM/yyyy HH:mm:ss")}`,
      flex: 10,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "destination",
      headerName: "Destination",
      // valueFormatter: ({ value }) => `${format(value, "dd/MM/yyyy HH:mm:ss")}`,
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
          const originLatLng = await getLatLng(params.row.origin);
          const destinationLatLng = await getLatLng(params.row.destination);

          setSelectedGPSRequest({
            id: params.row.id,
            customerName: params.row.customerName,
            phoneNumber: params.row.phoneNumber,
            origin: {
              description: params.row.origin,
              coordinates: {
                lat: originLatLng.Latitude,
                lng: originLatLng.Longitude,
              },
            },

            destination: {
              description: params.row.destination,
              coordinates: {
                lat: destinationLatLng.Latitude,
                lng: destinationLatLng.Longitude,
              },
            },
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

  return (
    <>
      <Head>
        <title>Request | Material Kit</title>
      </Head>
      {/* <Box sx={{ height: "50vh" }}>
        <MapBox />
      </Box> */}
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

// export const getServerSideProps = async ({ query }) => {
//   let { _page, _limit } = query;

//   let customers = await getAllUsers({
//     params: {
//       _page,
//       _limit,
//     },
//   });

//   console.log(customers.data);

//   return {
//     props: {
//       customers: customers.data,
//     },
//   };
// };

Requests.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Requests;
