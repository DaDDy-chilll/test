import { motion } from "framer-motion";
import FilterBar from "@/components/Applicants/FilterBar";
import ApplicantTable from "@/components/Applicants/ApplicantTable";
import { useState } from "react";
import Pagination from "@/components/Applicants/Pagination";
import { FilterType } from "@/types/helperTypes";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/ui/Loading";
import { apiRoutes } from "@/utils/apiRoutes";

const FilterState: FilterType = {
  livesInJapan: false,
  livesInMyanmar: false,
  gender: "",
  language: "",
  education: "",
  jobType: "",
}

const ApplicantScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(FilterState);
  const {data,isLoading,isError,isSuccess,error} = useFetch(apiRoutes.APPLICANTS)
  const itemsPerPage = 5;
  const applicants = data || [];

  // Filter function based on filter state
  const filteredApplicants = applicants.filter((applicant:any) => {
    return (
      // Filter by location
      (!filter.livesInJapan || applicant.address === "Japan") &&
      (!filter.livesInMyanmar || applicant.address === "Myanmar") &&
      
      // Filter by gender
      (filter.gender === "" || applicant.gender.toLowerCase() === filter.gender.toLowerCase()) &&
      
      // Filter by language
      (filter.language === "" || 
        (filter.language === "Japanese") ||
        (applicant.japaneseLevel.match(filter.language) !== null)
      ) &&
      
      // Filter by education
      (filter.education === "" || applicant.education.toLowerCase().includes(filter.education.toLowerCase())) &&
      
      // Filter by job type (assuming preferJob is an array of job types)
      (filter.jobType === 'Job Type' || applicant.preferJob.some((job:any) => job.toLowerCase().includes(filter.jobType.toLowerCase())))
    );
  });

  // Update currentData to use filteredApplicants instead of defaultApplicants
  const currentData = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
 <>
    {isLoading && <Loading isLoading={isLoading} className="h-[calc(100vh-68px)]" />}
      <motion.div
          variants={applicantVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full overflow-hidden relative"
      >
      
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="flex justify-start items-center px-4 py-2">
          <p className="text-gray-500 text-sm">
            Search Result <span className="text-secondaryColor">({filteredApplicants.length})</span>
          </p>
        </div>
        <ApplicantTable applicants={currentData} />
        <Pagination
          data={filteredApplicants}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    </>
  );
};

const applicantVariants = {
  initial: { opacity: 0},
  animate: { opacity: 1,transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 } },
};

export default ApplicantScreen;
