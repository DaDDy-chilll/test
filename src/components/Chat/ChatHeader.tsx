import { Chat } from "@/types/helperTypes";
import { jp } from "@/lang/jp";
type ChatHeaderProps = {
  selectedChat: Chat | null;
  setIsAppointmentModelOpen: (isOpen: boolean) => void;
};

const ChatHeader = ({
  selectedChat,
  setIsAppointmentModelOpen,
}: ChatHeaderProps) => {
  const handleAppointmentModel = () => setIsAppointmentModelOpen(true);
  return (
    <div className="flex items-center justify-between w-full h-full px-4 py-3 border-4 border-gray-300 rounded-sm border-opacity-30 shadow-sm">
            <h1 className="text-normal font-bold">
              {selectedChat?.jobfinder_name}
            </h1>
            <button className="bg-gray-500 text-sm text-white px-3 py-2 rounded-md" onClick={handleAppointmentModel}>
              {jp.interviewSchedule}
            </button>
          </div>
  )
}

export default ChatHeader;
