import React from "react";
import { Message } from "@/types/helperTypes";

interface MessageItemProps {
  message: Message;
  currentUser: { id: number | null };
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, currentUser, messagesEndRef }) => {
  const isCurrentUser = currentUser.id === message.sender_id;

  return (
    <div className={`flex  mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`} ref={messagesEndRef}>
      <div className={`px-3 py-2  rounded-full ${isCurrentUser ? 'bg-primaryColor text-white' :'bg-gray-200'}`}>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;