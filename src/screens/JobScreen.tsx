import { motion } from "framer-motion";
import {
  Button,
  JobDetails,
  JobForm,
  JobRowSkeleton,
  JobDetailSkeleton,
  ConfirmationBox,
} from "@/components";
import { useMemo, useState, useEffect } from "react";
import { apiRoutes } from "@/utils/apiRoutes";
import useFetch from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { jp } from "@/lang/jp";
import { useQuery } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { Helmet } from "react-helmet-async";
import { colors } from "@/constants/color";
import { useLocation, useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";

import eyeOpenWhite from "@/assets/icons/eye-open-white.svg";

const defaultForm = {
  id: null,
  job_title: "",
  job_type: { label: "", value: "" },
  area: { label: "", value: "" },
  prefecture_id: { label: "", value: "" },
  annual_salary: { label: "", value: "" },
  working_time: "",
  holiday_in_year: "",
  start_time: "",
  end_time: "",
  job_des: "",
  support_home: "",
  support_home_rent: "",
};

interface ErrorResponse {
  error: boolean;
  status: number;
  message: {
    email?: {
      jp: string;
      mm: string;
    };
  };
}

const JobScreen = () => {
  // if(import.meta.env.VITE_MAINTENANCE_MODE) return <Maintenance />
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let jobID = location.state;
  const { token } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const {
    data,
    error: fetchError,
    isLoading: jobListLoading,
  } = useFetch({
    endpoint: apiRoutes.JOBS,
    token: token as string,
    key: QueryKey.JOBS,
  });

  const {
    data: jobDetail,
    isLoading: jobDetailLoading,
    error: jobDetailError,
  } = useQuery({
    queryKey: [QueryKey.JOB_DETAILS, selectedJobId],
    queryFn: () => {
      return fetchServer({
        endpoint: `${apiRoutes.JOB_DETAILS}/${selectedJobId}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!selectedJobId && showDetails,
  });

  const jobs = useMemo(() => data?.data || [], [data]);

  const filteredJobs = useMemo(() => {
    if (jobs.length === 0) return [];
    return jobs.filter((job: any) =>
      job.job_title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [jobs, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const editHandler = () => {
    setIsEdit(true);
  };

  const addHandler = () => {
    setForm(defaultForm);
    setIsAdd(true);
  };
  const backHandler = () => {
    setIsAdd(false);
    setIsEdit(false);
  };

  const handleJobDetails = (id: number) => {
    setShowDetails(true);
    setSelectedJobId(id);
  };

  const handleBack = (value: boolean) => {
    if (jobID) {
      navigate(RouteName.CHAT, { state: jobID });
    } else {
      setForm(defaultForm);
      setShowDetails(value);
      setIsEdit(false);
      setIsAdd(false);
    }
  };

  useEffect(() => {
    dispatch(setTitle(jp.joblists));
  }, [dispatch]);

  useEffect(() => {
    if (jobID) {
      handleJobDetails(jobID.job_id);
    }
  }, [jobID]);

  useEffect(() => {
    if (jobDetail?.data) {
      setForm({
        id: jobDetail?.data.id,
        job_title: jobDetail?.data.job_title,
        job_type: {
          label: jobDetail?.data.job_type.job_type_jp,
          value: jobDetail?.data.job_types,
        },
        area: {
          label: jobDetail?.data.area_id,
          value: jobDetail?.data.area_id,
        },
        prefecture_id: {
          label: jobDetail?.data.prefecture.name,
          value: jobDetail?.data.prefecture_id,
        },
        holiday_in_year: jobDetail?.data?.holiday_in_year || 150,

        annual_salary: {
          label: jobDetail?.data.annual_salary,
          value: jobDetail?.data.annual_salary,
        },
        working_time: jobDetail?.data.working_time,

        start_time: jobDetail?.data.start_time,
        end_time: jobDetail?.data.end_time,
        job_des: jobDetail?.data.job_des,
        support_home: jobDetail?.data.support_home,
        support_home_rent: jobDetail?.data.support_home_rent,
      });
    }
  }, [jobDetail]);

  useEffect(() => {
    if (jobDetailError) {
      setShowDetails(false);
      setSelectedJobId(null);
      const errorResponse = jobDetailError as any;
      if (errorResponse.status === 404 && errorResponse.message?.email?.jp) {
        setError(errorResponse.message.email.jp);
      }
    }
  }, [jobDetailError]);

  return (
    <>
      <Helmet>
        <title>{jp.joblists} - Japan Job</title>
      </Helmet>

      {!showDetails && !isAdd && !isEdit && (
        <motion.main
          key="job-list"
          variants={jobVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="w-full pt-3 px-10"
        >
          <div className="flex justify-between gap-2">
            <div className="relative w-2/4">
              <span className="absolute top-2  right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
              <input
                type="search"
                name="search"
                id="search"
                placeholder={jp.search}
                className="w-full rounded-lg px-4 py-2 outline-none bg-gray-200"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="py-4 space-y-4 h-[72vh]  overflow-y-scroll">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className=" py-3">
                      {jp.jobTitle}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {jp.jobType}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {jp.prefecture}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {jp.annualSalary} ( 万円 )
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {jp.action}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobListLoading ? (
                    Array(5)
                      .fill(0)
                      .map((_, index) => <JobRowSkeleton key={index} />)
                  ) : filteredJobs.length < 1 ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="w-full row-span-5 h-full flex flex-col justify-center items-center my-24">
                          <svg
                            width="152px"
                            height="152px"
                            viewBox="0 0 20 19"
                            fill={colors.third}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 19C1.45 19 0.979167 18.8042 0.5875 18.4125C0.195833 18.0208 0 17.55 0 17V6C0 5.45 0.195833 4.97917 0.5875 4.5875C0.979167 4.19583 1.45 4 2 4H6V2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V17C20 17.55 19.8042 18.0208 19.4125 18.4125C19.0208 18.8042 18.55 19 18 19H2ZM2 17H18V6H2V17ZM8 4H12V2H8V4Z"
                              fillOpacity="0.8"
                              strokeWidth={1}
                              strokeLinecap="round"
                            />
                          </svg>
                          <p className="text-center text-lg text-gray-500 mt-4">
                            {jp.noJobsFound}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredJobs
                      .sort((a: any, b: any) => b.id - a.id)
                      .map((item: any) => {
                        return (
                          <tr
                            key={item.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.job_title}
                            </th>
                            <td className="px-6 py-4">
                              {item.job_type?.job_type_jp}
                            </td>
                            <td className="px-6 py-4">
                              {item.prefecture.name}
                            </td>
                            <td className="px-6 py-4">{item.annual_salary}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleJobDetails(item.id)}
                                className="text-xs text-white bg-primaryColor rounded-md px-2 py-1 hover:bg-secondaryColor"
                              >
                                <img
                                  src={eyeOpenWhite}
                                  alt="eye"
                                  className="w-4 h-4 mr-2 inline-block text-gray-500"
                                />
                                {jp.view}
                              </button>
                              {/* <button
                               
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                {jp.viewDetails}
                              </button> */}
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end items-center mt-4 ">
            <Button
              variant="destructive"
              className="px-5 flex gap-x-3"
              onClick={addHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              {jp.makeNewJobPost}
            </Button>
          </div>
        </motion.main>
      )}

      {showDetails && !isEdit && (
        <motion.div
          key="job-details"
          className="w-full h-full flex justify-center items-center z-50"
        >
          {jobDetailLoading ? (
            <JobDetailSkeleton />
          ) : (
            <JobDetails
              backHandler={handleBack}
              editHandler={editHandler}
              data={jobDetail?.data}
              setFormData={setForm}
              showConfirmation={showConfirmation}
              setShowConfirmation={setShowConfirmation}
              setShowDetails={setShowDetails}
              setIsEdit={setIsEdit}
              setIsAdd={setIsAdd}
              token={token}
            />
          )}
        </motion.div>
      )}
      {(isAdd || isEdit) && (
        <div className="w-full h-full flex justify-center items-center px-10">
          <JobForm
            onBack={backHandler}
            setShowDetails={setShowDetails}
            formVariant={formVariants}
            isEdit={isEdit}
            form={form}
            setForm={setForm}
          />
        </div>
      )}
      {error && (
        <ConfirmationBox message={error} onConfirm={() => setError(null)} />
      )}
    </>
  );
};

const jobVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const formVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
};

export default JobScreen;
