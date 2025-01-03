import { motion, AnimatePresence } from "framer-motion";
import {
  FilterBar,
  ApplicantTable,
  Pagination,
  Loading,
  MatchedApplicants,
  UserProfileSkeleton,
} from "@/components";
import { useEffect, useState, useRef } from "react";
import { FilterType } from "@/types/helperTypes";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { jp } from "@/lang/jp";
import { QueryKey } from "@/utils/queryKey";
import { AppDispatch } from "@/store/store";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";

const initialFilter: FilterType = {
  live_in_japan: "",
  gender: "",
  job_type: "",
};

const ApplicantScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  let applicantID = location.state;
  const { token } = useSelector((state: RootState) => state.auth);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const isInitialRender = useRef(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<
    number | string | null
  >(null);

  /**
   * This function builds the query string based on the current filter and page
   * @returns {string} The query string
   * @author PSK
   */
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filter.live_in_japan !== "")
      params.append("live_in_japan", filter.live_in_japan);
    if (filter.gender !== "") params.append("gender", filter.gender);
    if (filter.job_type !== "") params.append("job_type", filter.job_type);
    if (currentPage > 0) params.append("page", currentPage.toString());
    return params.toString();
  };

  /**
   * Fetches the list of applicants based on the current filter and page
   * @returns {object} The list of applicants
   * @author PSK
   */
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

  /**
   * Fetches the list of job types
   * @returns {object} The list of job types
   * @author PSK
   */
  const { data: jobTypes, isLoading: isJobTypesLoading } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  /**
   * Fetches the details of a selected applicant
   * @returns {object} The details of the selected applicant
   * @author PSK
   */
  const {
    data: applicantDetail,
    isLoading: isDetailLoading,
    error: applicantDetailError,
  } = useQuery({
    queryKey: [QueryKey.APPLICANT_DETAIL, selectedApplicantId],
    queryFn: () => {
      if (!selectedApplicantId) return [];
      return fetchServer({
        endpoint: `${apiRoutes.USER_DETAILS}/${selectedApplicantId}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!selectedApplicantId && isDetail,
  });

  const applicants = data?.data.users || [];

  /**
   * Handles the selection of an applicant to view details
   * @param {string} id - The ID of the selected applicant
   * @author PSK
   */
  const handleDetail = (id: string) => {
    setSelectedApplicantId(id);
    setIsDetail(true);
  };

  /**
   * useEffect to refetch data when token, currentPage, or filter changes
   * @author PSK
   */
  useEffect(() => {
    if (isInitialRender.current) {
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

  /**
   * useEffect to set the title of the page
   * @author PSK
   */
  useEffect(() => {
    dispatch(setTitle(jp.applicant));
  }, [dispatch]);

  /**
   * useEffect to handle applicant detail when applicantID changes
   * @author PSK
   */
  useEffect(() => {
    if (applicantID) {
      handleDetail(applicantID.jobfinder_id);
    }
  }, [applicantID]);

  /**
   * useEffect to handle errors in fetching applicant details
   * @author PSK
   */
  useEffect(() => {
    if (applicantDetailError) {
      setIsDetail(false);
      setSelectedApplicantId(null);
    }
  }, [applicantDetailError]);

    //Windows Back Arrow handler
  useEffect(() => {
    const handlePopState = () => {
      if (isDetail && !applicantID) {
        setIsDetail(false);
        setSelectedApplicantId(null);
        applicantID = null;
        window.history.pushState(null, "", window.location.pathname);
      }else{
        setSelectedApplicantId(null);
        navigate(RouteName.CHAT, { state: applicantID })
      }
    };
    if (isDetail)  window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isDetail]);

  return (
    <>
      <Helmet>
        <title>{jp.applicant} - Japan Job</title>
      </Helmet>
      {isJobTypesLoading && (
        <div className="relative ">
          <Loading
            isLoading={isJobTypesLoading}
            className="h-[calc(100vh-68px)] left-0 top-0 z-50"
          />
        </div>
      )}
      <motion.main
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
            {jp.searchResult}{" "}
            <span className="text-secondaryColor">
              ({data?.data.totalUsers || 0})
            </span>
          </p>
        </div>
        <ApplicantTable
          applicants={applicants}
          handleDetail={handleDetail}
          jobTypes={jobTypes}
          loading={isLoading}
        />
        {applicants.length > 0 && (
          <Pagination
            totalPages={data?.data.totalPages}
            currentPage={data?.data.currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <AnimatePresence>
          {(isDetail || isDetailLoading) && (
            <motion.div
              className="absolute top-0 left-0 bg-white w-full h-full z-50 flex justify-center items-center"
              variants={applicantDetailVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {isDetailLoading ? (
                <UserProfileSkeleton />
              ) : (
                <MatchedApplicants
                  applicantDetail={applicantDetail?.data}
                  className="h-full w-full overflow-y-auto"
                />
              )}
              <button
                className="text-blue-600 hover:text-blue-800 font-medium flex gap-x-1 absolute bottom-1 left-3 "
                onClick={() => {
                  if (applicantID) {
                    setSelectedApplicantId(null);
                    navigate(RouteName.CHAT, { state: applicantID });
                  } else {
                    setIsDetail(false);
                  }
                }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
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
