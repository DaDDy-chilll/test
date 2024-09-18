import Select from "@/components/ui/Select";
import Layout from "@/layouts/Layout";
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
import { AnimatePresence } from "framer-motion";

const JobScreen = () => {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("Job Type");
  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const defaultJobType = [
    { id: 0, name: "All" },
    { id: 1, name: "Full Time" },
    { id: 2, name: "Part Time" },
    { id: 3, name: "Remote" },
    { id: 4, name: "Internship" },
  ];

  const jobs = [
    {
      id: 0,
      img: "https://via.placeholder.com/150",
      position: "Software Engineer",
      location: "Remote",
      applied: 10,
      salary: 100000,
      date: "2024-01-01",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/150",
      position: "Data Scientist",
      location: "New York, NY",
      applied: 15,
      salary: 120000,
      date: "2024-02-01",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/150",
      position: "Product Manager",
      location: "San Francisco, CA",
      applied: 8,
      salary: 130000,
      date: "2024-03-01",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/150",
      position: "UX Designer",
      location: "Austin, TX",
      applied: 12,
      salary: 90000,
      date: "2024-04-01",
    },
    {
      id: 4,
      img: "https://via.placeholder.com/150",
      position: "Marketing Specialist",
      location: "Remote",
      applied: 20,
      salary: 70000,
      date: "2024-05-01",
    },
    {
      id: 5,
      img: "https://via.placeholder.com/150",
      position: "Sales Manager",
      location: "Chicago, IL",
      applied: 5,
      salary: 110000,
      date: "2024-06-01",
    },
    {
      id: 6,
      img: "https://via.placeholder.com/150",
      position: "HR Coordinator",
      location: "Boston, MA",
      applied: 18,
      salary: 60000,
      date: "2024-07-01",
    },
    {
      id: 7,
      img: "https://via.placeholder.com/150",
      position: "DevOps Engineer",
      location: "Seattle, WA",
      applied: 25,
      salary: 115000,
      date: "2024-08-01",
    },
    {
      id: 8,
      img: "https://via.placeholder.com/150",
      position: "Graphic Designer",
      location: "Los Angeles, CA",
      applied: 10,
      salary: 80000,
      date: "2024-09-01",
    },
    {
      id: 9,
      img: "https://via.placeholder.com/150",
      position: "Content Writer",
      location: "Remote",
      applied: 22,
      salary: 50000,
      date: "2024-10-01",
    },
    {
      id: 10,
      img: "https://via.placeholder.com/150",
      position: "IT Support Specialist",
      location: "Denver, CO",
      applied: 7,
      salary: 65000,
      date: "2024-11-01",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
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
    <Layout>
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
            {filteredJobs.map((item) => (
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
    </Layout>
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
