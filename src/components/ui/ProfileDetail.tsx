import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { jp } from "@/lang/jp";
import defaultImage from '@/assets/icons/default_user.svg';
import moment from 'moment';
type formData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  address: string;
};

type Props = {
  formData?: formData;
  backHandler?: (value: boolean) => void;
  editHandler?: (value: boolean) => void;
  data?: any
};
const ProfileDetail = ({
  formData,
  backHandler,
  editHandler,
  data
}: Props) => {
  //   const clickBackEvent = () => backHandler && backHandler(false);
  const clickEditEvent = () => editHandler && editHandler(true);
  console.log('profile',data);
  return (
    <motion.div
      key="complete"
      className="w-full h-[85vh] shadow-md bg-gray-100 p-8 pt-10 space-y-2 flex flex-col items-center relative"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div>
        <Avatar className="w-20 h-20">
          <AvatarImage src={defaultImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-xl my-3">{data?.name || jp.companyName}</h1>
        <p className="text-gray-500">{data?.email || "Email"}</p>
      </div>
      <div className="flex justify-center gap-4 space-x-20 pt-6 pb-5">
        <span className="flex items-center gap-2">
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
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p>{data?.prefecture.name || "Location"}</p>
        </span>


        <span className="flex items-center gap-2">
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
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          <p>{data?.staff || 0} {jp.employees}</p>
        </span>


        <span className="flex items-center gap-2">
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
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p>{data?.industry_type.name || "Job Type"}</p>
        </span>

      </div>

      <div className="flex justify-start w-full">
        <h1 className="font-bold text-bg text-left px-10 pb-3">{jp.companyDescription}</h1>
      </div>
      <div className="overflow-y-auto w-full px-10 space-y-3">
        <p className="text-gray-500">
          {data?.company_des || jp.noBasicJobDescription}
        </p>
      </div>

      <div className="flex items-center gap-4 absolute top-2 right-2">
        <button
          className="bg-gray-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-3"
          onClick={clickEditEvent}
        >
          <svg
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8337 5.0327C16.8343 4.92302 16.8133 4.81431 16.7718 4.71277C16.7303 4.61124 16.6692 4.5189 16.592 4.44103L13.0587 0.907696C12.9808 0.830462 12.8885 0.769357 12.7869 0.727887C12.6854 0.686416 12.5767 0.665395 12.467 0.66603C12.3573 0.665395 12.2486 0.686416 12.1471 0.727887C12.0456 0.769357 11.9532 0.830462 11.8753 0.907696L9.51701 3.26603L0.408673 12.3744C0.331438 12.4522 0.270334 12.5446 0.228863 12.6461C0.187393 12.7476 0.166372 12.8564 0.167006 12.966V16.4994C0.167006 16.7204 0.254803 16.9323 0.411084 17.0886C0.567364 17.2449 0.779326 17.3327 1.00034 17.3327H4.53367C4.65028 17.339 4.76692 17.3208 4.87602 17.2792C4.98513 17.2375 5.08427 17.1734 5.16701 17.091L14.2253 7.9827L16.592 5.66603C16.6681 5.58526 16.73 5.49231 16.7753 5.39103C16.7834 5.3246 16.7834 5.25745 16.7753 5.19103C16.7792 5.15224 16.7792 5.11315 16.7753 5.07436L16.8337 5.0327ZM4.19201 15.666H1.83367V13.3077L10.1087 5.0327L12.467 7.39103L4.19201 15.666ZM13.642 6.21603L11.2837 3.8577L12.467 2.6827L14.817 5.0327L13.642 6.21603Z"
              fill="white"
            />
          </svg>
          {jp.edit}
        </button>

      </div>
    </motion.div>
  );
};

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};

export default ProfileDetail;
