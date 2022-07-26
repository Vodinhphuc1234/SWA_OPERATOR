import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
  AlertTitle,
} from "@mui/material";
import { format } from "date-fns";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Head from "next/head";
import { DashboardLayout } from "src/components/dashboard-layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const request = {
  id: 1,
  customerName: "John Wick",
  phoneNumber: "012346789",
  requestTime: 123456789965,
};
const lastestCalls = [
  {
    phoneNumber: "0123456799",
    time: "12345678",
  },
  {
    phoneNumber: "0123456799",
    time: "12345678",
  },
  {
    phoneNumber: "0123456799",
    time: "12345678",
  },
  {
    phoneNumber: "0123456799",
    time: "12345678",
  },
  {
    phoneNumber: "0123456799",
    time: "12345678",
  },
];

const mostAddresses = [
  {
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
    distance: "10 km",
  },
  {
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
    distance: "10 km",
  },
  {
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
    distance: "10 km",
  },
  {
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
    distance: "10 km",
  },
  {
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
    distance: "10 km",
  },
  {
    origin: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    destination: "227 Nguyen Van Cu, ward 5, District 5, Ho Chi Minh city",
    distance: "10 km",
  },
];

const RequestDetail = ({}) => {
  const onSubmit = (data) => {
    console.log(data);
  };
  // user react hook form

  //yup validation

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Customer Name must be required"),
    phoneNumber: Yup.string().required("Phone number must be required"),
    origin: Yup.string().required("Origin must be required"),
    destination: Yup.string().required("Destination must be required"),
  });

  //yup vs react hook form
  const formOptions = { resolver: yupResolver(validationSchema) };

  //react hooke impl
  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  console.log(errors);
  return (
    <>
      <Head>
        <title>Add request detail</title>
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
            Request detail
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                  <CardHeader
                    title="Request details"
                    subheader={`Request at: ${format(request.requestTime, "dd/MM/yyyy")}`}
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item lg={12} md={12} xs={12}>
                        {Object.keys(errors).length > 0 && (
                          <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>

                            {Object.keys(errors).map((key) => (
                              <Typography variant="p" component="div">
                                {errors[key].message}
                              </Typography>
                            ))}
                          </Alert>
                        )}
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <TextField
                          label="Customer Name"
                          fullWidth
                          name="customerName"
                          {...register("customerName")}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <TextField
                          label="Phone Number"
                          fullWidth
                          type="number"
                          name="phoneNumber"
                          {...register("phoneNumber")}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <TextField label="Origin" fullWidth name="origin" {...register("origin")} />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <TextField
                          label="Destination"
                          fullWidth
                          name="destination"
                          {...register("destination")}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />

                  <Box sx={{ display: "flex", justifyContent: "center", p: "10px" }}>
                    <Button type="submit" variant="contained">
                      Save request
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
            <Grid item lg={12} mt={10}>
              <Divider />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <Card>
                <CardHeader title="Latest Calls" />
                <Divider />
                <List>
                  {lastestCalls.map((call, i) => (
                    <ListItem divider={i < lastestCalls.length - 1} key={i}>
                      <ListItemText
                        primary={call.phoneNumber}
                        secondary={`Requested at ${format(1234, "dd/MM/yyyy")}`}
                      />
                      <Divider />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xl={9} xs={12}>
              <Card>
                <CardHeader title="Most Arrived Addresses" />
                <Divider />
                <List>
                  {mostAddresses.map((address, i) => (
                    <ListItem divider={i < mostAddresses.length - 1} key={i}>
                      <Grid container>
                        <Grid item lg={5} md={5} xs={12}>
                          <ListItemText
                            primary={address.origin}
                            secondary={`Distance: ${address.distance}`}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={2}
                          xs={12}
                          alignItems="center"
                          justifyContent="center"
                          display="flex"
                        >
                          <ArrowRightAltIcon size="large" />
                        </Grid>
                        <Grid item lg={5} md={5} xs={12}>
                          <ListItemText primary={address.destination} />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

RequestDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export const getStaticProps = async ({ params }) => {
//   const customer = await getUser({
//     params: {
//       id: params.id,
//     },
//   });

//   return {
//     props: { customer },
//   };
// };

// export const getStaticPaths = async () => {
//   const users = await getAllUsers();

//   let Paths = users.data.map((user) => ({
//     params: {
//       id: user.id.toString(),
//     },
//   }));

//   return {
//     paths: [...Paths],
//     fallback: true,
//   };
// };

export default RequestDetail;
