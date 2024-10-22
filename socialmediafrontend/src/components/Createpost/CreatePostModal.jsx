import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { uploadToCloudinary } from "../../utils/UploadToCloudniry";
import { useDispatch } from "react-redux";
import { createCommentAction, createPostAction } from "../../redux/post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "0.6rem",
  outline: "none",
};

export const CreatePostModal = ({ open, handleClose }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");

    if (imageUrl) {
      console.log("ImageURL", imageUrl);

      setSelectedImage(imageUrl);
      formik.setFieldValue("image", imageUrl);
    } else {
      console.error("Failed to upload image");
    }

    setIsLoading(false);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");

    if (videoUrl) {
      setSelectedVideo(videoUrl);
      formik.setFieldValue("video", videoUrl);
    } else {
      console.error("Failed to upload video");
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      dispatch(createPostAction(values));
    },
  });
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar />
              <div>
                <p className="font-bold text-lg">Social Media</p>
                <p className="text-sm">@socialmedia</p>
              </div>
            </div>

            <textarea
              className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-md"
              name="caption"
              placeholder="Write caption"
              rows="4"
              value={formik.values.caption}
              onChange={formik.handleChange}
            ></textarea>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input">
                  <IconButton color="primary">
                    <VideoCallIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>

            {selectedImage && (
              <div>
                <img src={selectedImage} className="h-[10rem]" alt="" />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                sx={{ borderRadius: "1.5rem" }}
                variant="contained"
                type="submit"
              >
                Post
              </Button>
            </div>
          </div>
        </form>

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};
