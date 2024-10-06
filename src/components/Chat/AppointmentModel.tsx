import { useState } from "react";
import Select from "../ui/Select";
import Calendar from "../ui/calendar";
import TimeSelect from "../ui/SelectTime";
import { Button } from "../ui/button";
import { jp } from "@/lang/jp";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Modal from "./Modal"
type AppointmentModelProps = {
  setIsAppointmentModelOpen: (isOpen: boolean) => void;
  userId:number;
  jobId:number;
};

const AppointmentModel = ({

  setIsAppointmentModelOpen,
  userId,
  jobId,
}: AppointmentModelProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startMeetingTime, setStartMeetingTime] = useState<string >("9:00");
  const [endMeetingTime, setEndMeetingTime] = useState<string >("9:00");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMeetingData, setCurrentMeetingData] = useState<MeetingData | null>(null);
  const handleCloseModel = () => setIsAppointmentModelOpen(false);
 const [validationData,setValidationData] = useState<any>(null);
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
 
  };

   interface MeetingData {
    user_id: number,
    job_id: number,
    date: string,
    start_time: string,
    end_time: string,
    initial: boolean
  }

  const {mutate:postMeeting }= useMutation({
    mutationFn: (data: MeetingData) => {
      return  fetchServer({
        endpoint: `${apiRoutes.INTERVIEW}`,
        method: "POST",
        token: token,
        body: data,
      });
    },
    onSuccess: (responseData) => {
    
      if(responseData.data){
        setValidationData(responseData.data);
          setShowConfirmModal(true);
      }else{
        handleCloseModel();
      }
    
    },
  
  });

  const handleMakeAppointment = (isInitial:boolean) => {
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    const mettingdata:MeetingData = {
      user_id: userId,
      job_id:jobId,
      date:formattedDate,
      start_time:startMeetingTime ,
      end_time: endMeetingTime,
      initial: isInitial,
    }
    setCurrentMeetingData(mettingdata);
    console.log(mettingdata);
    postMeeting(mettingdata);
  }
  const handleConfirmRewrite = () => {
    if (currentMeetingData) {
      postMeeting({ ...currentMeetingData, initial: false });
    }
    setShowConfirmModal(false);
  };

  return (
    <>
    <motion.div
      className="bg-white absolute w-80 top-0 right-0 h-[calc(100vh-65px)] overflow-y-auto p-3 shadow-[-10px_0px_20px_-10px_rgba(0,0,0,0.3)] rounded-l-md"
      variants={modalVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 13.166C9.69306 13.166 9.43576 13.0622 9.22813 12.8546C9.02049 12.6469 8.91667 12.3896 8.91667 12.0827C8.91667 11.7757 9.02049 11.5184 9.22813 11.3108C9.43576 11.1032 9.69306 10.9993 10 10.9993C10.3069 10.9993 10.5642 11.1032 10.7719 11.3108C10.9795 11.5184 11.0833 11.7757 11.0833 12.0827C11.0833 12.3896 10.9795 12.6469 10.7719 12.8546C10.5642 13.0622 10.3069 13.166 10 13.166ZM5.66667 13.166C5.35972 13.166 5.10243 13.0622 4.89479 12.8546C4.68715 12.6469 4.58333 12.3896 4.58333 12.0827C4.58333 11.7757 4.68715 11.5184 4.89479 11.3108C5.10243 11.1032 5.35972 10.9993 5.66667 10.9993C5.97361 10.9993 6.2309 11.1032 6.43854 11.3108C6.64618 11.5184 6.75 11.7757 6.75 12.0827C6.75 12.3896 6.64618 12.6469 6.43854 12.8546C6.2309 13.0622 5.97361 13.166 5.66667 13.166ZM14.3333 13.166C14.0264 13.166 13.7691 13.0622 13.5615 12.8546C13.3538 12.6469 13.25 12.3896 13.25 12.0827C13.25 11.7757 13.3538 11.5184 13.5615 11.3108C13.7691 11.1032 14.0264 10.9993 14.3333 10.9993C14.6403 10.9993 14.8976 11.1032 15.1052 11.3108C15.3128 11.5184 15.4167 11.7757 15.4167 12.0827C15.4167 12.3896 15.3128 12.6469 15.1052 12.8546C14.8976 13.0622 14.6403 13.166 14.3333 13.166ZM10 17.4993C9.69306 17.4993 9.43576 17.3955 9.22813 17.1879C9.02049 16.9803 8.91667 16.723 8.91667 16.416C8.91667 16.1091 9.02049 15.8518 9.22813 15.6441C9.43576 15.4365 9.69306 15.3327 10 15.3327C10.3069 15.3327 10.5642 15.4365 10.7719 15.6441C10.9795 15.8518 11.0833 16.1091 11.0833 16.416C11.0833 16.723 10.9795 16.9803 10.7719 17.1879C10.5642 17.3955 10.3069 17.4993 10 17.4993ZM5.66667 17.4993C5.35972 17.4993 5.10243 17.3955 4.89479 17.1879C4.68715 16.9803 4.58333 16.723 4.58333 16.416C4.58333 16.1091 4.68715 15.8518 4.89479 15.6441C5.10243 15.4365 5.35972 15.3327 5.66667 15.3327C5.97361 15.3327 6.2309 15.4365 6.43854 15.6441C6.64618 15.8518 6.75 16.1091 6.75 16.416C6.75 16.723 6.64618 16.9803 6.43854 17.1879C6.2309 17.3955 5.97361 17.4993 5.66667 17.4993ZM14.3333 17.4993C14.0264 17.4993 13.7691 17.3955 13.5615 17.1879C13.3538 16.9803 13.25 16.723 13.25 16.416C13.25 16.1091 13.3538 15.8518 13.5615 15.6441C13.7691 15.4365 14.0264 15.3327 14.3333 15.3327C14.6403 15.3327 14.8976 15.4365 15.1052 15.6441C15.3128 15.8518 15.4167 16.1091 15.4167 16.416C15.4167 16.723 15.3128 16.9803 15.1052 17.1879C14.8976 17.3955 14.6403 17.4993 14.3333 17.4993ZM2.41667 21.8327C1.82083 21.8327 1.31076 21.6205 0.886458 21.1962C0.462153 20.7719 0.25 20.2618 0.25 19.666V4.49935C0.25 3.90352 0.462153 3.39345 0.886458 2.96914C1.31076 2.54484 1.82083 2.33268 2.41667 2.33268H3.5V0.166016H5.66667V2.33268H14.3333V0.166016H16.5V2.33268H17.5833C18.1792 2.33268 18.6892 2.54484 19.1135 2.96914C19.5378 3.39345 19.75 3.90352 19.75 4.49935V19.666C19.75 20.2618 19.5378 20.7719 19.1135 21.1962C18.6892 21.6205 18.1792 21.8327 17.5833 21.8327H2.41667ZM2.41667 19.666H17.5833V8.83268H2.41667V19.666Z"
              fill="#211E1E"
            />
          </svg>
          <p>{jp.calendar}</p>
        </div>
        <Select
          style={1}
          className="w-20 py-0 mb-0"
          label=""
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
          defaultOption="Today"
        />
      </div>

      <div className="mt-3">
        <Calendar 
          className="px-4" 
          style={1} 
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between mt-6">
          <h1 className="text-xs font-bold flex items-center gap-3 ">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.55 14.55L9 11V6H11V10.175L13.95 13.125L12.55 14.55ZM9 4V2H11V4H9ZM16 11V9H18V11H16ZM9 18V16H11V18H9ZM2 11V9H4V11H2ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                fill="#000"
              />
            </svg>
            {jp.time}
          </h1>
          <TimeSelect onTimeSelect={setStartMeetingTime} dropStyle={1} />
        </div>
        <div className="flex items-center justify-between mt-6">
          <h1 className="text-xs font-bold flex items-center gap-3 ">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.55 14.55L9 11V6H11V10.175L13.95 13.125L12.55 14.55ZM9 4V2H11V4H9ZM16 11V9H18V11H16ZM9 18V16H11V18H9ZM2 11V9H4V11H2ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                fill="#000"
              />
            </svg>
            {jp.time}
          </h1>
          <TimeSelect onTimeSelect={setEndMeetingTime} dropStyle={1} />
        </div>
      </div>

      <div className="mt-3 bg-gray-300 flex flex-col gap-3 p-3 rounded-md">
        <h1 className="text-lg font-semibold">{jp.schedule}</h1>
        <div className="flex items-start gap-5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 13.166C9.69306 13.166 9.43576 13.0622 9.22813 12.8546C9.02049 12.6469 8.91667 12.3896 8.91667 12.0827C8.91667 11.7757 9.02049 11.5184 9.22813 11.3108C9.43576 11.1032 9.69306 10.9993 10 10.9993C10.3069 10.9993 10.5642 11.1032 10.7719 11.3108C10.9795 11.5184 11.0833 11.7757 11.0833 12.0827C11.0833 12.3896 10.9795 12.6469 10.7719 12.8546C10.5642 13.0622 10.3069 13.166 10 13.166ZM5.66667 13.166C5.35972 13.166 5.10243 13.0622 4.89479 12.8546C4.68715 12.6469 4.58333 12.3896 4.58333 12.0827C4.58333 11.7757 4.68715 11.5184 4.89479 11.3108C5.10243 11.1032 5.35972 10.9993 5.66667 10.9993C5.97361 10.9993 6.2309 11.1032 6.43854 11.3108C6.64618 11.5184 6.75 11.7757 6.75 12.0827C6.75 12.3896 6.64618 12.6469 6.43854 12.8546C6.2309 13.0622 5.97361 13.166 5.66667 13.166ZM14.3333 13.166C14.0264 13.166 13.7691 13.0622 13.5615 12.8546C13.3538 12.6469 13.25 12.3896 13.25 12.0827C13.25 11.7757 13.3538 11.5184 13.5615 11.3108C13.7691 11.1032 14.0264 10.9993 14.3333 10.9993C14.6403 10.9993 14.8976 11.1032 15.1052 11.3108C15.3128 11.5184 15.4167 11.7757 15.4167 12.0827C15.4167 12.3896 15.3128 12.6469 15.1052 12.8546C14.8976 13.0622 14.6403 13.166 14.3333 13.166ZM10 17.4993C9.69306 17.4993 9.43576 17.3955 9.22813 17.1879C9.02049 16.9803 8.91667 16.723 8.91667 16.416C8.91667 16.1091 9.02049 15.8518 9.22813 15.6441C9.43576 15.4365 9.69306 15.3327 10 15.3327C10.3069 15.3327 10.5642 15.4365 10.7719 15.6441C10.9795 15.8518 11.0833 16.1091 11.0833 16.416C11.0833 16.723 10.9795 16.9803 10.7719 17.1879C10.5642 17.3955 10.3069 17.4993 10 17.4993ZM5.66667 17.4993C5.35972 17.4993 5.10243 17.3955 4.89479 17.1879C4.68715 16.9803 4.58333 16.723 4.58333 16.416C4.58333 16.1091 4.68715 15.8518 4.89479 15.6441C5.10243 15.4365 5.35972 15.3327 5.66667 15.3327C5.97361 15.3327 6.2309 15.4365 6.43854 15.6441C6.64618 15.8518 6.75 16.1091 6.75 16.416C6.75 16.723 6.64618 16.9803 6.43854 17.1879C6.2309 17.3955 5.97361 17.4993 5.66667 17.4993ZM14.3333 17.4993C14.0264 17.4993 13.7691 17.3955 13.5615 17.1879C13.3538 16.9803 13.25 16.723 13.25 16.416C13.25 16.1091 13.3538 15.8518 13.5615 15.6441C13.7691 15.4365 14.0264 15.3327 14.3333 15.3327C14.6403 15.3327 14.8976 15.4365 15.1052 15.6441C15.3128 15.8518 15.4167 16.1091 15.4167 16.416C15.4167 16.723 15.3128 16.9803 15.1052 17.1879C14.8976 17.3955 14.6403 17.4993 14.3333 17.4993ZM2.41667 21.8327C1.82083 21.8327 1.31076 21.6205 0.886458 21.1962C0.462153 20.7719 0.25 20.2618 0.25 19.666V4.49935C0.25 3.90352 0.462153 3.39345 0.886458 2.96914C1.31076 2.54484 1.82083 2.33268 2.41667 2.33268H3.5V0.166016H5.66667V2.33268H14.3333V0.166016H16.5V2.33268H17.5833C18.1792 2.33268 18.6892 2.54484 19.1135 2.96914C19.5378 3.39345 19.75 3.90352 19.75 4.49935V19.666C19.75 20.2618 19.5378 20.7719 19.1135 21.1962C18.6892 21.6205 18.1792 21.8327 17.5833 21.8327H2.41667ZM2.41667 19.666H17.5833V8.83268H2.41667V19.666Z"
              fill="#211E1E"
            />
          </svg>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{jp.date}</p>
            <p className="text-sm">
              {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.55 14.55L9 11V6H11V10.175L13.95 13.125L12.55 14.55ZM9 4V2H11V4H9ZM16 11V9H18V11H16ZM9 18V16H11V18H9ZM2 11V9H4V11H2ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
              fill="#000"
            />
          </svg>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{jp.time}</p>
            <p className="text-sm">{startMeetingTime.toString()}</p>
          </div>
        </div>
        <div className="flex items-start gap-5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.55 14.55L9 11V6H11V10.175L13.95 13.125L12.55 14.55ZM9 4V2H11V4H9ZM16 11V9H18V11H16ZM9 18V16H11V18H9ZM2 11V9H4V11H2ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
              fill="#000"
            />
          </svg>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{jp.time}</p>
            <p className="text-sm">{endMeetingTime.toString()}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 ">
        <Button variant="outline" onClick={handleCloseModel}>
          Cancel
        </Button>
        <Button onClick={() => handleMakeAppointment(true)} variant="destructive">
          {jp.makeAppointment}
        </Button>
      </div>
    </motion.div>

    <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
    <div className="p-6">
          <h2 className="text-xl font-bold mb-4">予約の上書き確認</h2>
          <p className="mb-4">この予約は既に存在します。上書きしてもよろしいですか？</p>
          
          {/* Add validation data display */}
          {validationData && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">既存の予約:</h3>
              <p>日付: {validationData.date}</p>
              <p>開始時間: {validationData.start_time}</p>  
              <p>終了時間: {validationData.end_time}</p>
              </div>
          )}    

          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmRewrite}
            >
              Confirm
            </button>
          </div>
        </div>
    </Modal>
    </>
  );
};

const modalVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
};

export default AppointmentModel;