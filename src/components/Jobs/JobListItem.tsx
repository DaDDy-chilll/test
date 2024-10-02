import React from "react";
import moment from "moment";
import { setTitle } from "@/store";
import { useDispatch } from "react-redux";
import DefaultImage from "@/assets/images/default.png"
import { jp } from "@/lang/jp";

type Job = {
  annual_salary: number;
  company_id: number;
  created_at: string;
  del_flg: number;
  end_time: number;
  holiday_in_year: number;
  id: number;
  job_des: string;
  job_photo: string | null;
  job_title: string;
  job_types: number;
  prefecture_id: number;
  start_time: number;
  support_home: number;
  support_home_rent: number;
  updated_at: string;
  working_time: number;
};

type JobListItemProps = {
  item: Job;
  setShowDetails: (id: number) => void;
  city: any;
};

const JobListItem = ({ item, setShowDetails, city }: JobListItemProps) => {
  const dispatch = useDispatch();
  const date = moment(item.created_at).fromNow();
  // const handleShowDetails = () => {
  //   setShowDetails(true);
  //   dispatch(setTitle(jp.jobDetails));
  // };
  return (
    <div
      className="flex justify-start items-center gap-4 w-full cursor-pointer"
      onClick={() => setShowDetails(item.id)}
    >
      <div className="w-20 h-2w-20 rounded-md">
        <img
          src={item.job_photo || DefaultImage}
          alt={item.job_title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">{item.job_title}</h1>
          <p className="text-xs text-gray-500">{city?.area || "No City"}</p>
          <p className="text-sm text-gray-700">
            {0} persons applied
          </p>
        </div>
        <div className="flex flex-col items-end gap-6 ">
          <p className="text-sm font-semibold text-gray-700">
            ¥ {item.annual_salary}
          </p>
          <p className="text-xs font-light text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default JobListItem;
