import { Chat } from "@/types/helperTypes";
import { jp } from "@/lang/jp";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
type ChatHeaderProps = {
  selectedChat: Chat | null;
  setIsAppointmentModelOpen: (isOpen: boolean) => void;
};

const ChatHeader = ({
  selectedChat,
  setIsAppointmentModelOpen,
}: ChatHeaderProps) => {
  const navigate = useNavigate();
  const handleAppointmentModel = () => setIsAppointmentModelOpen(true);

  const handleProfileDetail = () => {
    navigate(RouteName.APPLICANTS, { state: selectedChat });
  };
  return (
    <div className="flex items-center justify-between w-full h-full px-4 py-3 border-4 border-gray-300 rounded-sm border-opacity-30 shadow-sm">
      <h1
        aria-label="チャット相手の名前"
        title={selectedChat?.jobfinder_name}
        className="text-normal font-bold flex items-center"
      >
        {selectedChat?.jobfinder_name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 ml-3 hover:text-primaryColor cursor-pointer"
          onClick={handleProfileDetail}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </h1>
      <button
        className="bg-gray-500 text-sm text-white px-3 py-2 rounded-md"
        onClick={handleAppointmentModel}
      >
        {jp.interviewSchedule}
      </button>
    </div>
  );
};

export default ChatHeader;
