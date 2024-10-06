import { Event } from "@/types/helperTypes";


type EventListItemProps = {
  event: Event;
};

const EventListItem = ({ event }: EventListItemProps) => {
  console.log("event",event)
  return (
    <div className="flex  gap-1 border-b border-gray-400  mx-5 p-2">
      <img src={event.user_photo} alt="user" className="w-10 h-10 rounded-full" crossOrigin="anonymous" />
      <div className="flex gap-1 justify-between w-full">
        <div className="flex flex-col gap-1">
        <h1 className="text-sm font-normal capitalize">{event.name}</h1>
        <p className="text-xs font-light">{event.job_title}</p>
        </div>
        <div className="flex flex-col justify-center items-end gap-1">
          <p className="text-xs font-light">start : {event.start_time}</p>
          <p className="text-xs font-light">end : {event.end_time}</p>
        </div>


      </div>
    </div>
  );
};

export default EventListItem;
