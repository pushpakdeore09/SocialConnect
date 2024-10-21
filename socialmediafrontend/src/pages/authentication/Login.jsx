import { Button, TextField } from "@mui/material";
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
    navigate("/register")
  }
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
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="space-y-5">
            <div>
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
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
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
                component={"div"}
                className="text-red-500"
              />
            </div>
            <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        </Form>
      </Formik>
      <div className="flex gap-2 justify-center items-center pt-5">
        <p>Dont't have an account?</p>
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </>
  );
};

export default Login;
