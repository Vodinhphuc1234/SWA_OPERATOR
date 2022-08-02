import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { setCookies } from "cookies-next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "src/slices/navSlice";
import * as Yup from "yup";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logging, setLogging] = useState(false);

  //handle submit
  const onSubmit = (user) => {
    console.log(user);
    setLogging(true);
    setCookies("token", "authentication", { maxAge: 3000 });
    const action = setUser({
      isLoggedIn: true,
      role: user.password,
      user: {
        email: user.email,
      },
    });
    dispatch(action);
    console.log("this");

    window.location.href = "/"
    setLogging(false);
  };

  //yup validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Username is required").email("Email must be valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  // use form with yup
  const formOptions = { resolver: yupResolver(validationSchema) };
  //get function to buld form with react hook form.
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  console.log(errors);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                startIcon={<FacebookIcon />}
                size="large"
                variant="contained"
              >
                Login with Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                color="error"
                startIcon={<GoogleIcon />}
                size="large"
                variant="contained"
              >
                Login with Google
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              pb: 1,
              pt: 3,
            }}
          >
            <Typography align="center" color="textSecondary" variant="body1">
              or login with email address
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            {...register("email")}
            type="email"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            {...register("password")}
            type="password"
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <LoadingButton
              loading={logging}
              color="primary"
              disabled={formState.isSubmitting}
              fullWidth
              size="large"
              // type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Sign In Now
            </LoadingButton>
          </Box>
          <Typography color="textSecondary" variant="body2">
            Don&apos;t have an account?{" "}
            <NextLink href="/register">
              <Link
                to="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Link>
            </NextLink>
          </Typography>
          {/* </form> */}
        </Container>
      </Box>
    </>
  );
};

export default Login;
