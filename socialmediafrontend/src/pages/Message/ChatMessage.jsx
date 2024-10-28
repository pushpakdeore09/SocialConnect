import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ item }) => {
  const { auth } = useSelector((store) => store);

  if (!auth?.user || !item?.user) {
    return <p></p>; 
  }

  const isRegUserMessage = auth.user?.userId === item.user?.userId;
  console.log("regster user id", auth.user?.userId);
  console.log("message user id", item.user?.userId);
  

  return (
    <div
      className={`flex ${isRegUserMessage ? "justify-end" : "justify-start"} text-white`}
    >
      <div
        className={`p-1 ${item.image ? "rounded-md" : "px-5 rounded-full"} bg-[#191c26]`}
      >
        {item.image && (
          <img
            className="w-[12rem] h-[17rem] object-cover rounded-md"
            src={item.image}
            alt="Chat Attachment"
          />
        )}
        <p className="py-2">{item.content}</p>
        <span className="text-sm text-gray-400">
          {isRegUserMessage ? "This is your message" : "This is another user's message"}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
