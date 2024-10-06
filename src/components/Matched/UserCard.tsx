import React from "react";
import { motion } from "framer-motion";
import DefaultProfile from "@/assets/icons/default_user.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import { apiRoutes } from "@/utils/apiRoutes";
import { useEffect } from "react";
import moment from "moment";
type UserCardProps = {
  handleShowDetail: (id: number) => void;
  matchedData: any;
  jobType: { id: number | null; name: string } | null;
  likeorUnlikeHandler: (
    event: React.MouseEvent<HTMLButtonElement>,
    user_id: number
  ) => void;
};

const UserCard = ({
  handleShowDetail,
  matchedData,
  jobType,
  likeorUnlikeHandler,
}: UserCardProps) => {
  // const profile = `https://api.japanjob.exbrainedu.com/v1/file/photo/${matchedData.m_basicinfos.profile_path}` || null;

  const cardClick = () => {
    handleShowDetail(matchedData.id);
  };
  const { m_preferred_jobs, m_basicinfos } = matchedData;
  console.log("m_preferred_jobs", m_preferred_jobs);
  const profileImage = `https://api.japanjob.exbrainedu.com/v1/file/photo/${m_basicinfos.profile_path}`;

  return (
    <motion.div
      onClick={cardClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex w-full h-full  justify-between flex-col items-center p-3">
        <img
          className="w-16 h-16 mb-3 rounded-full shadow-lg"
          src={m_basicinfos.profile_path ?  profileImage :  DefaultProfile}
          alt={m_basicinfos.name}
          crossOrigin="anonymous"
        />
        <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
          {m_basicinfos.name}
        </h5>
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="flex flex-col gap-2 items-start">
            <span className="flex gap-2 text-sm">
              <p>Age:</p>
              <p>{moment(m_basicinfos.dob).fromNow().split(" ")[0]}</p>
            </span>
            <span className="flex gap-2 text-sm">
              <p>Gender:</p>
              <p>{m_basicinfos.gender === 1 ? "Male" : "Female"}</p>
            </span>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <span className="flex gap-2 text-sm">
              <p>Live:</p>
              <p>{m_basicinfos.live_in_japan === 1 ? "Japan" : "Myanmar"}</p>
            </span>
            <span className="flex gap-2 text-sm">
              <p>Passport:</p>
              <p>{m_basicinfos.has_passport === 1 ? "Yes" : "No"}</p>
            </span>
          </div>
        </div>
        <div className="flex mt-4 md:mt-6 w-full justify-evenly">
          <button
            onClick={(event) => likeorUnlikeHandler(event, matchedData.id)}
            name="unlike"
          >
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
          <button
            onClick={(event) => likeorUnlikeHandler(event, matchedData.id)}
            name="like"
          >
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
