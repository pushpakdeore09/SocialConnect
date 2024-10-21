import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import { CreatePostModal } from "../Createpost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../redux/post/post.action";

const story = [1, 1, 1, 1, 1, 1];
const posts = [1, 1, 1, 1, 1, 1, 1];
const MiddlePart = () => {
  const dispatch = useDispatch();
  const {post} = useSelector(store=>store)
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true);
  };

  useEffect(()=>{
    dispatch(getAllPostAction());
  },[dispatch])

  return (
    <div className="px-20">
      <section className="flex items-center rounded-b-md p-5">
        <div
          className="flex
          flex-col
          items-center
          mr-4
          cursor-pointer"
        >
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item, index) => (
          <StoryCircle key={index} />
        ))}
      </section>

      <section>
        <Card className="p-5 mt-5">
          <div className="flex justify-between">
            <Avatar></Avatar>
            <input
              onClick={handleOpenCreatePostModel}
              readOnly
              type="text"
              className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3d4054] border"
            />
          </div>
          <div className="flex justify-center space-x-9 mt-5">
            <div className="flex items-center">
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <ImageIcon />
              </IconButton>
              <span>media</span>
            </div>
            <div className="flex items-center">
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <VideocamIcon />
              </IconButton>
              <span>video</span>
            </div>
            <div className="flex items-center">
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <ArticleIcon />
              </IconButton>
              <span>Write Article</span>
            </div>
          </div>
        </Card>
        <div className="mt-5 space-y-5">
          {post.posts.map((item, index) => (
            <PostCard key={index} item={item}/>
          ))}
        </div>
      </section>
      <div>
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
