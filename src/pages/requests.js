import { PhoneEnabled } from "@mui/icons-material";
import PhoneDisabled from "@mui/icons-material/PhoneDisabled";
import { Box, IconButton } from "@mui/material";
import { format } from "date-fns";
import Head from "next/head";
import { useState } from "react";
import getAllUsers from "src/api/getAllUser";
import CustomizedTable from "src/components/CustomizedTable";
import { DashboardLayout } from "src/components/dashboard-layout";
import AddRequestModal from "src/components/requests/modals/add-resquest-modal";

const requests = [
  {
    id: 1,
    customerName: "Jonh Wick",
    phoneNumber: "0123456789",
    requestTime: 1657770338000,
  },
  {
    id: 2,
    customerName: "Cristino Ronaldo",
    phoneNumber: "0123456789",
    requestTime: 1657770338000,
  },
  {
    id: 3,
    customerName: "Lionel Messi",
    phoneNumber: "0123456789",
    requestTime: 1657770338000,
  },
  {
    id: 4,
    customerName: "Neymar Juniors",
    phoneNumber: "0123456789",
    requestTime: 1657770338000,
  },
];

const columns = [
  { field: "id", headerName: "ID", flex: 0.5, headerClassName: "super-app-theme--header" },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "requestTime",
    headerName: "Request time",
    valueFormatter: ({ value }) => `${format(value, "dd/MM/yyyy HH:mm:ss")}`,
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
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
    field: "that",
    headerName: "Reject",
    headerClassName: "super-app-theme--header",
    renderCell: () => {
      const onClick = (e) => {
        e.stopPropagation();
        console.log("hello");
      };
      return (
        <IconButton
          sx={{ borderStyle: "solid", borderWidth: "1px", borderColor: "red" }}
          onClick={onClick}
        >
          <PhoneDisabled sx={{ color: "red" }} />
        </IconButton>
      );
    },
  },
];

const Requests = ({ customers }) => {
  const [openModal, setOpenModal] = useState(false);

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
          <CustomizedTable rows={requests} columns={columns} />
        </Box>
      </Box>

      <AddRequestModal
        openModal={openModal}
        handleCloseModal={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  let { _page, _limit } = query;

  let customers = await getAllUsers({
    params: {
      _page,
      _limit,
    },
  });

  console.log(customers.data);

  return {
    props: {
      customers: customers.data,
    },
  };
};

Requests.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Requests;
