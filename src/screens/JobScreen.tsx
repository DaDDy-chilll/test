import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState, useEffect, FormEvent } from "react";
import JobListItem from "@/components/Jobs/JobListItem";
import { Button } from "@/components/ui/button";
import JobDetails from "@/components/ui/JobDetails";
import JobForm from "@/components/Jobs/JobForm";
import Loading from "@/components/ui/Loading";
import { apiRoutes } from "@/utils/apiRoutes";
import useFetch from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import Maintenance from "@/components/ui/Maintenance";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { jp } from "@/lang/jp";
import { useQuery } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { Helmet } from "react-helmet-async";
import { colors } from "@/constants/color";
const defaultJobType = [
  { id: 0, name: "All" },
  { id: 1, name: "Full Time" },
  { id: 2, name: "Part Time" },
  { id: 3, name: "Remote" },
  { id: 4, name: "Internship" },
];

const defaultForm = {
  id:null,
  job_title: "",
  job_type: {label: "", value: ""},
  prefecture_id: {label: "", value: ""},
  annual_salary: {label: "", value: ""},
  working_time: {label: "", value: ""},
  start_time: "",
  end_time: "",
  job_des: "",
  support_home: "",
  support_home_rent:""
}

const JobScreen = () => {
  // if(import.meta.env.VITE_MAINTENANCE_MODE) return <Maintenance />
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("Job Type");
  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error: fetchError,
  } = useFetch({
    endpoint: apiRoutes.JOBS,
    token: token as string,
    key: QueryKey.JOBS,
  });

  const {
    data: citys,
    isLoading: isCityLoading,
    isError: isCityError,
    isSuccess: isCitySuccess,
    error: cityError,
  } = useFetch({
    endpoint: apiRoutes.CITY,
    key: QueryKey.CITY,
    token: token as string,
  });

  const { data: jobDetail, isLoading: isDetailLoading } = useQuery({
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

  const jobs = data?.data || [];


  const filteredJobs = useMemo(() => {
    if (jobs.length === 0) return [];
    return jobs.filter((job: any) =>
      job.job_title.toLowerCase().includes(search.toLowerCase())
    );
  }, [jobs, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const handleJobType = (e: React.MouseEvent<HTMLDivElement>) =>
    setJobType((e.target as HTMLDivElement).innerText);
  const editHandler = () => {
    setIsEdit(true);
  };
  const addHandler = () => setIsAdd(true);
  const backHandler = () => {
    setIsAdd(false);
    setIsEdit(false);
  };

  const handleJobDetails = (id: number) => {
    setShowDetails(true);
    setSelectedJobId(id);
  };

  useEffect(() => {
    if (fetchError) {
      alert(fetchError.message);
    }
  }, [fetchError]);

  useEffect(() => {
    dispatch(setTitle(jp.joblists));
  }, [dispatch]);

  useEffect(() => {
    if(jobDetail?.data) {
      console.log('jobDetail',jobDetail);
      setForm({
        id:jobDetail?.data.id,
        job_title: jobDetail?.data.job_title,
        job_type: {label: jobDetail?.data.job_type.job_type_jp, value: jobDetail?.data.job_types},
        prefecture_id: {label: jobDetail?.data.prefecture.name, value: jobDetail?.data.prefecture_id},
        annual_salary: {label: jobDetail?.data.annual_salary, value: jobDetail?.data.annual_salary},
        working_time: {label: jobDetail?.data.working_time, value: jobDetail?.data.working_time},
        start_time: jobDetail?.data.start_time,
        end_time: jobDetail?.data.end_time,
        job_des: jobDetail?.data.job_des,
        support_home:jobDetail?.data.support_home,
        support_home_rent:jobDetail?.data.support_home_rent
      });
    }
  }, [jobDetail]);


  return (
    <>
      <Helmet>
        <title>{jp.joblists} - Japan Job</title>
      </Helmet>
      {/* {isLoading && !error && (
        <Loading isLoading={isLoading} className="h-[calc(100vh-68px)] z-40" />
      )} */}
      {!showDetails && !isAdd && !isEdit && (
        <motion.div
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
                placeholder="Search"
                className="w-full rounded-lg px-4 py-2 outline-none bg-gray-200"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg mr-3">Sort by</p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center justify-between w-40 gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-lg">
                    <p className="text-sm mr-3">{jobType}</p>
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
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {defaultJobType.map((item) => (
                    <DropdownMenuItem key={item.id} onClick={handleJobType}>
                      <p>{item.name}</p>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="py-4 space-y-4 h-[72vh] px-10 overflow-y-scroll">
            {filteredJobs.length > 0 ? (
              filteredJobs
                .sort((a: any, b: any) => b.id - a.id)
                .map((item: any) => {
                  const city = citys?.data.find(
                    (city: any) => city.id === item.prefecture_id
                  );
                  console.log(item);
                  return (
                    <JobListItem
                      key={item.id}
                      item={item}
                      setShowDetails={handleJobDetails}
                      city={city}
                    />
                  );
                })
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
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
                  No added jobs yet
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center mt-4 ">
            <Button
              variant="destructive"
              className="px-10"
              onClick={addHandler}
            >
              Make New Job Post
            </Button>
          </div>
        </motion.div>
      )}

      {showDetails && !isEdit && (
        <motion.div
          key="job-details"
          className="w-full h-full flex justify-center items-center z-50"
        >
          <JobDetails
            backHandler={setShowDetails}
            isDetails={true}
            editHandler={editHandler}
            data={jobDetail?.data}
            setFormData={setForm}
          />
        </motion.div>
      )}
      {(isAdd || isEdit) && (
        <div className="w-full h-full flex justify-center items-center px-10">
          <JobForm onBack={backHandler} setShowDetails={setShowDetails} formVariant={formVariants} form={form} setForm={setForm}/>
        </div>
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
