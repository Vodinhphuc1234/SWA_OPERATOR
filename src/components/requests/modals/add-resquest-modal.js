import { yupResolver } from "@hookform/resolvers/yup";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DoNotDisturbOnSharpIcon from "@mui/icons-material/DoNotDisturbOnSharp";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import addTrip from "src/api/trip/addTrip";
import * as Yup from "yup";

const mostAddresses = [
  {
    address: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    distance: "10km",
  },
  {
    address: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    distance: "10km",
  },
  {
    address: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    distance: "10km",
  },
  {
    address: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    distance: "10km",
  },
  {
    address: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    distance: "10km",
  },
];

const AddRequestModal = ({ openModal, handleCloseModal, phoneNumber, ...rest }) => {
  //yup validation
  const validationSchema = Yup.object().shape({
    rider_name: Yup.string().required("* Customer Name is required"),
    rider_email: Yup.string().required("* Email is required").email("Email is invalid"),
    rider_phone_number: Yup.string()
      .required("* Phone Number is required")
      .length(10, "Length of phonenumber is 10"),
    pick_up_address_line: Yup.string().required("Origin is required"),
    drop_off_address_line: Yup.string().required("Destination is required"),
    car_type: Yup.string().required("* Car Type is re quired"),
    payment_method: Yup.string().required("* Payment method is re quired"),
    note: Yup.string().required("* Note method is re quired"),
  });

  //yup validation with for
  const formOptions = { resolver: yupResolver(validationSchema), mode: "onchange" };

  //user form;
  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  //state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  //submit
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const ret = await addTrip({
      ...data,
      rider_phone_number: data.rider_phone_number.replace("0", "+84"),
    });
    setLoading(false);
    if (ret == null) {
      setMessage("Check your network connection.");
    } else {
      if (ret?.data?.message) {
        setMessage(ret.data.message);
      } else {
        handleCloseModal();
      }
    }
  };
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50%",
            height: "fit-content",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
            paddingY: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "evenly",
              px: "10px",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", flexGrow: 1 }}>
              Add Request
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <DoNotDisturbOnSharpIcon />
            </IconButton>
          </Box>

          <Divider sx={{ marginY: "10px" }} />

          <Box
            sx={{
              px: 3,
              py: 1,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} xs={12}>
                  {errors["rider_name"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["rider_name"].message}
                    </Typography>
                  )}
                  <TextField
                    label="Customer name"
                    fullWidth
                    sx={{
                      mb: "20px",
                    }}
                    name="rider_name"
                    {...register("rider_name")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} xs={12}>
                  {errors["rider_email"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["rider_email"].message}
                    </Typography>
                  )}
                  <TextField
                    label="Email"
                    fullWidth
                    sx={{
                      mb: "20px",
                    }}
                    name="rider_email"
                    {...register("rider_email")}
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  {errors["rider_phone_number"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["rider_phone_number"].message}
                    </Typography>
                  )}
                  <TextField
                    defaultValue={phoneNumber}
                    label="Phone number"
                    fullWidth
                    name="rider_phone_number"
                    {...register("rider_phone_number")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} marginBottom={2}>
                <Grid item lg={6} md={6} xs={12}>
                  {errors["car_type"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["car_type"].message}
                    </Typography>
                  )}
                  <Select
                    label="Car Type"
                    name="car_type"
                    {...register("car_type")}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    placeholder="Car Type"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem selected value="four_seats">
                      4 seats
                    </MenuItem>
                    <MenuItem value="six_seats">6 seats</MenuItem>
                  </Select>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  {errors["payment_method"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["payment_method"].message}
                    </Typography>
                  )}
                  <Select
                    label="Payment Method"
                    name="payment_method"
                    {...register("payment_method")}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    placeholder="Payment Method"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem selected value="cash">
                      Cash
                    </MenuItem>
                    <MenuItem value="momo">Momo</MenuItem>
                    <MenuItem value="payoo">Payoo</MenuItem>
                    <MenuItem value="visa">Visa</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item lg={6} md={6} xs={12}>
                  {errors["pick_up_address_line"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["pick_up_address_line"].message}
                    </Typography>
                  )}
                  <TextField
                    label="Origin"
                    fullWidth
                    sx={{
                      mb: "20px",
                    }}
                    name="pick_up_address_line"
                    {...register("pick_up_address_line")}
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  {errors["drop_off_address_line"] && (
                    <Typography sx={{ fontSize: 12 }} color="red">
                      {errors["drop_off_address_line"].message}
                    </Typography>
                  )}
                  <TextField
                    label="Destination"
                    fullWidth
                    name="drop_off_address_line"
                    {...register("drop_off_address_line")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                {errors["note"] && (
                  <Typography sx={{ fontSize: 12 }} color="red">
                    {errors["note"].message}
                  </Typography>
                )}
                <TextField
                  label="Note"
                  fullWidth
                  sx={{
                    mb: "20px",
                  }}
                  name="Note"
                  {...register("note")}
                />
              </Grid>
              <Divider />

              <Grid container spacing={1}>
                <Grid item lg={12} md={12} xs={12}>
                  <Card>
                    <List>
                      {mostAddresses.map((item, i) => (
                        <ListItem divider={i < mostAddresses.length - 1} key={i}>
                          <ListItemText
                            primary={item.address}
                            secondary={`Distance: ${item.distance}`}
                          />
                          <ListItemIcon>
                            <IconButton>
                              <AddLocationIcon />
                            </IconButton>
                          </ListItemIcon>
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box mt={1}>
              <LoadingButton
                disabled={loading}
                loading={loading}
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Add Request
              </LoadingButton>

              {message && (
                <Typography sx={{ marginTop: 2 }} textAlign="center" color="red">
                  {message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AddRequestModal;
