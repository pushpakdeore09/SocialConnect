import { useLocation, useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Grid container key={location.pathname}>
        <Grid className="h-screen overflow-hidden" item xs={7}>
          <img
            className="h-full w-full"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSJ7H3d6qOi1q836rW1jE4S1hp7WH64SEqftgE9gE5pxzYtODC-"
            alt=""
          />
        </Grid>
        <Grid item xs={5}>
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="card p-8">
              <div className="flex flex-col items-center mb-5 space-y-1 ">
                <h1 className="logo text-center">SocialConnect</h1>
                <p className="text-center text-sm w-[70]">
                  Connecting lives, Sharing stories, and Posting posts
                </p>
              </div>
              <Register/>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
