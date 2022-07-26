const {
  Modal,
  Box,
  Typography,
  TextField,
  Divider,
  IconButton,
  Button,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Select,
  MenuItem,
} = require("@mui/material");
import { yupResolver } from "@hookform/resolvers/yup";
import DoNotDisturbOnSharpIcon from "@mui/icons-material/DoNotDisturbOnSharp";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import AddLocationIcon from "@mui/icons-material/AddLocation";

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
  {
    address: "170 Bui Dinh Tuy, ward 12, Binh Thanh District, Ho Chi Minh city",
    distance: "10km",
  },
];

const AddRequestModal = ({ openModal, handleCloseModal, phoneNumber, ...rest }) => {
  //yup validation
  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Customer Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  //yup validation with for
  const formOptions = { resolver: yupResolver(validationSchema) };

  //user form;
  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  //submit
  const onSubmit = (data) => {
    console.log(data);
    data = null;
    handleCloseModal();
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
            <Select
              label="Type"
              name="type"
              
              {...register("type")}
              labelId="demo-select-small"
              id="demo-select-small"
            >
              <MenuItem value={1}>4 seats</MenuItem>
              <MenuItem value={2}>7 seats</MenuItem>
              <MenuItem value={3}>10 seats</MenuItem>
            </Select>
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
              }}
            >
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    label="Customer name"
                    fullWidth
                    sx={{
                      mb: "20px",
                    }}
                    name="customerName"
                    {...register("customerName")}
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    defaultValue={phoneNumber}
                    label="Phone number"
                    fullWidth
                    name="phoneNumber"
                    {...register("phoneNumber")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    label="Origin"
                    fullWidth
                    sx={{
                      mb: "20px",
                    }}
                    name="origin"
                    {...register("origin")}
                  />
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
              <Divider />

              <Typography variant="h6" textAlign="center">
                History
              </Typography>
              <Grid container spacing={1}>
                <Grid item lg={4} md={4} xs={12}>
                  <Card>
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
                <Grid item lg={8} md={8} xs={12}>
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
              <Button type="submit" variant="contained" fullWidth color="primary">
                Add Request
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AddRequestModal;
