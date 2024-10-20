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
        className="bg-gray-500 text-sm text-white px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-gray-400"
        onClick={handleAppointmentModel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
        {jp.interviewSchedule}
      </button>
    </div>
  );
};

export default ChatHeader;
