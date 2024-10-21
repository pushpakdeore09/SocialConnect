import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../../redux/auth/auth.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 4,
};

const ProfileModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
    },
  });
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img className="w-full h-full rounded-t-md" src="https://cdn.pixabay.com/photo/2024/07/13/22/31/road-8893160_640.jpg" alt="" />
              </div>
              <div className="pl-5">
              <Avatar
                className="transform -translate-y-24"
                sx={{ width: "10rem", height: "10rem" }}
                src="https://cdn.pixabay.com/photo/2023/09/21/01/20/sugar-blader-8265868_640.jpg"
              />
            </div>
            </div>
            <div className="space-y-3">
                <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                />
                <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
