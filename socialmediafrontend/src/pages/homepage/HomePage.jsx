import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import MiddlePart from "../../components/Middlepart/MiddlePart";
import Reels from "../../components/Reels/Reels";
import CreateReels from "../../components/Reels/CreateReels";
import Profile from "../../components/Profile/Profile";
import HomeRight from "../../components/Homeright/HomeRight";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/auth/auth.action";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)

  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[])
  return (
    <Grid container spacing={0}>
      <Grid item xs={0} lg={3}>
        <div className="sticky top-0">
          <SideBar />
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        lg={location.pathname === "/" ? 6 : 9}
        className="px-5 flex justify-center"
      >
        <Routes>
          <Route path="/" element={<MiddlePart />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/create-reels" element={<CreateReels />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Grid>

      {location.pathname==="/" && <Grid item xs={12} lg={3} className="relative">
        <div className="sticky top-0 w-full">
          <HomeRight />
        </div>
      </Grid>}
    </Grid>
  );
};

export default HomePage;
