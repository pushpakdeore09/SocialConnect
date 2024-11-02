import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/Searchuser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../redux/message/message.action";
import { uploadToCloudinary } from "../../utils/UploadToCloudniry";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  useEffect(() => {
    setMessages([...messages, message.message]);
  }, [message.message]);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
  }, []);

  const onConnect = (frame) => {
    console.log("WebSocket connected", frame);
    if (currentChat) {
        stompClient.subscribe(`/user/${currentChat.chatId}/private`, onMessageReceive);
        console.log(`Subscribed to chat ID: ${currentChat.chatId}`);
    } else {
        console.warn("Current chat is undefined. Cannot subscribe.");
    }
};



  const onError = (error) => {
    console.log("Error connecting to WebSocket", error);
  };

  useEffect(() => {
    if (stompClient && currentChat) {
      const subscription = stompClient.subscribe(`/user/${currentChat.chatId}/private`, onMessageReceive);
      console.log(`Subscribed to chat ID: ${currentChat.chatId}`);
      
      return () => {
        console.log(`Unsubscribing from chat ID: ${currentChat.chatId}`);
        subscription.unsubscribe();
      };
    }
  }, [stompClient, currentChat]);
  

  const onMessageReceive = (newMessage) => {
    console.log("Raw message received:", newMessage); 
    console.log("Message content:", newMessage.body); 
    try {
      const messageData = JSON.parse(newMessage.body); 
      console.log("Parsed message data:", messageData); 
      setMessages((prevMessages) => [...prevMessages, messageData]); 
    } catch (error) {
      console.error("Error parsing message:", error); 
    }
  };
  

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      console.log("Sending message:", newMessage);
      stompClient.send(`/app/chat/${currentChat?.chatId.toString()}`, {}, JSON.stringify(newMessage));
    }
  };
  

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imageUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imageUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    if (!value) return;

    const message = {
      chatId: currentChat.chatId,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }));
  };

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <SearchUser />
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => (
                    <div
                      key={item.chatId}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages || []);
                        console.log("Selected chat:", item);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=600" />
                  <p>
                    {auth.user.userId === currentChat.users[0].userId
                      ? `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`
                      : `${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages.length > 0 ? (
                  messages.map((item, index) => (
                    <ChatMessage key={index} item={item} />
                  ))
                ) : (
                  <p className="text-center">No messages yet</p>
                )}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="py-5 flex justify-center items-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleCreateMessage(e.target.value);
                        e.target.value = ""; // Clear the input field
                      }
                    }}
                    className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                    placeholder="Send Message"
                    type="text"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input" className="cursor-pointer">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No Chats Selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
