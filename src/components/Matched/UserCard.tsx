import React from "react";
import { motion } from "framer-motion";
import DefaultProfile from "@/assets/images/default.png";
import usePost from "@/hooks/usePost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import { apiRoutes } from "@/utils/apiRoutes";

type UserCardProps = {
  handleShowDetail: (id: number) => void;
  matchedData: any;
jobType: { id: number | null; name: string } | null;
};

const UserCard = ({
  handleShowDetail,
  matchedData,
  jobType,
}: UserCardProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { mutate: likeOrUnlikeMutate } = usePost({ token, queryKey: QueryKey.MATCHED });
  // const profile = `https://api.japanjob.exbrainedu.com/v1/file/photo/${matchedData.m_basicinfos.profile_path}` || null;

  const cardClick = () => {
      handleShowDetail(matchedData.id);
  };

  const likeorUnlikeHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (jobType) {
      const likeOrUnlike = event.currentTarget.name;
      likeOrUnlikeMutate({
        endpoint: likeOrUnlike === "like" ? apiRoutes.LIKE : apiRoutes.UNLIKE,
        body: { user_id: matchedData.id, jobs_id: jobType.id },
      });
    }
  };



  return (
    <motion.div
      onClick={cardClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer"
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
          <button onClick={likeorUnlikeHandler} name="unlike">
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
          <button onClick={likeorUnlikeHandler} name="like">
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
  );
};

const cardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default UserCard;
