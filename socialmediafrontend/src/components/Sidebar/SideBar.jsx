import React, { useState, useSyncExternalStore } from "react";
import { navigationMenu } from "./SidebarNavigation";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth } = useSelector(store=>store) 
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("hello");
    
  };
  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      const userId = auth.user?.userId;
      if (userId) {
        navigate(`/profile/${userId}`);
      } else {
        console.error("User ID is undefined.");
      }
    } else {
      navigate(item.path);
    }
  };
  
  const handleProfile = () => {
    const userId = auth.user?.userId;
    if(userId){
      navigate(`/profile/${userId}`);
    }
  }
  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div>
          <span className="logo font-bold text-xl">SocialMedia</span>
        </div>
        <div className="space-y-8">
          {navigationMenu.map((item, index) => (
            <div
              key={index}
              onClick={()=>handleNavigate(item)}
              className="flex space-x-3 cursor-pointer"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src="" />
            <div>
              <p className="font-bold">{auth.user?.firstName +" "+ auth.user?.lastName}</p>
              <p className="opacity-70">@{auth.user?.firstName.toLowerCase() +"_"+ auth.user?.lastName.toLowerCase()}</p>
            </div>
          </div>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon/>
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default SideBar;
