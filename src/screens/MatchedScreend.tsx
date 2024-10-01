import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
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

let MATCHED_USERS: any;

const MatchedScreend = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [jobType, setJobType] = useState<{ id: number | null; name: string }>({
    id: null,
    name: "",
  });
  const [matchedType, setMatchedType] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(4);
  const dispatch = useDispatch();

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

  console.log("matchedData", matchedData);

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

  useEffect(() => {
    if (jobNameTypeSuccess && defaultJobType.length > 0) {
      setJobType(defaultJobType[0]);
    }
  }, [jobNameTypeSuccess]);
  useEffect(() => {
    dispatch(setTitle(jp.matches));
  }, [dispatch]);

  useEffect(() => {
    if (page > 0 && limit > 0 && jobType.id) {
      refetch();
    }
  }, [page, liked, limit, jobType]);

  return (
    <>
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
          <div className="grid grid-cols-4 grid-flow-row gap-2 p-2 h-[calc(100vh-150px)] overflow-y-auto">
            {matchedData && matchedData?.data?.users?.length > 0 ? (
              matchedData?.data?.users?.map((item: any) => (
                <UserCard
                  key={item.id}
                  handleShowDetail={handleShowDetail}
                  matchedData={item}
                  jobType={jobType}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 col-span-4 h-full flex justify-center items-center">
                No Matchde Users found
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

export default MatchedScreend;
