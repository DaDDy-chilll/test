import { FormEvent, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { jp } from "@/lang/jp";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import usePost from "@/hooks/usePost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import Modal from "@/components/Chat/Modal";

type JobFormProps = {
  onBack?: () => void;
  formVariant?: any;
  form: any;
  setForm: any;
  setShowDetails?: (value: boolean) => void;
  isEdit?: boolean;
};

const JobForm = ({
  onBack,
  formVariant,
  form,
  setForm,
  setShowDetails,
  isEdit,
}: JobFormProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { mutate, error, isSuccess } = usePost({
    token,
    queryKey: QueryKey.JOBS,
  });

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const { data: jobType } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  const { data: city } = useFetch({
    endpoint: apiRoutes.CITY,
    key: QueryKey.CITY,
    token: token as string,
  });

  const jobTypes =
    jobType?.data.map((type: any) => ({
      value: type.id.toString(),
      label: type.job_type_jp,
    })) || [];

  const countries =
    city?.data.map((type: any) => ({
      value: type.id.toString(),
      label: type.area,
    })) || [];

  const annualSalary = [
    { value: "100", label: "~100万円" },
    { value: "200", label: "~200万円" },
    { value: "300", label: "~300万円" },
    { value: "400", label: "~400万円" },
    { value: "500", label: "~500万円" },
    { value: "600", label: "~600万円" },
  ];

  const workingTime = [
    { value: "7", label: "7時間" },
    { value: "8", label: "8時間" },
    { value: "9", label: "9時間" },
    { value: "10", label: "10時間" },
  ];

  const annualHoliday = [
    { value: "120", label: "120日" },
    { value: "130", label: "130日" },
    { value: "140", label: "140日" },
    { value: "150", label: "150日" },
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
      job_types: Number(formData.get("job_types") as string) || undefined,
      job_des: form.job_des,
      prefecture_id:
        Number(formData.get("prefecture_id") as string) || undefined,
      annual_salary:
        Number(formData.get("annual_salary") as string) || undefined,
      working_time: Number(formData.get("working_time") as string) || undefined,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      holiday_in_year:
        Number(formData.get("holiday_in_year") as string) || undefined,
      support_home: (formData.get("support_home") as string) ? 1 : 0,
      support_home_rent: (formData.get("support_home_rent") as string) ? 1 : 0,
    };
    if (isEdit) {
      mutate({
        endpoint: `${apiRoutes.UPDATE_JOB}/${form.id}`,
        body: jobData,
        method: "PUT",
      });
    } else {
      mutate({
        endpoint: `${apiRoutes.CREATE_JOB}`,
        body: jobData,
        method: "POST",
      });
    }
  };

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
    if (isSuccess) {
      onBack?.();
      setShowDetails && setShowDetails(false);
    }
  }, [error, isSuccess]);


  const getFieldLabel = (field: string): string => {
    switch (field) {
      case "job_des":
        return jp.jobDescription;
      case "prefecture_id":
        return jp.jobLocation;
      case "annual_salary":
        return jp.annualSalary;
      case "working_time":
        return jp.annualHoliday;
      case "job_types":
        return jp.jobType;
      default:
        return field;
    }
  };
  const renderErrorMessage = () => {
    if (typeof error?.message === "object" && "validation" in error.message) {
      return (
        <ul className="list-disc pl-5">
          {(error.message as { validation: any[] }).validation.map(
            (validationError: any, index: number) => (
              <li key={index}>
                {Object.entries(validationError).map(([field, messages]) => (
                  <div key={field}>
                    <span className="font-semibold mr-1">
                      {getFieldLabel(field)}
                    </span>
                    {(messages as Record<string, string>).jp}
                  </div>
                ))}
              </li>
            )
          )}
        </ul>
      );
    }
    return <p>{JSON.stringify(error?.message)}</p>;
  };

  return (
    <motion.div
      key="form"
      className="w-full h-full shadow-md bg-gray-100 px-8 pt-3 flex flex-col justify-center items-center relative"
      variants={formVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Modal isOpen={showErrorModal} onClose={handleCloseErrorModal}>
        <h2 className="text-xl font-bold mb-4">エラー</h2>
        <div className="mb-4">{renderErrorMessage()}</div>
        <div className="flex justify-end">
          <button
            onClick={handleCloseErrorModal}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            閉じる
          </button>
        </div>
      </Modal>
      <div className="text-start w-full  border-b-2 border-gray-400 pb-4 mb-14">
        <p>{jp.postJobPosition}</p>
      </div>
      {/* <div className="flex justify-between w-5/6 p-5 pl-10">
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
      </div> */}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
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
            defaultValue={jobTypes.length > 0 ? jobTypes[0].value : ""}
            onChange={(e) =>
              setForm({
                ...form,
                job_type: { label: e.target.labels, value: e.target.value },
              })
            }
          />

          <Select
            name="prefecture_id"
            label={jp.jobLocation}
            id={jp.jobLocation}
            options={countries}
            className=""
            defaultOption={jp.chooseLocation}
            value={form.prefecture_id}
            defaultValue={countries.length > 0 ? countries[0].value : ""}
            onChange={(e) =>
              setForm({
                ...form,
                prefecture_id: {
                  label: e.target.labels,
                  value: e.target.value,
                },
              })
            }
          />

          <Select
            name="annual_salary"
            label={jp.annualSalary}
            id={jp.annualSalary}
            options={annualSalary}
            className=""
            defaultOption={jp.chooseSalary}
            value={form.annual_salary}
            defaultValue={annualSalary[0].value}
            onChange={(e) =>
              setForm({
                ...form,
                annual_salary: {
                  label: e.target.labels,
                  value: e.target.value,
                },
              })
            }
          />

          <Select
            name="working_time"
            label={jp.workHour}
            id={jp.workHour}
            options={workingTime}
            className=""
            defaultOption={jp.chooseTime}
            value={form.working_time}
            defaultValue={workingTime[0].value}
            onChange={(e) =>
              setForm({
                ...form,
                working_time: { label: e.target.labels, value: e.target.value },
              })
            }
          />

          <Select
            name="holiday_in_year"
            label={jp.workHour}
            id={jp.workHour}
            options={annualHoliday}
            className=""
            defaultOption={jp.chooseDays}
            value={form.holiday_in_year}
            defaultValue={annualHoliday[0].value}
            onChange={(e) =>
              setForm({
                ...form,
                holiday_in_year: {
                  label: e.target.labels,
                  value: e.target.value,
                },
              })
            }
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
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [benefit.value]: e.target.checked ? 1 : 0,
                      })
                    }
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

          <span className="col-span-2 mt-3">
            <ReactQuill
              value={form.job_des}
              onChange={(e) => setForm({ ...form, job_des: e })}
              theme="snow"
              className="h-64 mb-16"
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
            {jp.back}
          </button>
          <Button
            variant="destructive"
            className="font-medium w-44"
            type="submit"
          >
            {jp.finish}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default JobForm;
