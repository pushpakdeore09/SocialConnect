import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../Post/PostCard";
import UserReelsCard from "../Reels/UserReelsCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getUsersPostAction } from "../../redux/post/post.action";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
//const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPost = [1, 1, 1, 1];

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { auth } = useSelector((store) => store);
  console.log(auth);

  useEffect(() => {
    const getUsersPost = async () => {
      try {
        const data = getUsersPostAction(auth.user.userId);

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const firstName = auth.user.firstName || "Guest";
  const lastName = auth.user.lastName || "";
  const fullName = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;

  const [value, setValue] = React.useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!auth.user || auth.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Card className="py-10 w-[70%]">
        <div className="rounded-md">
          <div className="h-[15rem]">
            <img
              className="w-full h-full rounded-t-md"
              src="https://cdn.pixabay.com/photo/2024/07/13/22/31/road-8893160_640.jpg"
              alt=""
            />
          </div>
          <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
            <Avatar
              className="transform -translate-y-24"
              sx={{ width: "10rem", height: "10rem" }}
              src="https://cdn.pixabay.com/photo/2023/09/21/01/20/sugar-blader-8265868_640.jpg"
            />

            <Button
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              onClick={handleOpenProfileModal}
            >
              Edit Profile
            </Button>
          </div>
          <div className="p-5">
            <div>
              <h1 className="py-1 font-bold text-xl">{fullName}</h1>
              <p>@{username}</p>
            </div>
            <div className="flex gap-5 items-center py-3">
              <span>
                {auth.user?.posts != null ? auth.user.posts : 0} posts
              </span>
              <span>
                {auth.user?.followers != null ? auth.user.followers : 0}{" "}
                followers
              </span>
              <span>
                {auth.user?.followings != null ? auth.user.followings : 0}{" "}
                followings
              </span>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, adipisci ipsa.
              </p>
            </div>
          </div>
          <section>
            <Box
              sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
                {tabs.map((item, index) => (
                  <Tab key={index} value={item.value} label={item.name} />
                ))}
              </Tabs>
            </Box>
            <div className="flex justify-center">
              {value === "post" ? (
                <div className="space-y-5 w-[70%] my-10">
                  {posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">
                      No posts yet.
                    </div>
                  ) : (
                    posts.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-md border-slate-100"
                      >
                        <PostCard item={item} />
                      </div>
                    ))
                  )}
                </div>
              ) : value === "reels" ? (
                <div className="flex flex-wrap justify-center gap-2 my-10">
                  {reels.map((item, index) => (
                    <UserReelsCard key={index} />
                  ))}
                </div>
              ) : value === "saved" ? (
                <div className="space-y-5 w-[70%] my-10">
                  {posts.map((item, index) => (
                    <div className="border rounded-md border-slate-100">
                      <PostCard item={item} key={index} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>Repost</div>
              )}
            </div>
          </section>
        </div>
        <section>
          <ProfileModal open={open} handleClose={handleClose}></ProfileModal>
        </section>
      </Card>
    </div>
  );
};

export default Profile;
