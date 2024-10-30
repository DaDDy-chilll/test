import React from "react";
import { Chat } from "@/types/helperTypes";
import { jp } from "@/lang/jp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatItem from "./ChatItem";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
  refetch: () => void;
  isRefetching: boolean;
  isEnd: boolean | null;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  selectedChat,
  refetch,
  isRefetching,
  isEnd,
}) => {
  const { notification } = useSelector((state: RootState) => state.navigation);

  return (
    <div className="flex-1 ">
      <div
        tabIndex={0}
        className="flex flex-col h-[90vh]  p-3 overflow-y-auto border-4 border-gray-300 rounded-sm border-opacity-30 shadow-md"
      >
        {chats.length === 0 ? (
          <div className="text-center text-sm text-gray-500 my-64">
            {jp.noChatFound}
          </div>
        ) : (
          <>
            {chats.map((chat, index) => (
              <div
                key={index}
                onClick={() => onSelectChat(chat)}
                className={`border-b border-gray-300 ${
                  selectedChat?.id === chat.id ? "bg-gray-300" : ""
                } hover:bg-gray-200 transition-all duration-100 active:scale-90`}
              >
                <ChatItem
                  chat={chat}
                  onSelect={onSelectChat}
                  isActive={selectedChat?.id === chat.id}
                  unreadCount={notification[chat.id]}
                />
              </div>
            ))}
            {isRefetching && (
              <div className="text-center text-xs text-gray-500 mt-2">
                {jp.refetching}...
              </div>
            )}
            {!isEnd && (
              <div
                className="text-center text-xs text-blue-600 underline tracking-wider mt-2 cursor-pointer"
                onClick={refetch}
              >
                {jp.loadMoreChats}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatList;
