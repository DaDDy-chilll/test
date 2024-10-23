import React from "react";
import { Chat } from "@/types/helperTypes";
import DefaultUser from "@/assets/icons/default_user.svg";
interface ChatItemProps {
  chat: Chat;
  onSelect: (chat: Chat) => void;
  isActive: boolean;
  unreadCount: number;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onSelect, unreadCount }) => {
  const profileImage = `https://api.japanjob.exbrainedu.com/v1/file/photo/${chat.jobfinder_profile_image}`;
  const handleClick = () => onSelect(chat);

  return (
    <div
      className={`flex items-center gap-3 mx-2 py-2 h-16 rounded-md cursor-pointer overflow-hidden`}
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={chat.jobfinder_profile_image ? profileImage : DefaultUser}
          alt={`${chat.jobfinder_name || "Unknown"}'s profile`}
          width="100%"
          height="100%"
          crossOrigin="anonymous"
        />
      </div>
      <div className="flex flex-col gap-1 w-4/5">
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm">
              {chat.jobfinder_name || "Unknown"}
            </p>
            {chat.last_message && (
              <p
                className={`text-xs ${
                  unreadCount > 0 ? "text-black font-bold" : "text-gray-500"
                }`}
              >
                {chat.last_message.length > 18
                  ? `${chat.last_message.slice(0, 15)}...`
                  : chat.last_message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end justify-center gap-2">
            <p className="text-xs text-gray-400">
              {chat.last_message_timestamp
                .toDate()
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            {unreadCount > 0 && (
              <div className=" rounded-full bg-primaryColor h-2 w-2"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
