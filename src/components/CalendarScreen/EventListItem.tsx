import { Event } from "@/types/helperTypes";

type EventListItemProps = {
  event : Event
}   

const EventListItem = ({event} : EventListItemProps) => {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-400 pb-2 mx-5">
        <h1 className="text-base font-normal capitalize">{event.title}</h1>
        <p className="text-sm font-light">{event.description}</p>

    </div>
  )
}

export default EventListItem