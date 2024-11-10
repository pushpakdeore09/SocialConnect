import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerAction } from "../../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name required"),
  lastName: Yup.string().required("Last Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .required("Password required"),
  
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    try {
      console.log("Submitted values:", values); 

    dispatch(registerAction({ data: values }))
      
    navigate("/login", { replace: true });
      
      
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="space-y-5">
              <div>
                <Field
                  as={TextField}
                  name="firstName"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component={"div"}
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  name="lastName"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component={"div"}
                  className="text-red-500"
                />
              </div>
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
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex gap-2 justify-center items-center pt-5">
        <p>Already have an account?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  );
};

export default Register;
