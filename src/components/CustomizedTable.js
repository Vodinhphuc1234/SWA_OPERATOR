import { Card } from "@mui/material";
import { GridToolbar, useGridApiRef } from "@mui/x-data-grid";

import StripedDataGrid from "./StripedDataGrid";

const CustomizedTable = ({ rows, columns, paging, setPaging, totalItem }) => {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
        },
      }}
    >
      <StripedDataGrid
        showCellRightBorder
        showColumnRightBorder
        scrollbarSize={0.2}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        rows={rows}
        page={paging.offset}
        onPageChange={(value) => {
          setPaging((prev) => {
            return {
              ...prev,
              offset: value,
            };
          });
        }}
        onPageSizeChange={(value) => {
          setPaging((prev) => {
            return {
              ...prev,
              limit: value,
            };
          });
        }}
        rowCount={totalItem}
        pageSize={paging.limit}
        paginationMode="server"
        rowsPerPageOptions={[1, 5, 10, 15, 20, 50, 100]}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
      />
    </Card>
  );
};

export default CustomizedTable;
