import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { jp } from "@/lang/jp";
import DefaultLogo from "@/assets/images/default.png";

type JobFormProps = { 
  onBack?: () => void;
  onFinish?: () => void;
  formVariant?: any;
};

const JobForm = ({ onBack, onFinish, formVariant }: JobFormProps) => {
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
    { value: "health", label: "Health Insurance" },
    { value: "life", label: "Life Insurance" },
    { value: "retirement", label: "Retirement Pension" },
    { value: "transportation", label: "Transportation Allowance" },
  ];

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
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-y-2 gap-x-20 px-10">
          <Input
            name="name"
            type="text"
            placeholder="Type Name"
            label={jp.jobName}
            className="mt-1 block w-full bg-gray-100"
          />

          <Select
            label={jp.jobType}
            id={jp.jobType}
            options={jobTypes}
            className=""
            defaultOption="Choose your job type"
          />

          <Select
            label={jp.jobLocation}
            id={jp.jobLocation}
            options={countries}
            className=""
            defaultOption="Choose your job location"
          />

          <Select
            label={jp.annualSalary}
            id={jp.annualSalary}
            options={annualSalary}
            className=""
            defaultOption="Choose your annual salary"
          />

          <Select
            label={jp.annualHoliday}
            id={jp.annualHoliday}
            options={workHour}
            className=""
            defaultOption="Days"
          />
          <div className="flex flex-row gap-x-10 relative">
            <p className="text-xs text-gray-500 absolute -top-5 left-0">
              {jp.workHour}
            </p>
            <Input
              name="workHourStart"
              type="time"
              label=""
              className="mt-1 block w-auto bg-gray-200"
              placeholder="100000 $"
            />
            <p> ~ </p>
            <Input
              name="workHourEnd"
              type="time"
              label=""
              className="mt-1 block w-auto bg-gray-200"
              placeholder="100000 $"
            />
          </div>
          <div className="col-span-2 w-full ">
            <p className="text-xs text-gray-500 mb-3">{jp.benefits}</p>
            <div className="flex flex-row gap-x-10">
              {benefits.map((benefit) => (
              <div className="flex gap-x-3 items-center">
              <input type="checkbox" id={benefit.value} name={benefit.value} className="accent-primaryColor" />
              <label htmlFor={benefit.value} className="text-sm">{benefit.label}</label>
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
            <Input
              name="description"
              type="text"
              label={jp.companyDescription}
              className="mt-1 block w-full bg-gray-100"
              placeholder="lorem ipsum dolor sit amet"
            />
          </span>
        </div>

        <div className="flex justify-between w-full pb-3 px-10 mr-10">
        <button className="underline font-medium" onClick={onBack}>Back</button>
          <Button
            variant="destructive"
            className="font-medium w-44"
            onClick={onFinish}
          >
            Finish
          </Button>
        </div>
      </form>
    </motion.div>
  );
};



export default JobForm;
