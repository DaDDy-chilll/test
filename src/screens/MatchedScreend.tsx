/* eslint-disable react-hooks/exhaustive-deps */
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MatchedApplicants,
  Loading,
  UserCard,
  DefaultCard,
  UserProfileSkeleton,
} from "@/components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { jp } from "@/lang/jp";

import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchServer } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { CardSkeleton, ConfirmationBox } from "@/components";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";

const MatchedScreend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useSelector((state: RootState) => state.auth);
  const [matchedUsers, setMatchedUsers] = useState<any>([]);
  const [jobType, setJobType] = useState<{ id: number | null; name: string }>({
    id: null,
    name: "",
  });

  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [prevData, setPrevData] = useState<{
    jobId: number | null;
    like: boolean | null;
  }>({ jobId: null, like: null });

  /**
   * This function builds the query string for the API request
   * @author PSK
   * @returns {string} The query string
   */
  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("liked", liked.toString());
    if (page > 0) params.append("page", page.toString());
    if (limit > 0) params.append("limit", limit.toString());
    return params.toString();
  };

  /**
   * This query fetches the job name type data
   * @author PSK
   */
  const {
    data: jobNameType,
    isLoading: jobNameTypeLoading,
    isSuccess: jobNameTypeSuccess,
  } = useQuery({
    queryKey: [QueryKey.JOBS],
    queryFn: () =>
      fetchServer({
        endpoint: apiRoutes.JOBS,
        method: "GET",
        token: token,
      }),
    enabled: !!token,
  });

  const defaultJobType =
    jobNameType?.data?.map((item: any) => ({
      id: item.id,
      name: item.job_title,
    })) || [];

  /**
   * This query fetches the matched data
   * @author PSK
   */
  const {
    data: matchedData,
    isLoading,
    refetch,
    isSuccess: matchedDataSuccess,
  } = useQuery({
    queryKey: [QueryKey.MATCHED, jobType?.id, page, liked, limit],
    queryFn: () => {
      if (!jobType.id) return [];
      return fetchServer({
        endpoint: `${apiRoutes.MATCHED}/${jobType.id}?${buildQueryString()}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!jobType.id && !!page && !!liked && !!limit,
  });

  /**
   * This query fetches the applicant detail
   * @author PSK
   */
  const { data: applicantDetail, isLoading: isDetailLoading } = useQuery({
    queryKey: [QueryKey.MATCHED_DETAIL],
    queryFn: () => {
      if (!showDetail) return [];
      return fetchServer({
        endpoint: `${apiRoutes.USER_DETAILS}/${showDetail}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!showDetail,
  });

  /**
   * This mutation handles the like or unlike action
   * @author PSK
   */
  const {
    mutate: likeOrUnlikeMutate,
    isPending,
    isSuccess: likeOrUnlikeSuccess,
  } = useMutation({
    mutationFn: ({ endpoint, body }: any) => {
      return fetchServer({
        endpoint,
        method: "POST",
        body,
        token: token,
      });
    },
    onSuccess: () => {
      if (liked) {
        setShowConfirmation(true);
      }
      queryClient.invalidateQueries({ queryKey: [QueryKey.MATCHED] });
    },
  });

  /**
   * This function handles the job type selection
   * @author PSK
   * @param {Object} item - The selected job type
   */
  const handleJobType = (item: { id: number; name: string }) =>
    setJobType(item);

  /**
   * This function handles showing the detail of a user
   * @author PSK
   * @param {number} id - The ID of the user to show details for
   */
  const handleShowDetail = (id: number) => {
    document.body.style.overflow = "hidden";
    setShowDetail(id);
  };

  /**
   * This function handles closing the detail view
   * @author PSK
   */
  const handleCloseDetail = () => {
    setShowDetail(null);
    document.body.style.overflowY = "auto";
  };

  /**
   * This function handles adding more matched users
   * @author PSK
   */
  const handleAddMore = () => {
    if (matchedData?.data.totalUsers !== matchedUsers?.length) {
      setLimit((prev) => prev + 4);
    }
  };

  /**
   * This function adds more matched users to the state
   * @author PSK
   * @param {Array} data - The new matched users data
   */
  const addMoreMatchedUsers = (data: any) => {
    setMatchedUsers((prev: any) => {
      if (jobType.id !== prevData.jobId || liked !== prevData.like) {
        return data;
      }
      const existingIds = new Set(prev.map((user: any) => user.id));
      const newUsers = data.filter((user: any) => !existingIds.has(user.id));
      return [...prev, ...newUsers];
    });
    setPrevData({ jobId: jobType.id, like: liked });
  };

  /**
   * This function handles the like or unlike action
   * @author PSK
   * @param {Object} event - The event object
   * @param {number} user_id - The ID of the user to like or unlike
   */
  const likeorUnlikeHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    user_id: number,
  ) => {
    event.stopPropagation();
    const likeOrUnlike = event.currentTarget.name;
    if (jobType) {
      likeOrUnlikeMutate({
        endpoint: likeOrUnlike === "like" ? apiRoutes.LIKE : apiRoutes.UNLIKE,
        body: { user_id: user_id, jobs_id: jobType.id },
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.MATCHED] });
    }
  };

  /**
   * This function handles canceling the confirmation
   * @author PSK
   */
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    navigate(RouteName.CHAT);
  };

  /**
   * This function handles navigating to the job page
   * @author PSK
   */
  const handleNavigateToJob = () => {
    navigate(RouteName.JOBS);
  };

  /**
   * This useEffect sets the title of the page
   * @author PSK
   */
  useEffect(() => {
    dispatch(setTitle(jp.matches));
  }, [dispatch]);

  /**
   * This useEffect sets the default job type if job name type data is successful
   * @author PSK
   */
  useEffect(() => {
    if (jobNameTypeSuccess && defaultJobType.length > 0) {
      setJobType(defaultJobType[0]);
    }
  }, [jobNameTypeSuccess]);

  /**
   * This useEffect adds more matched users if matched data is successful
   * @author PSK
   */
  useEffect(() => {
    if (matchedDataSuccess && matchedData?.data?.users) {
      addMoreMatchedUsers(matchedData.data.users);
    }
  }, [matchedDataSuccess, matchedData?.data?.users, jobType.id, liked]);

  /**
   * This useEffect refetches the matched data when job type, liked, page, or limit changes
   * @author PSK
   */
  useEffect(() => {
    if (jobType.id) {
      setPage(1);
      setLimit(3);
      refetch();
    }
  }, [jobType.id, liked, refetch]);

  /**
   * This useEffect refetches the matched data when page, limit, or likeOrUnlikeSuccess changes
   * @author PSK
   */
  useEffect(() => {
    if (page > 1 || limit > 3 || likeOrUnlikeSuccess) {
      refetch();
    }
  }, [page, limit, likeOrUnlikeSuccess, refetch]);

  return (
    <>
      <Helmet>
        <title>{jp.matches} - Japan Job</title>
      </Helmet>
      {(isPending || jobNameTypeLoading) && (
        <Loading
          isLoading={isPending || jobNameTypeLoading}
          className="h-[calc(100vh-68px)]"
        />
      )}
      {showConfirmation && (
        <ConfirmationBox
          message={jp.goToChat}
          onConfirm={handleCancelConfirmation}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      <motion.main
        variants={matchedVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full py-3 relative"
      >
        <div className="flex justify-between px-3">
          <div className="flex gap-4">
            <button
              className={`p-2 text-sm ${
                liked
                  ? "border-b border-primaryColor text-primaryColor"
                  : "text-gray-400"
              }`}
              onClick={() => setLiked(true)}
            >
              {jp.userLikeYou}
            </button>
            <button
              className={`p-2 text-sm ${
                !liked
                  ? "border-b border-primaryColor text-primaryColor"
                  : "text-gray-400"
              }`}
              onClick={() => setLiked(false)}
            >
              {jp.otherMatches}
            </button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex w-auto justify-between items-center gap-2 bg-primaryColor text-white px-4 py-1 rounded-md">
                <p className="text-sm mr-3">
                  {jobType.name || jp.chooseJobType}
                </p>
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
            <DropdownMenuContent
              className={` ${
                defaultJobType.length > 5
                  ? "overflow-y-auto h-[11rem]"
                  : "overflow-y-hidden"
              }`}
            >
              {defaultJobType.length > 0 &&
                defaultJobType.map((item: { id: number; name: string }) => (
                  <DropdownMenuItem
                    key={"z" + item.id}
                    onClick={() => handleJobType(item)}
                  >
                    <p>{item.name}</p>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AnimatePresence>
          <div className="grid grid-cols-4 gap-2 p-2 h-[calc(100vh-130px)] overflow-y-auto auto-rows-[350px]">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : matchedData && matchedData?.data?.users?.length > 0 ? (
              <>
                {matchedData?.data?.users.map((item: any) => (
                  <UserCard
                    key={item.id}
                    handleShowDetail={handleShowDetail}
                    matchedData={item}
                    jobType={jobType}
                    likeorUnlikeHandler={likeorUnlikeHandler}
                  />
                ))}
                <DefaultCard
                  hasMore={matchedData?.data?.totalUsers > matchedUsers?.length}
                  click={handleAddMore}
                />
              </>
            ) : (
              <div className="text-center  flex-col gap-4 text-gray-400 col-span-4 h-full flex justify-center items-center">
                <svg
                  width="152px"
                  height="152px"
                  viewBox="0 0 24.00 24.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="0.4"
                      d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z"
                      stroke="#292D32"
                      strokeWidth="0.672"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      opacity="0.4"
                      d="M16.9675 14.4402C18.3375 14.6702 19.8475 14.4302 20.9075 13.7202C22.3175 12.7802 22.3175 11.2402 20.9075 10.3002C19.8375 9.59016 18.3075 9.35016 16.9375 9.59016"
                      stroke="#292D32"
                      strokeWidth="0.672"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      opacity="0.4"
                      d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z"
                      stroke="#292D32"
                      strokeWidth="0.672"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      opacity="0.4"
                      d="M6.9975 14.4402C5.6275 14.6702 4.1175 14.4302 3.0575 13.7202C1.6475 12.7802 1.6475 11.2402 3.0575 10.3002C4.1275 9.59016 5.6575 9.35016 7.0275 9.59016"
                      stroke="#292D32"
                      strokeWidth="0.672"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      d="M12.0001 14.6302C11.9401 14.6202 11.8701 14.6202 11.8101 14.6302C10.4301 14.5802 9.33008 13.4502 9.33008 12.0502C9.33008 10.6202 10.4801 9.47021 11.9101 9.47021C13.3401 9.47021 14.4901 10.6302 14.4901 12.0502C14.4801 13.4502 13.3801 14.5902 12.0001 14.6302Z"
                      stroke="#292D32"
                      strokeWidth="0.672"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      d="M9.0907 17.7804C7.6807 18.7204 7.6807 20.2603 9.0907 21.2003C10.6907 22.2703 13.3107 22.2703 14.9107 21.2003C16.3207 20.2603 16.3207 18.7204 14.9107 17.7804C13.3207 16.7204 10.6907 16.7204 9.0907 17.7804Z"
                      stroke="#292D32"
                      strokeWidth="0.672"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </g>
                </svg>
                <p className="text-gray-500 text-lg">{jp.noMatchesYet}</p>
              </div>
            )}
          </div>
          {(showDetail || isDetailLoading) && (
            <motion.div
              key="matchDetail"
              className="absolute top-0 left-0 w-full h-full bg-gray-100 z-50"
              variants={detailVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className="w-full h-full relative">
                {isDetailLoading ? (
                  <UserProfileSkeleton />
                ) : (
                  <MatchedApplicants
                    applicantDetail={applicantDetail?.data}
                    className="h-full w-full overflow-y-auto"
                    onBack={handleCloseDetail}
                  />
                )}
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium flex gap-x-1 absolute bottom-3 left-3 "
                  onClick={handleCloseDetail}
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
                {/* <button
                  onClick={handleCloseDetail}
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
                </button> */}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      {defaultJobType.length === 0 && jobNameTypeSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[36%] h-[30%] pt-10 pb-8 px-14 flex flex-col justify-between rounded-lg shadow-lg">
            <p className="mb-4">{jp.createJobFirst}</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleNavigateToJob}
              >
                {jp.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const matchedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const detailVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
};

export default MatchedScreend;
