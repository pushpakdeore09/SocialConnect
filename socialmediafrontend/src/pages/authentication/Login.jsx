import { Button, TextField, Grid, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginAction } from "../../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .required("Password required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (values) => {
    try {
      const response = dispatch(loginAction({ data: values }));

      if (response) {
        localStorage.setItem("jwt", response.token);
        navigate("/");
      } else {
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Left side image */}
      <Grid item xs={12} md={6}>
        <img
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSJ7H3d6qOi1q836rW1jE4S1hp7WH64SEqftgE9gE5pxzYtODC-"
          alt="Login illustration"
        />
      </Grid>

      {/* Right side form */}
      <Grid
        item
        xs={12}
        md={6}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          SocialConnect
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Connecting lives, Sharing stories, and Posting posts
        </Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: "80%" }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Field
                  as={TextField}
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </Grid>
              <Grid item>
                <Button
                  sx={{ padding: ".8rem 0" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Grid container justifyContent="center" alignItems="center" pt={2}>
          <Typography variant="body2">Don't have an account?</Typography>
          <Button onClick={handleRegister}>Register</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
