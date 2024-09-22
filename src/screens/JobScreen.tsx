
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import JobListItem from "@/components/Jobs/JobListItem";
import { Button } from "@/components/ui/button";
import JobDetails from "@/components/ui/JobDetails";
import JobForm from "@/components/Jobs/JobForm";
import Loading from "@/components/ui/Loading";
import { apiRoutes } from "@/utils/apiRoutes";
import useFetch from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const JobScreen = () => {
  const {token} = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("Job Type");
  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const {data,isLoading,isError,isSuccess,error} = useFetch({endpoint:apiRoutes.JOBS,token:token as string,key:'jobs'})
  const defaultJobType = [
    { id: 0, name: "All" },
    { id: 1, name: "Full Time" },
    { id: 2, name: "Part Time" },
    { id: 3, name: "Remote" },
    { id: 4, name: "Internship" },
  ];

  const jobs = data || []

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job:any) =>
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      (Number(job.applied) === Number(search)) 
    );
  }, [jobs, search]);

  const handleJobType = (e: React.MouseEvent<HTMLDivElement>) => {
    setJobType((e.target as HTMLDivElement).innerText);
  };

  const editHandler = () => {
    setIsEdit(true);
  }

  const addHandler = () => {
    setIsAdd(true);
  }

  const backHandler = () => {
    setIsAdd(false);
    setIsEdit(false);
  }

  return (
    <>
    {isLoading && <Loading isLoading={isLoading} className='h-[calc(100vh-68px)]' />}
      {(!showDetails && !isAdd && !isEdit) && (
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
            {filteredJobs.map((item:any) => (
              <JobListItem
                key={item.id}
                item={item}
                setShowDetails={setShowDetails}
              />
            ))}
          </div>
          <div className="flex justify-end items-center mt-4 ">
            <Button variant="destructive" className="px-10" onClick={addHandler}>
              Make New Job Post
            </Button>
          </div>
        </motion.div>
      ) } 

      { (showDetails && !isEdit) &&(
        <motion.div key="job-details" className="w-full h-full flex justify-center items-center px-10">
          <JobDetails backHandler={setShowDetails} isDetails={true} editHandler={editHandler}  />
        </motion.div>
      )}
      {(isAdd || isEdit) && (
        <div className="w-full h-full flex justify-center items-center px-10">
          <JobForm onBack={backHandler} formVariant={formVariants} />
        </div>
      )}
    </>
  );
};

const jobVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1,transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 }},
};

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};

export default JobScreen;
