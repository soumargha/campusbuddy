import React, { useContext } from "react";
import { Video } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Menu } from 'lucide-react';

const Chat = ({isSidebarOpen,setIsSidebarOpen}) => {
  const { conversation } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
      <Menu className="cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
        <span>{conversation.user2?.displayName}</span>
        <div className="chatIcons">
          <Video />
          <UserRoundPlus />
          <MoreHorizontal />
        </div>
      </div>
      <Messages />
      {conversation.chatId==null ?  <></> : <Input/>}
      
    </div>
  );
};

export default Chat;