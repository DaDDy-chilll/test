import { motion } from "framer-motion";
import { jp } from "@/lang/jp";
import defaultImage from "@/assets/icons/default_user.svg";
import moment from "moment";

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
  data?: any;
};

const ProfileDetail = ({ editHandler, data }: Props) => {
  const clickEditEvent = () => editHandler && editHandler(true);
  return (
    <motion.div
      key="complete"
      className="w-full h-[85vh] shadow-md bg-gradient-to-br from-gray-100 to-gray-200 p-8 pt-5 space-y-4 flex flex-col items-center relative overflow-y-auto"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-red-500">
          <img
            className="w-full h-full object-cover"
            src={
              data.photo
                ? `https://api.japanjob.exbrainedu.com/v1/file/photo/${data.photo}`
                : defaultImage
            }
            crossOrigin="anonymous"
            alt={data?.name || "会社プロフィール"}
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-bold text-2xl my-3 text-gray-800">
          {data?.name || jp.companyName}
        </h1>
        <p className="text-gray-600">{data?.email || "メールアドレス"}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {[
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            ),
            label: "所在地",
            value: data?.prefecture.name || "不明",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            ),
            label: "従業員数",
            value: `${data?.staff || 0}人`,
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
            ),
            label: "業種",
            value: data?.industry_type.name || "不明",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            ),
            label: "設立",
            value: moment(data?.starting).format("YYYY年MM月"),
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
            ),
            label: "住所",
            value: data?.address || "未指定",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            label: "予算",
            value: data?.budget ? `¥${data.budget.toLocaleString()}` : "未指定",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
          >
            {item.icon}
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="font-bold text-lg text-gray-800 mb-3">
          {jp.companyDescription}
        </h2>
        <p className="text-gray-700 bg-white p-4 rounded-lg shadow-sm">
          {data?.company_des || jp.noBasicJobDescription}
        </p>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className="bg-primaryColor hover:bg-red-300 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
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
