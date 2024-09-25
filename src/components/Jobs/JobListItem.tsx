import React from "react";
import moment from "moment";
import { setTitle } from "@/store";
import { useDispatch } from "react-redux";
import { jp } from "@/lang/jp";

type Job = {
  id: number;
  img: string;
  position: string;
  location: string;
  applied: number;
  salary: number;
  date: string;
};

type JobListItemProps = {
  item: Job;
  setShowDetails: (showDetails: boolean) => void;
};

const JobListItem = ({ item, setShowDetails }: JobListItemProps) => {
  const dispatch = useDispatch();
  const date = moment(item.date).fromNow();
  const handleShowDetails = () => {
    setShowDetails(true);
    dispatch(setTitle(jp.jobDetails));
  };
  return (
    <div
      className="flex justify-start items-center gap-4 w-full cursor-pointer"
      onClick={handleShowDetails}
    >
      <div className="w-20 h-2w-20 rounded-md">
        <img
          src={item.img}
          alt={item.position}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">{item.position}</h1>
          <p className="text-xs text-gray-500">{item.location}</p>
          <p className="text-sm text-gray-700">
            {item.applied} persons applied
          </p>
        </div>
        <div className="flex flex-col items-end gap-6 ">
          <p className="text-sm font-semibold text-gray-700">{item.salary}</p>
          <p className="text-xs font-light text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default JobListItem;
