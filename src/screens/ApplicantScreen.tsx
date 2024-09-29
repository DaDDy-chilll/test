import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "@/components/Applicants/FilterBar";
import ApplicantTable from "@/components/Applicants/ApplicantTable";
import { useEffect, useState, useRef } from "react";
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
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { jp } from "@/lang/jp";
import { userProfile } from "@/constants/mock";
import { QueryKey } from "@/utils/queryKey";
import { AppDispatch } from "@/store/store";
const itemsPerPage = 5;
const initialFilter: FilterType = {
  live_in_japan: "0",
  gender: "0",
  job_type: "",
};
const ApplicantScreen = () => {
  // if(import.meta.env.VITE_MAINTENANCE_MODE) return <Maintenance />
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const isInitialRender = useRef(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  // const [applicantDetail,setApplicantDetail] = useState<UserProfile>()
  const [selectedApplicantId, setSelectedApplicantId] = useState<
    number | string | null
  >(null);
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filter.live_in_japan !== "")
      params.append("live_in_japan", filter.live_in_japan);
    if (filter.gender !== "") params.append("gender", filter.gender);
    if (filter.job_type !== "") params.append("job_type", filter.job_type);
    if (currentPage > 0) params.append("page", currentPage.toString());
    return params.toString();
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKey.APPLICANTS, currentPage, filter],
    queryFn: () => {
      return fetchServer({
        endpoint: `${apiRoutes.APPLICANTS}?${buildQueryString()}`,
        method: "GET",
        token: token,
      });
    },
    enabled:
      !!token &&
      !!currentPage &&
      !!filter.live_in_japan &&
      !!filter.gender &&
      !!filter.job_type,
  });
  
  const {
    data: jobTypes,
    isLoading: isJobTypesLoading,
    isError: isJobTypesError,
    isSuccess: isJobTypesSuccess,
    error: jobTypesError,
  } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  // const {
  //   data: languages,
  //   isLoading: isLanguagesLoading,
  //   isError: isLanguagesError,
  //   isSuccess: isLanguagesSuccess,
  //   error: languagesError,
  // } = useFetch({
  //   endpoint: apiRoutes.LANGUAGE,
  //   key: QueryKey.LANGUAGES,
  //   token: token as string,
  // });

  const { data: applicantDetail, isLoading: isDetailLoading } = useQuery({
    queryKey: [QueryKey.APPLICANT_DETAIL, selectedApplicantId],
    queryFn: () => {
      return fetchServer({
        endpoint: `${apiRoutes.USER_DETAILS}/${selectedApplicantId}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!selectedApplicantId && isDetail,
  });

  const applicants = data?.data.users || [];

  const handleDetail = (id: string) => {
    setSelectedApplicantId(id);
    setIsDetail(true);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      // First run
      isInitialRender.current = false;
    }

    if (
      token ||
      currentPage ||
      filter.live_in_japan ||
      filter.gender ||
      filter.job_type
    ) {
      refetch();
    }
  }, [currentPage, filter, refetch, token]);

  useEffect(() => {
    dispatch(setTitle(jp.applicant));
  }, [dispatch]);

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
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          jobTypes={jobTypes}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex justify-start items-center px-4 py-2 z-10">
          <p className="text-gray-500 text-sm">
            Search Result{" "}
            <span className="text-secondaryColor">
              ({data?.data.totalUsers})
            </span>
          </p>
        </div>
        <ApplicantTable
          applicants={applicants}
          handleDetail={handleDetail}
          jobTypes={jobTypes}
        />
        <Pagination
          totalPages={data?.data.totalPages}
          currentPage={data?.data.currentPage}
          setCurrentPage={setCurrentPage}
        />
        <AnimatePresence>
          {isDetail && (
            <motion.div
              className="absolute top-0 left-0 bg-white w-full h-full z-50 flex justify-center items-center"
              variants={applicantDetailVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <MatchedApplicants
                applicantDetail={applicantDetail?.data}
                className="h-full w-full overflow-y-auto"
              />
              <button
                onClick={() => setIsDetail(false)}
                className="absolute top-3 left-3  bg-white w-10 h-10 rounded-full flex justify-center items-center text-secondaryColor"
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const applicantVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const applicantDetailVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
};

export default ApplicantScreen;
