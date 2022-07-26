import { Card } from "@mui/material";
import { GridToolbar, useGridApiRef } from "@mui/x-data-grid";

import StripedDataGrid from "./StripedDataGrid";

const CustomizedTable = ({ rows, columns }) => {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold"
        },
      }}
    >
      <StripedDataGrid
        showCellRightBorder
        showColumnRightBorder
        scrollbarSize={0.2}
        sx={{
          // boxShadow: 2,
          // border: 1,
          // borderColor: "lightgray",
          // borderRadius: 0
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        rows={rows}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
      />
    </Card>
  );
};

export default CustomizedTable;
