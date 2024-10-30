import { Event } from "@/types/helperTypes";
import DefaultUser from "@/assets/icons/default_user.svg";
import { useState } from "react";
import { jp } from "@/lang/jp";
type EventListItemProps = {
  event: Event;
  onClick?: () => void | null;
};

const EventListItem = ({ event, onClick }: EventListItemProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  return (
    <div
      className={`flex items-center gap-2 border-b border-gray-400  mx-5 px-2 py-3 hover:bg-gray-300 cursor-pointer transition-all duration-100 ${onClick ? "active:scale-90" : ""}`}
      onClick={onClick}
    >
      <img
        src={!event.user_photo || imageError ? DefaultUser : event.user_photo}
        alt="user"
        className="w-10 h-10 rounded-full"
        crossOrigin="anonymous"
        onError={handleImageError}
      />
      <div className="flex gap-1  justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-normal capitalize">{event.name}</h1>
          <p className="text-xs font-light">{event.job_title}</p>
        </div>
        <div className="flex flex-col justify-center items-end gap-1">
          <p className="text-xs font-light">
            {jp.start} : {event.start_time}
          </p>
          <p className="text-xs font-light">
            {jp.end} : {event.end_time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventListItem;
