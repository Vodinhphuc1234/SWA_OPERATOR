import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import getAllUsers from "src/api/getAllUser";
import { getUser } from "src/api/getUser";
import { AccountProfile } from "src/components/account/account-profile";
import { AccountProfileDetails } from "src/components/account/account-profile-details";
import { DashboardLayout } from "src/components/dashboard-layout";
import { LatestOrders } from "src/components/dashboard/latest-orders";
import { LatestProducts } from "src/components/dashboard/latest-products";

const CustomerDetail = ({ customer }) => {
  return (
    <>
      <Head>
        <title>Customer detail</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
            <Grid item lg={12} mt={10}>
              <Divider />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

CustomerDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getStaticProps = async ({ params }) => {
  const customer = await getUser({
    params: {
      id: params.id,
    },
  });

  return {
    props: { customer },
  };
};

export const getStaticPaths = async () => {
  const users = await getAllUsers();

  let Paths = users.data.map((user) => ({
    params: {
      id: user.id.toString(),
    },
  }));

  return {
    paths: [...Paths],
    fallback: true,
  };
};

export default CustomerDetail;
