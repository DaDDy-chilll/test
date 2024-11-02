import { FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { jp } from "@/lang/jp";
import { useState, useCallback, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import usePost from "@/hooks/usePost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { ConfirmationBox } from "@/components";
import useHandleError from "@/hooks/useHandleError";
import { JobFormErrorType } from "@/types/helperTypes";

type JobFormProps = {
  onBack?: () => void;
  formVariant?: any;
  form: any;
  setForm: any;
  setShowDetails?: (value: boolean) => void;
  isEdit?: boolean;
};

const annualSalary = [
  { value: "100", label: "~100万円" },
  { value: "200", label: "~200万円" },
  { value: "300", label: "~300万円" },
  { value: "400", label: "~400万円" },
  { value: "500", label: "~500万円" },
  { value: "600", label: "~600万円" },
  { value: "700", label: "~700万円" },
  { value: "800", label: "800万円~" },
];

const benefits = [
  { value: "support_home", label: jp.supportHouse },
  { value: "support_home_rent", label: jp.supportHouseRent },
];

const JobForm = ({
  onBack,
  formVariant,
  form,
  setForm,
  setShowDetails,
  isEdit,
}: JobFormProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const {
    jobFormHandleError,
    workTimeError,
    jobNameError,
    jobTypeError,
    salaryError,
    holidayError,
    startTimeError,
    endTimeError,
    prefectureError,
    companyDesError,
    areaError,
    resetJobFormError,
  } = useHandleError();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const { mutate, error, isSuccess, isPending } = usePost({
    token,
    queryKey: QueryKey.JOBS,
  });

  /**
   * This fetch hook is used to fetch the job types.
   * @author PSK
   */
  const { data: jobType } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  /**
   * This fetch hook is used to fetch the city.
   * @author PSK
   */
  const { data: city } = useFetch({
    endpoint: apiRoutes.CITY,
    key: QueryKey.CITY,
    token: token as string,
  });

  /**
   * This converts the job types to the format required by the select component.
   * @author PSK
   */
  const jobTypes =
    jobType?.data.map((type: any) => ({
      value: type.id.toString(),
      label: type.job_type_jp,
    })) || [];

  const handleCancel = () => setShowConfirmation(false);

  /**
   * This function is convert to area lists and relative city
   * @author PSK
   * @params city data
   * @returns area list and relative city list
   */
  const transformAreaData = useCallback(
    (data: any | null) => {
      if (data) {
        const areaList = data?.map((item: any) => ({
          label: item.area,
          value: item.id.toString(),
        }));
        const relativeArea = data?.reduce((acc: any, item: any) => {
          if (item.m_prefectures.length > 0) {
            acc[item.id.toString()] = item.m_prefectures.map(
              (prefecture: any) => ({
                label: prefecture.name,
                value: prefecture.id.toString(),
              }),
            );
          }
          return acc;
        }, {});
        return { areaList, relativeArea };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [response],
  );

  /**
   * This function is used to get the area list and relative city list
   * @author PSK
   * @params city data
   * @returns area list and relative city list
   */
  const { areaList, relativeArea } = useMemo(() => {
    if (city && "data" in city) {
      return (
        transformAreaData(city.data) || {
          areaList: [],
          relativeArea: {},
        }
      );
    } else return { areaList: [], relativeArea: {} };
  }, [city, transformAreaData]);

  /**
   * This function is used to handle the form submission
   * @author PSK
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetJobFormError();
    const formData = new FormData(e.target as HTMLFormElement);

    const jobData = {
      job_title: formData.get("job_title") as string,
      job_types: Number(formData.get("job_types") as string) || undefined,
      job_des: form.job_des,
      area_id: Number(formData.get("area") as string) || undefined,
      prefecture_id:
        Number(formData.get("prefecture_id") as string) || undefined,
      working_time:
        calculateWorkingTime(
          formData.get("start_time") as string,
          formData.get("end_time") as string,
        ) || undefined,
      annual_salary:
        Number(formData.get("annual_salary") as string) || undefined,
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

  /**
   * This function is used to calculate the working time
   * @author PSK
   * @params start time and end time
   * @returns working time like 8, 9, 10,....
   */
  const calculateWorkingTime = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diff = end.getTime() - start.getTime();
    return parseInt(((diff - 3600000) / (1000 * 60 * 60)) as unknown as string);
  };

  /**
   * This Effect is set city data to state
   * @author PSK
   */
  useEffect(() => {
    if (city && "data" in city) setResponse(city.data);
  }, [city]);

  /**
   * This Effect is set error and success data to state
   * @author PSK
   */
  useEffect(() => {
    if (error) {
      setShowConfirmation(false);
      jobFormHandleError(error?.message as JobFormErrorType);
    }
    if (isSuccess) {
      setTimeout(() => {
        onBack?.();
        setShowConfirmation(false);
        setShowDetails && setShowDetails(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);



  return (
    <motion.div
      key="form"
      className="w-full h-full shadow-md bg-gray-100 px-8 pt-3 flex flex-col justify-center items-center relative"
      variants={formVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-start w-full  border-b-2 border-gray-400 pb-4 mb-14">
        <p>{jp.postJobPosition}</p>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
          <Input
            name="job_title"
            type="text"
            placeholder=""
            label={jp.jobName}
            className="mt-1 block w-full bg-gray-100"
            value={form.job_title}
            onChange={(e) => setForm({ ...form, job_title: e.target.value })}
            required={false}
            error={jobNameError || ""}
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
            error={jobTypeError || ""}
          />

          <Select
            name="area"
            label={jp.area}
            id={jp.area}
            options={areaList}
            className=""
            defaultOption={jp.chooseLocation}
            value={form.area}
            defaultValue={areaList.length > 0 ? areaList[0].value : ""}
            onChange={(e) =>
              setForm({
                ...form,
                area: {
                  label: e.target.labels,
                  value: e.target.value,
                },
              })
            }
            error={areaError || ""}
          />

          <Select
            name="prefecture_id"
            label={jp.prefecture}
            id={jp.prefecture}
            options={form.area.value && relativeArea[form.area.value]}
            className=""
            defaultOption={jp.chooseLocation}
            value={form.prefecture_id}
            defaultValue={
              relativeArea[form.area.value] > 0
                ? relativeArea[form.area.value][0].value
                : ""
            }
            onChange={(e) =>
              setForm({
                ...form,
                prefecture_id: {
                  label: e.target.labels,
                  value: e.target.value,
                },
              })
            }
            error={prefectureError || ""}
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
            error={salaryError || ""}
          />

          <Input
            name="holiday_in_year"
            type="text"
            placeholder=""
            label={jp.annualHoliday}
            className="mt-1 block w-full bg-gray-100"
            value={form.holiday_in_year}
            onChange={(e) =>
              setForm({
                ...form,
                holiday_in_year: e.target.value.replace(/\D/g, ""),
              })
            }
            required={false}
            error={holidayError || ""}
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
              required={false}
              error={startTimeError || workTimeError || ""}
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
              required={false}
              error={endTimeError || ""}
            />
          </div>
          <div className="w-full ">
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
              ))}
            </div>
          </div>

          <span className="col-span-2 mt-3">
            {companyDesError && (
              <p className="text-xs italic text-red-500 mb-1">
                {companyDesError}
              </p>
            )}
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
                  [{ color: ["blackBright"] }, { background: [] }],
                  [{ align: [] }],
                  ["clean"],
                ],
              }}
            />
          </span>
        </div>

        <div className="flex justify-between w-full pb-3 px-10 mr-10">
          <button
            className="text-blue-600 hover:text-blue-800 font-medium flex gap-x-1"
            onClick={onBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>

            {jp.back}
          </button>
          <Button
            type="button"
            variant="destructive"
            className="font-medium w-32 flex items-center gap-x-2"
            onClick={() => setShowConfirmation(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>

            {jp.create}
          </Button>
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ConfirmationBox
                message="送信してもよろしいですか？"
                onCancel={handleCancel}
                onConfirm={() => {}}
                loading={isPending}
                isSuccess={isSuccess}
              />
            </div>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default JobForm;
