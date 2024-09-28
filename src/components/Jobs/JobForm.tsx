import React, { FormEvent, useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { jp } from "@/lang/jp";
import DefaultLogo from "@/assets/images/default.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import usePost from "@/hooks/usePost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";

type JobFormProps = {
  onBack?: () => void;
  formVariant?: any;
};

const JobForm = ({ onBack, formVariant }: JobFormProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const {mutate,isPending,error} = usePost({token,queryKey:QueryKey.JOBS})
  const [jobDescription, setJobDescription] = useState<string>('');
  const jobTypes = [
    { value: "IT", label: "IT" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Finance", label: "Finance" },
  ];

  const countries = [
    { value: "Tokyo", label: "Tokyo" },
    { value: "Osaka", label: "Osaka" },
    { value: "Kyoto", label: "Kyoto" },
    { value: "Fukuoka", label: "Fukuoka" },
  ];

  const annualSalary = [
    { value: "0-100", label: "0-100" },
    { value: "100-200", label: "100-200" },
    { value: "200-300", label: "200-300" },
    { value: "300-400", label: "300-400" },
  ];

  const workHour = [
    { value: "1-2", label: "1-2" },
    { value: "2-3", label: "2-3" },
    { value: "3-4", label: "3-4" },
    { value: "4-5", label: "4-5" },
  ];

  const benefits = [
    { value: "1", label: jp.supportHouse },
    { value: "1", label: jp.supportHouseRent },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const jobData = {
      job_title: formData.get("job_title") as string,
      job_types: formData.get("job_types") as string,
      job_des: jobDescription,
      prefecture_id: formData.get("prefecture_id") as string,
      annual_salary: formData.get("annual_salary") as string,
      working_time: formData.get("working_time") as string,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      holiday_in_year: formData.get("holiday_in_year") as string,
      support_home: formData.get("support_home") as string || 0,
      support_home_rent: formData.get("support_home_rent") as string || 0,
    };
    console.log('jobData', jobData);
  };


  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <motion.div
      key="form"
      className="w-full h-full shadow-md bg-gray-100 px-8 pt-3 flex flex-col justify-center items-center relative"
      variants={formVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-start w-full  border-b-2 border-gray-400 pb-4">
        <p>Post your job position to recruit workers</p>
      </div>
      <div className="flex justify-between w-5/6 p-5 pl-10">
        <div className="space-y-1">
          <h1 className="font-medium text-black">Profile Photo</h1>
          <p className="text-sm text-gray-500">
            This will be your public photo for your company
          </p>
        </div>
        <Avatar className="w-14 h-14 rounded-md">
          <AvatarImage src={DefaultLogo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-2 gap-x-20 px-10">
          <Input
            name="job_title"
            type="text"
            placeholder={jp.jobName}
            label={jp.jobName}
            className="mt-1 block w-full bg-gray-100"
          />

          <Select
            name="job_types"
            label={jp.jobType}
            id={jp.jobType}
            options={jobTypes}
            className=""
            defaultOption={jp.chooseJobType}
            value=""
          />

          <Select
            name="job_location"
            label={jp.jobLocation}
            id={jp.jobLocation}
            options={countries}
            className=""
            defaultOption={jp.chooseLocation}
          />

          <Select
            name="annual_salary"
            label={jp.annualSalary}
            id={jp.annualSalary}
            options={annualSalary}
            className=""
            defaultOption={jp.chooseSalary}
          />

          <Select
            name="working_time"
            label={jp.annualHoliday}
            id={jp.annualHoliday}
            options={workHour}
            className=""
            defaultOption={jp.chooseDays}
          />
          <div className="flex flex-row gap-x-10 relative">
            <p className="text-xs text-gray-500 absolute -top-5 left-0">
              {jp.workHour}
            </p>
            <Input
              name="start_time"
              type="time"
              label=""
              className="mt-1 block w-auto bg-gray-200"
              placeholder="100000 $"
            />
            <p> ~ </p>
            <Input
              name="end_time"
              type="time"
              label=""
              className="mt-1 block w-auto bg-gray-200"
              placeholder="100000 $"
            />
          </div>
          <div className="col-span-2 w-full ">
            <p className="text-xs text-gray-500 mb-3">{jp.benefits}</p>
            <div className="flex flex-row gap-x-10">
              {benefits.map((benefit, index) => (
                <div className="flex gap-x-3 items-center" key={index}>
                  <input
                    type="checkbox"
                    id={benefit.value}
                    name={benefit.value}
                    value={benefit.value}
                    className="accent-primaryColor"
                  />
                  <label htmlFor={benefit.value} className="text-sm">
                    {benefit.label}
                  </label>
                </div>
                // <div className="flex flex-row gap-x-3">
                //   <input
                //     type="checkbox"
                //     id={benefit.value}
                //     name={benefit.value}
                //   />
                //   <label htmlFor={benefit.value}>{benefit.label}</label>
                // </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center col-span-2 gap-x-2">
            <p className="text-xs text-gray-500">Other</p>
            <input type="text" name="other" className="bg-gray-200" />
          </div>
          <span className="col-span-2 mt-3">
            <ReactQuill
              value={jobDescription}
              onChange={setJobDescription}
              theme="snow"
              className="h-36 mb-16"
              placeholder={jp.companyDescription}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["clean"],
                ],
              }}
            />
          </span>
        </div>

        <div className="flex justify-between w-full pb-3 px-10 mr-10">
          <button className="underline font-medium" onClick={onBack}>
            Back
          </button>
          <Button
            variant="destructive"
            className="font-medium w-44"
            type="submit"
          >
            Finish
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default JobForm;
