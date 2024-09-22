import React from 'react';
import { Chat } from '@/screens/ChatScreen';

interface ChatItemProps {
  chat: Chat;
  onSelect: (chat: Chat) => void;
  isActive: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onSelect, isActive }) => {
  const handleClick = () => {
    onSelect(chat);
  };

  return (
    <div
      className={`flex items-center gap-3 mx-2 py-2 border-b  border-gray-300 cursor-pointer overflow-hidden`}
      onClick={handleClick}
    >
        <div  className='w-10 h-10 rounded-full overflow-hidden'>
      <img src={chat.jobfinder_profile_image} alt="Profile" width='100%' />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-bold text-sm'>{chat.jobfinder_name?? "unknown"}</p>
        {chat.last_message !==""&& (
          <p className={`text-xs  font-light ${isActive ? 'text-white' : 'text-primaryColor'}`}>{chat.last_message}</p>
        )}
        <p className="text-xs text-gray-400">
          {chat.last_message_timestamp.toDate().toLocaleString()}
        </p>
      </div>
   
    </div>
  );
};

export default ChatItem;