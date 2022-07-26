import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Router from "next/router";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export const GPSRequestListResults = ({
  gpsRequests,
  setOpenGPSModal,
  setSelectedGPSRequest,
  ...rest
}) => {
  const [selectedGPSRequestIds, setSelectedGPSRequestIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedGPSRequestIds;

    if (event.target.checked) {
      newSelectedGPSRequestIds = gpsRequests.map((gpsRequest) => gpsRequest.id);
    } else {
      newSelectedGPSRequestIds = [];
    }

    setSelectedGPSRequestIds(newSelectedGPSRequestIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedGPSRequestIds.indexOf(id);
    let newSelectedGPSRequestIds = [];

    if (selectedIndex === -1) {
      newSelectedGPSRequestIds = newSelectedGPSRequestIds.concat(selectedGPSRequestIds, id);
    } else if (selectedIndex === 0) {
      newSelectedGPSRequestIds = newSelectedGPSRequestIds.concat(selectedGPSRequestIds.slice(1));
    } else if (selectedIndex === selectedGPSRequestIds.length - 1) {
      newSelectedGPSRequestIds = newSelectedGPSRequestIds.concat(
        selectedGPSRequestIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedGPSRequestIds = newSelectedGPSRequestIds.concat(
        selectedGPSRequestIds.slice(0, selectedIndex),
        selectedGPSRequestIds.slice(selectedIndex + 1)
      );
    }

    setSelectedGPSRequestIds(newSelectedGPSRequestIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    Router.push(`/gpsRequests?_page=${newPage + 1}&_limit=${limit}`);
  };

  ///handle click gps request

  const handleClickGPSRequest = async (gpsRequest) => {
    //get ret
    const originAddressResult = await geocodeByAddress(gpsRequest.origin);
    const destinationAddressResult = await geocodeByAddress(gpsRequest.destination);
    //get coors
    const originLatLng = await getLatLng(originAddressResult[0]);
    const destinationLatLng = await getLatLng(destinationAddressResult[0]);
    setSelectedGPSRequest({
      id: gpsRequest.id,
      customerName: gpsRequest.customerName,
      phoneNumber: gpsRequest.phoneNumber,
      origin: {
        description: gpsRequest.origin,
        coordinates: {
          ...originLatLng,
        },
      },

      destination: {
        description: gpsRequest.destination,
        coordinates: {
          ...destinationLatLng,
        },
      },
    });
    setOpenGPSModal(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedGPSRequestIds.length === gpsRequests.length}
                  color="primary"
                  indeterminate={
                    selectedGPSRequestIds.length > 0 &&
                    selectedGPSRequestIds.length < gpsRequests.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gpsRequests.slice(0, limit).map((gpsRequest) => (
              <TableRow
                hover
                key={gpsRequest.id}
                selected={selectedGPSRequestIds.indexOf(gpsRequest.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedGPSRequestIds.indexOf(gpsRequest.id) !== -1}
                    onChange={(event) => handleSelectOne(event, gpsRequest.id)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography color="textPrimary" variant="body1">
                      {gpsRequest.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{gpsRequest.customerName}</TableCell>
                <TableCell>{gpsRequest.phoneNumber}</TableCell>
                <TableCell>{gpsRequest.origin}</TableCell>
                <TableCell>{gpsRequest.destination}</TableCell>
                <TableCell>{format(gpsRequest.requestTime, "dd/MM/yyyy")}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      await handleClickGPSRequest(gpsRequest);
                    }}
                  >
                    Handle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={10}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Card>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Card>
    </>
  );
};

GPSRequestListResults.propTypes = {
  gpsRequests: PropTypes.array.isRequired,
};
