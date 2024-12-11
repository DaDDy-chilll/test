import React from "react";
import { Message, Chat } from "@/types/helperTypes";
import moment from "moment";
import DefaultUser from "@/assets/icons/default_user.svg";

interface MessageItemProps {
  message: Message;
  currentUser: { id: number | string | null };
  messagesEndRef: React.RefObject<HTMLDivElement>;
  selectedChat: Chat;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  currentUser,
  messagesEndRef,
  selectedChat,
}) => {
  const isCurrentUser = Number(`2${currentUser.id}`) === message.sender_id;
  const profileImage = `${import.meta.env.VITE_SERVER_URL}/file/photo/${selectedChat.jobfinder_profile_image}`;

  return (
    <div
      className={`flex 96  mb-3 items-center gap-2   ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
      ref={messagesEndRef}
    >
      {!isCurrentUser && (
        <img
          src={
            selectedChat.jobfinder_profile_image ? profileImage : DefaultUser
          }
          crossOrigin="anonymous"
          alt=""
          className="w-5 h-5 rounded-full"
        />
      )}

      <div
        className={`flex flex-col max-w-96 px-3 py-2  rounded-md ${
          isCurrentUser ? "bg-primaryColor text-white" : "bg-gray-200"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-[.7rem] text-gray-900 w-full ${isCurrentUser ? "text-end" : "text-start"} `}
        >
          {moment(message.timestamp.seconds * 1000).format("hh:mm A")}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
