import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Router from "next/router";
import { useEffect } from "react/cjs/react.development";

export const ListTrips = ({ trips, onClick, ...rest }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    Router.push(`/trip/upcoming?_page=${newPage + 1}&_limit=${limit}`);
  };

  const handleClickTrip = (trip) => {
    onClick(trip);
    console.log(trip);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trips.slice(0, limit).map((trip) => (
                <TableRow
                  hover
                  key={trip.id}
                  onClick={() =>
                    handleClickTrip({
                      fromLocation: {
                        ...trip.fromLocation,
                      },
                      toLocation: {
                        ...trip.toLocation,
                      },
                    })
                  }
                >
                  <TableCell>{trip.driver}</TableCell>
                  <TableCell>{trip.customer}</TableCell>
                  <TableCell>{trip.from}</TableCell>
                  <TableCell>{trip.to}</TableCell>
                  <TableCell>{trip.status == 0 ? "Waiting" : "Running"}</TableCell>
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

ListTrips.propTypes = {
  trips: PropTypes.array.isRequired,
};
