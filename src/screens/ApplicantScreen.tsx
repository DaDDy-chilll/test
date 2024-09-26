import { motion } from "framer-motion";
import FilterBar from "@/components/Applicants/FilterBar";
import ApplicantTable from "@/components/Applicants/ApplicantTable";
import { useEffect, useState } from "react";
import Pagination from "@/components/Applicants/Pagination";
import { FilterType } from "@/types/helperTypes";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/ui/Loading";
import { apiRoutes } from "@/utils/apiRoutes";
import MatchedApplicants from "@/components/Matched/MatchedApplicants";
import { UserProfile } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Maintenance from "@/components/ui/Maintenance";
const FilterState: FilterType = {
  livesInJapan: false,
  livesInMyanmar: false,
  gender: "",
  language: "",
  education: "",
  jobType: "",
};
const itemsPerPage = 5;
const ApplicantScreen = () => {
  // if(import.meta.env.VITE_MAINTENANCE_MODE) return <Maintenance />
  const { token } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  // const [applicantDetail,setApplicantDetail] = useState<UserProfile>()
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null
  );
  const [filter, setFilter] = useState(FilterState);
  const { data, isLoading, isError, isSuccess, error } = useFetch({
    endpoint: apiRoutes.APPLICANTS,
    key: "applicants",
    token: token as string,
  });
  const { data: applicantDetail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["applicantDetail", selectedApplicantId],
    queryFn: () => {
      return fetchServer({
        endpoint: `${apiRoutes.APPLICANTS}/${selectedApplicantId}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!selectedApplicantId && isDetail,
  });

  // const applicants = data?.data || [];
  const applicants:any[] = [];

  console.log("applicants", applicants);

  // Filter function based on filter state
  const filteredApplicants = applicants.filter((applicant: any) => {
    return (
      // Filter by location
      (!filter.livesInJapan || applicant.address === "Japan") &&
      (!filter.livesInMyanmar || applicant.address === "Myanmar") &&
      // Filter by gender
      (filter.gender === "" ||
        applicant.gender.toLowerCase() === filter.gender.toLowerCase()) &&
      // Filter by language
      (filter.language === "" ||
        filter.language === "Japanese" ||
        applicant.japaneseLevel.match(filter.language) !== null) &&
      // Filter by education
      (filter.education === "" ||
        applicant.education
          .toLowerCase()
          .includes(filter.education.toLowerCase())) &&
      // Filter by job type (assuming preferJob is an array of job types)
      (filter.jobType === "Job Type" ||
        applicant.preferJob.some((job: any) =>
          job.toLowerCase().includes(filter.jobType.toLowerCase())
        ))
    );
  });

  // Update currentData to use filteredApplicants instead of defaultApplicants
  const currentData = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDetail = (id: number) => {
    setSelectedApplicantId(id);
    setIsDetail(true);
  };



  return (
    <>
      {(isLoading || isDetailLoading) && (
        <Loading
          isLoading={isLoading || isDetailLoading}
          className="h-[calc(100vh-68px)]"
        />
      )}
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
            Search Result{" "}
            <span className="text-secondaryColor">
              ({filteredApplicants.length})
            </span>
          </p>
        </div>
        <ApplicantTable applicants={currentData} handleDetail={handleDetail} />
        {filteredApplicants.length > 5 && (
          <Pagination
            data={filteredApplicants}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {isDetail && applicantDetail && (
          <div className="absolute top-0 left-0 bg-secondaryColor/50 w-full h-full p-2 flex justify-center items-center">
            <MatchedApplicants applicant={applicantDetail} />
            <button
              onClick={() => setIsDetail(false)}
              className="absolute top-3 right-3  bg-white w-10 h-10 rounded-full flex justify-center items-center text-secondaryColor"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

const applicantVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default ApplicantScreen;
