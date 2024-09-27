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

const MatchedScreend = () => {
  const [jobType, setJobType] = useState("Job Name");
  const [matchedType, setMatchedType] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(jp.matches));
  }, [dispatch]);
  const defaultJobType = [
    { id: 0, name: "All" },
    { id: 1, name: "Full Time" },
    { id: 2, name: "Part Time" },
    { id: 3, name: "Remote" },
    { id: 4, name: "Internship" },
  ];

  const handleJobType = (item: any) => setJobType(item.name);
  const handleShowDetail = () => {
    document.body.style.overflow = "hidden";
    setShowDetail((prev) => !prev);
  };

  const handleCloseDetail = () => {
    setShowDetail((prev) => !prev);
    document.body.style.overflowY = "auto";
  };

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
                matchedType === 0
                  ? "border-b border-primaryColor text-primaryColor"
                  : "text-gray-400"
              }`}
              onClick={() => setMatchedType(0)}
            >
              User who like you
            </button>
            <button
              className={`p-2 text-sm ${
                matchedType === 1
                  ? "border-b border-primaryColor text-primaryColor"
                  : "text-gray-400"
              }`}
              onClick={() => setMatchedType(1)}
            >
              Other Matches
            </button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex w-40 justify-between items-center gap-2 bg-primaryColor text-white px-4 py-1 rounded-md">
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
                <DropdownMenuItem
                  key={"z"+item.id}
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
         
            {matchedType === 0
              ? Array.from({ length: 10 }).map((_, index) => (
                  <motion.div
                    onClick={handleShowDetail}
                    key={100+index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex  space-y-5 flex-col items-center p-3">
                      <img
                        className="w-16 h-16 mb-3 rounded-full shadow-lg"
                        src={DefaultProfile}
                        alt="Bonnie image"
                      />
                      <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                        Bonnie Green
                      </h5>
                      <div className="flex gap-2 flex-row flex-wrap">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <span
                            key={"a"+index}
                            className="bg-primaryColor text-white text-xs px-2 py-1 rounded-full"
                          >
                            Prefer Job
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="flex flex-col gap-2 items-start">
                          <span className="flex gap-2 text-sm">
                            <p>Age:</p>
                            <p>25</p>
                          </span>
                          <span className="flex gap-2 text-sm">
                            <p>Gender:</p>
                            <p>Male</p>
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                          <span className="flex gap-2 text-sm">
                            <p>Live:</p>
                            <p>Myanmar</p>
                          </span>
                          <span className="flex gap-2 text-sm">
                            <p>Passport:</p>
                            <p>Yes</p>
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-6 w-full justify-evenly">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="size-8 text-secondaryColor/40 hover:scale-125 hover:text-secondaryColor transition-all duration-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>

                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8 text-primaryColor/40 hover:scale-125 hover:text-primaryColor transition-all duration-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    onClick={handleShowDetail}
                    key={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex  space-y-5 flex-col items-center p-3">
                      <img
                        className="w-16 h-16 mb-3 rounded-full shadow-lg"
                        src={DefaultProfile}
                        alt="Bonnie image"
                      />
                      <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                        Bonnie Green
                      </h5>
                      <div className="flex gap-2 flex-row flex-wrap">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <span
                            key={index}
                            className="bg-primaryColor text-white text-xs px-2 py-1 rounded-full"
                          >
                            Prefer Job
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="flex flex-col gap-2 items-start">
                          <span className="flex gap-2 text-sm">
                            <p>Age:</p>
                            <p>25</p>
                          </span>
                          <span className="flex gap-2 text-sm">
                            <p>Gender:</p>
                            <p>Male</p>
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                          <span className="flex gap-2 text-sm">
                            <p>Live:</p>
                            <p>Myanmar</p>
                          </span>
                          <span className="flex gap-2 text-sm">
                            <p>Passport:</p>
                            <p>Yes</p>
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-6 w-full justify-evenly">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="size-8 text-secondaryColor/40 hover:scale-125 hover:text-secondaryColor transition-all duration-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8 text-primaryColor/40 hover:scale-125 hover:text-primaryColor transition-all duration-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
        </div>
        {showDetail && (
          <motion.div key='matchDetail' className="absolute top-0 left-0 w-full h-full bg-black/50 z-50" variants={detailVariants} initial="initial" animate="animate" exit="exit">
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
            <MatchedApplicants applicant={userProfile} className="h-full" />
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

const cardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};



const detailVariants = {
  initial: { opacity: 0,x:100 },
  animate: { opacity: 1,x:0, transition: { duration: 0.2 } },
  exit: { opacity: 0,x:100, transition: { duration: 0.2 } },
};

export default MatchedScreend;
