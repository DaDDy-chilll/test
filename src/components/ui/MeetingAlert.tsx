import { jp } from "@/lang/jp";
import React from "react";
import moment from "moment";

type MeetingAlertProps = {
  onclick: () => void;
  isMeetingEnded?: boolean;
  meetingData?: any;
};

const MeetingAlert = ({
  onclick,
  isMeetingEnded,
  meetingData,
}: MeetingAlertProps) => {
  return (
    <div
      className={`${isMeetingEnded ? "bg-gray-500 text-gray-300" : "bg-primaryColor text-white hover:bg-primaryColor/90"} w-60  text-sm rounded-md shadow-md p-3 cursor-pointer `}
      onClick={onclick}
    >
      <span className="flex justify-between">
        <p>{jp.meetingDate}</p>
        <p>{meetingData?.date}</p>
      </span>
      <span className="flex justify-between">
        <p>{jp.meetingStartTime}</p>
        <p>{moment(meetingData?.start_time, "HH:mm").format("LT")}</p>
      </span>
      <span className="flex justify-between">
        <p>{jp.meetingEndTime}</p>
        <p>{moment(meetingData?.end_time, "HH:mm").format("LT")}</p>
      </span>
    </div>
  );
};

export default MeetingAlert;
