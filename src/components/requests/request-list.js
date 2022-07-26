import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
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
import { getInitials } from "../../utils/get-initials";
import Router from "next/router";
import Link from "next/link";

export const RequestListResults = ({ requests, ...rest }) => {
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedRequestIds;

    if (event.target.checked) {
      newSelectedRequestIds = requests.map((request) => request.id);
    } else {
      newSelectedRequestIds = [];
    }

    setSelectedRequestIds(newSelectedRequestIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRequestIds.indexOf(id);
    let newSelectedRequestIds = [];

    if (selectedIndex === -1) {
      newSelectedRequestIds = newSelectedRequestIds.concat(selectedRequestIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRequestIds = newSelectedRequestIds.concat(selectedRequestIds.slice(1));
    } else if (selectedIndex === selectedRequestIds.length - 1) {
      newSelectedRequestIds = newSelectedRequestIds.concat(selectedRequestIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRequestIds = newSelectedRequestIds.concat(
        selectedRequestIds.slice(0, selectedIndex),
        selectedRequestIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRequestIds(newSelectedRequestIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    Router.push(`/requests?_page=${newPage + 1}&_limit=${limit}`);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRequestIds.length === requests.length}
                    color="primary"
                    indeterminate={
                      selectedRequestIds.length > 0 && selectedRequestIds.length < requests.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Request ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Phne Number</TableCell>
                <TableCell>Time Request</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.slice(0, limit).map((request) => (
                <TableRow
                  hover
                  key={request.id}
                  selected={selectedRequestIds.indexOf(request.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRequestIds.indexOf(request.id) !== -1}
                      onChange={(event) => handleSelectOne(event, request.id)}
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
                        {request.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{request.customerName}</TableCell>
                  <TableCell>{request.phoneNumber}</TableCell>
                  <TableCell>{format(request.requestTime, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Link href={`request/${request.id}`}>
                      <Button variant="contained" color="primary">
                        Handle
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={10}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RequestListResults.propTypes = {
  requests: PropTypes.array.isRequired,
};
