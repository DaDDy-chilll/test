import React from "react";
import { Message, Chat } from "@/types/helperTypes";

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
  const profileImage = `https://api.japanjob.exbrainedu.com/v1/file/photo/${selectedChat.jobfinder_profile_image}`;

  return (
    <div
      className={`flex  mb-3 items-center gap-2   ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
      ref={messagesEndRef}
    >
      {!isCurrentUser && (
        <img src={profileImage} alt="" className="w-5 h-5 rounded-full" />
      )}

      <div
        className={`px-3 py-2  rounded-full ${
          isCurrentUser ? "bg-primaryColor text-white" : "bg-gray-200"
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;
