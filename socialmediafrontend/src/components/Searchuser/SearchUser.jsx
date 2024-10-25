import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../redux/auth/auth.action";
import { createChat } from "../../redux/message/message.action";

const SearchUser = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector(store=>store);
  const [username, setUsername] = useState("");
  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    dispatch(searchUser(username))
  };
  const handleClick = (userId) => {
    dispatch(createChat({userId: userId}));
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search User"
          onChange={handleSearchUser}
          type="text"
        />
        {username && (
        auth.searchUser.map((item, index) => <Card key={index} className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
        <CardHeader
          onClick={() => {
            handleClick(item.userId);
            setUsername("");
          }}
          avatar={
            <Avatar src="https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=600" />
          }
          title={item.firstName + " " + item.lastName}
          subheader={item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()}
        />
      </Card>)
      )}
      </div>
      
    </div>
  );
};

export default SearchUser;
