import { Box, Grid, Typography } from "@mui/material";

const ToastCustomize = ({ title, content }) => {
  return (
    <Box p={2}>
      <Grid container>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h6" color={"black"} component="div">
            {title}
          </Typography>
          <Typography variant="p" component="div">
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToastCustomize;
