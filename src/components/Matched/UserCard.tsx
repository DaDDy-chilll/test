import React from "react";
import { motion } from "framer-motion";
import DefaultProfile from "@/assets/icons/default_user.svg";
import moment from "moment";
import { jp } from "@/lang/jp";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type UserCardProps = {
  handleShowDetail: (id: number) => void;
  matchedData: any;
  jobType: { id: number | null; name: string } | null;
  likeorUnlikeHandler: (
    event: React.MouseEvent<HTMLButtonElement>,
    user_id: number,
  ) => void;
};

const UserCard = ({
  handleShowDetail,
  matchedData,
  likeorUnlikeHandler,
}: UserCardProps) => {
  const { imgUrl } = useSelector((state: RootState) => state.app);
  const { m_basicinfos } = matchedData;
  const profileImage = `${imgUrl}photo/${m_basicinfos.profile_path}`;
  const cardClick = () => handleShowDetail(matchedData.id);

  return (
    <motion.div
      onClick={cardClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex w-full h-full  flex-col items-center py-3 px-2">
        <img
          className="w-16 h-16 mb-3 rounded-full shadow-lg"
          src={m_basicinfos.profile_path ? profileImage : DefaultProfile}
          alt={m_basicinfos.name}
          crossOrigin="anonymous"
        />
        <h5 className="my-2 text-lg font-medium text-gray-900 dark:text-white">
          {m_basicinfos.name}
        </h5>
        <div className="flex flex-row justify-center items-center  gap-x-6 w-full bg-gray-300 rounded-sm h-40">
          <div className="flex flex-col gap-y-6 h-full justify-center">
            <span className="flex gap-2 text-normal font-medium text-gray-700">
              <p>{jp.age}:</p>
              <p className="font-semibold">{moment(m_basicinfos.dob).fromNow().split(" ")[0]} {jp.year}</p>
            </span>
            <span className="flex gap-2 text-normal font-medium text-gray-700">
              <p>{jp.gender}:</p>
              <p className="font-semibold">{m_basicinfos.gender === 0 ? jp.male : jp.female}</p>
            </span>
          </div>
          <div className="flex flex-col gap-y-6 h-full justify-center">
            <span className="flex gap-2 text-normal font-medium text-gray-700">
              <p>{jp.location}:</p>
              <p className="font-semibold">{m_basicinfos.live_in_japan === 1 ? jp.japan : jp.myanmar}</p>
            </span>
            <span className="flex gap-2 text-normal font-medium text-gray-700">
              <p>{jp.passport}:</p>
              <p className={`font-semibold ${m_basicinfos.has_passport === 1 ? 'text-green-500':'text-red-500'}`}>{m_basicinfos.has_passport === 1 ? jp.yes : jp.no}</p>
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
