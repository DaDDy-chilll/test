import React from "react";
import { Chat, Message } from "@/types/helperTypes";
import { User } from "@/types/helperTypes";
import MessageItem from "./MessageItem";

type ChatViewProps = {
  messages: Message[];
  user: User | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  selectedChat: Chat;
};

const ChatView = ({
  messages,
  user,
  messagesEndRef,
  selectedChat,
}: ChatViewProps) => {
  return (
    <div className="overflow-y-auto px-3">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          currentUser={{ id: !!user?.id ? user?.id : null }}
          messagesEndRef={messagesEndRef}
          selectedChat={selectedChat}
        />
      ))}
    </div>
  );
};

export default ChatView;
