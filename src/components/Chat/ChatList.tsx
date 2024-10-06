import React from "react";
import { Chat } from "@/types/helperTypes";
import { jp } from "@/lang/jp";

import ChatItem from "./ChatItem";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
  unreadCounts: { [key: string]: number };
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  selectedChat,
  unreadCounts,
}) => {
  return (
    <div className="flex-1 ">
      <div className="flex flex-col h-[90vh]  p-6 overflow-y-auto border-4 border-gray-300 rounded-sm border-opacity-30 shadow-md">
        {chats.length === 0 ? (
          <div className="text-center text-sm text-gray-500 my-64">
            {jp.noChatFound}
          </div>
        ) : (
          chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => onSelectChat(chat)}
              className={`${
                selectedChat?.id === chat.id ? "bg-gray-300" : ""
              } hover:bg-gray-200 transition-all duration-100 active:scale-90`}
            >
              <ChatItem
                chat={chat}
                onSelect={onSelectChat}
                isActive={selectedChat?.id === chat.id}
                unreadCount={unreadCounts[chat.id]}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
