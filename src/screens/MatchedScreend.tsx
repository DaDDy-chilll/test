import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState, useCallback } from "react";
import MatchedApplicants from "@/components/Matched/MatchedApplicants";
import { UserProfile } from "@/types/user";
import Loading from "@/components/ui/Loading";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { jp } from "@/lang/jp";
import DefaultProfile from "@/assets/images/default.png";
import { userProfile } from "@/constants/mock";
import UserCard from "@/components/Matched/UserCard";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchServer } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import DefaultCard from "@/components/Matched/DefaultCard";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const MatchedScreend = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { token } = useSelector((state: RootState) => state.auth);
  const [matchedUsers, setMatchedUsers] = useState<any>([]);
  const [jobType, setJobType] = useState<{ id: number | null; name: string }>({
    id: null,
    name: "",
  });
  const [matchedType, setMatchedType] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [prevData, setPrevData] = useState<{
    jobId: number | null;
    like: boolean | null;
  }>({ jobId: null, like: null });
  const { mutate: likeOrUnlikeMutate, isSuccess } = usePost({
    token,
    queryKey: QueryKey.MATCHED,
  });

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("liked", liked.toString());
    if (page > 0) params.append("page", page.toString());
    if (limit > 0) params.append("limit", limit.toString());
    return params.toString();
  };

  const {
    data: jobNameType,
    isLoading: jobNameTypeLoading,
    isError: jobNameTypeError,
    isSuccess: jobNameTypeSuccess,
    error: fetchError,
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

  // console.log('matchedData',matchedData);

  const handleJobType = (item: { id: number; name: string }) =>
    setJobType(item);
  const handleShowDetail = (id: number) => {
    document.body.style.overflow = "hidden";
    setShowDetail(id);
  };

  const handleCloseDetail = () => {
    setShowDetail(null);
    document.body.style.overflowY = "auto";
  };

  const handleAddMore = () => {
    if (matchedData?.data.totalUsers !== matchedUsers?.length) {
      setLimit((prev) => prev + 4);
    }
  };

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

  const likeorUnlikeHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, user_id: number) => {
      event.stopPropagation();
      if (jobType) {
        const likeOrUnlike = event.currentTarget.name;
        likeOrUnlikeMutate({
          endpoint: likeOrUnlike === "like" ? apiRoutes.LIKE : apiRoutes.UNLIKE,
          body: { user_id: user_id, jobs_id: jobType.id },
        });
      }
      queryClient.invalidateQueries({ queryKey: [QueryKey.MATCHED] });
    },
    [jobType, likeOrUnlikeMutate, queryClient]
  );

  useEffect(() => {
    dispatch(setTitle(jp.matches));
  }, [dispatch]);

  useEffect(() => {
    if (jobNameTypeSuccess && defaultJobType.length > 0) {
      setJobType(defaultJobType[0]);
    }
  }, [jobNameTypeSuccess]);

  useEffect(() => {
    if (matchedDataSuccess && matchedData?.data?.users) {
      addMoreMatchedUsers(matchedData.data.users);
    }
  }, [matchedDataSuccess, matchedData?.data?.users?.length, jobType.id, liked]);

  useEffect(() => {
    if (jobType.id) {
      console.log("change job type");
      setPage(1);
      setLimit(3);
      refetch();
    }
  }, [jobType.id, liked]);

  useEffect(() => {
    if (page > 1 || limit > 3) {
      refetch();
    }
  }, [page, limit, isSuccess]);

  return (
    <>
         <Helmet>
      <title>{jp.matches} - Japan Job</title>
    </Helmet>
      {false && <Loading isLoading={false} className="h-[calc(100vh-68px)]" />}
      <motion.div
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
              User who like you
            </button>
            <button
              className={`p-2 text-sm ${
                !liked
                  ? "border-b border-primaryColor text-primaryColor"
                  : "text-gray-400"
              }`}
              onClick={() => setLiked(false)}
            >
              Other Matches
            </button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex w-auto justify-between items-center gap-2 bg-primaryColor text-white px-4 py-1 rounded-md">
                <p className="text-sm mr-3">{jobType.name}</p>
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
          <div className="grid grid-cols-4   grid-flow-row gap-2 p-2 h-[calc(100vh-150px)] overflow-y-auto">
            {matchedData && matchedData?.data?.users?.length > 0 ? (
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
              <div className="text-center text-gray-400 col-span-4 h-full flex justify-center items-center">
                No Matched Users found
              </div>
            )}
          </div>
          {showDetail && (
            <motion.div
              key="matchDetail"
              className="absolute top-0 left-0 w-full h-full bg-black/50 z-50"
              variants={detailVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className="w-full h-full relative">
                <button
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
                </button>
                <MatchedApplicants
                  applicantDetail={applicantDetail?.data}
                  className="h-full w-full overflow-y-auto"
                />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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

export default React.memo(MatchedScreend);
