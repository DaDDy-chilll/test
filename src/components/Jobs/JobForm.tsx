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
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";

type JobFormProps = {
  onBack?: () => void;
  formVariant?: any;
  form: any;
  setForm: any;
  setShowDetails?: (value: boolean) => void;
};

const JobForm = ({ onBack, formVariant, form, setForm,setShowDetails }: JobFormProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const {mutate,isPending,error,isSuccess} = usePost({token,queryKey:QueryKey.JOBS})
  const [jobDescription, setJobDescription] = useState<string>('');
  const {
    data: jobType,
    isLoading: isJobTypesLoading,
    isError: isJobTypesError,
    isSuccess: isJobTypesSuccess,
    error: jobTypesError,
  } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  const {
    data: city,
    isLoading: isCityLoading,
    isError: isCityError,
    isSuccess: isCitySuccess,
    error: cityError,
  } = useFetch({
    endpoint: apiRoutes.CITY,
    key: QueryKey.CITY,
    token: token as string,
  });


  const jobTypes = jobType?.data.map((type: any) => ({
    value: type.id.toString(),
    label: type.job_type_jp,
  })) || [];

  

  const countries = city?.data.map((type: any) => ({
    value: type.id.toString(),
    label: type.area,
  })) || [];

  const annualSalary = [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
    { value: "500", label: "500" },
    { value: "600", label: "600" },
  ];

  const workHour = [
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  const benefits = [
    { value: "support_home", label: jp.supportHouse },
    { value: "support_home_rent", label: jp.supportHouseRent },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const jobData = {
      job_title: formData.get("job_title") as string,
      job_types: Number(formData.get("job_types") as string),
      job_des: form.job_des,
      prefecture_id: Number(formData.get("prefecture_id") as string),
      annual_salary: Number(formData.get("annual_salary") as string),
      working_time: Number(formData.get("working_time") as string),
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      holiday_in_year: 0,
      support_home: formData.get("support_home") as string ? 1 : 0,
      support_home_rent: formData.get("support_home_rent") as string ? 1 : 0,
    };
    console.log('jobData', jobData);
    mutate({endpoint:`${apiRoutes.UPDATE_JOB}/${form.id}`,body:jobData,method:'PUT'})
  };



  useEffect(() => {
    if (error) {
      console.log(error.message)
      alert(error.message);
    }
    if(isSuccess){
      onBack?.()
      setShowDetails && setShowDetails(false)
    }
  }, [error,isSuccess]);

  console.log('form',form);

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
            value={form.job_title}
            onChange={(e) => setForm({ ...form, job_title: e.target.value })}
          />

          <Select
            name="job_types"
            label={jp.jobType}
            id={jp.jobType}
            options={jobTypes}
            className=""
            defaultOption={jp.chooseJobType}
            value={form.job_type}
            onChange={(e) => setForm({ ...form, job_type: {label: e.target.labels, value: e.target.value} })}
          />

          <Select
            name="prefecture_id"
            label={jp.jobLocation}
            id={jp.jobLocation}
            options={countries}
            className=""
            defaultOption={jp.chooseLocation}
            value={form.prefecture_id}
            onChange={(e) => setForm({ ...form, prefecture_id: {label: e.target.labels, value: e.target.value} })}
          />

          <Select
            name="annual_salary"
            label={jp.annualSalary}
            id={jp.annualSalary}
            options={annualSalary}
            className=""
            defaultOption={jp.chooseSalary}
            value={form.annual_salary}
            onChange={(e) => setForm({ ...form, annual_salary: {label: e.target.labels, value: e.target.value} })}
          />

          <Select
            name="working_time"
            label={jp.annualHoliday}
            id={jp.annualHoliday}
            options={workHour}
            className=""
            defaultOption={jp.chooseDays}
            value={form.working_time}
            onChange={(e) => setForm({ ...form, working_time: {label: e.target.labels, value: e.target.value} })}
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
              value={form.start_time}
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            />
            <p> ~ </p>
            <Input
              name="end_time"
              type="time"
              label=""
              className="mt-1 block w-auto bg-gray-200"
              placeholder="100000 $"
              value={form.end_time}
              onChange={(e) => setForm({ ...form, end_time: e.target.value })}
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
                    checked={form[benefit.value] == 1}
                    onChange={(e) => setForm({ ...form, [benefit.value]: e.target.checked ? 1 : 0 })}
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
              value={form.job_des}
              onChange={(e) => setForm({ ...form, job_des: e })}
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
