import { motion } from "framer-motion";
import { jp } from "@/lang/jp";
import defaultImage from "@/assets/icons/default_user.svg";
import {
  CEO,
  Manager,
  JobType,
  Staff,
  Location,
  Money,
  Youtube,
  Facebook,
  Instagram,
  Website,
  Phone,
  CompanyAddress,
  CompanyCalendar
} from "@/assets";
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
      className="w-full  shadow-md bg-gradient-to-br from-gray-100 to-gray-200 pb-8 px-20 pt-5 space-y-4 flex flex-col items-center relative overflow-y-auto"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={
              data.photo
                ? `${import.meta.env.VITE_SERVER_URL}/file/photo/${data.photo}`
                : defaultImage
            }
            crossOrigin="anonymous"
            alt={data?.name || "会社プロフィール"}
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-bold text-2xl my-3 text-gray-800">
          {data?.name || jp.companyName} {data?.code ? `(${data?.code})` : ""}
        </h1>
        <p className="text-gray-600">
          {data?.secondary_email || "メールアドレス"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full ">
        {[
          {
            icon: <CEO className="size-7" />,
            label: jp.chairman,
            value: data?.ceo || "",
          },
          {
            icon: <Manager className="size-7" />,
            label: jp.undertake,
            value: data?.manager || "",
          },
          {
            icon: <JobType className="size-7" />,
            label: jp.industry,
            value: data?.industry_type.name || "",
          },
          {
            icon: <Staff className="size-7" />,
            label: jp.employeeNumber,
            value: `${data?.staff || 0}人`,
          },
          {
            icon: <Money className="size-7" />,
            label: jp.investmentAmount,
            value: data?.budget ? `¥${data.budget.toLocaleString()}` : "",
          },
          {
            icon: <Phone className="size-7" />,
            label: jp.phoneNumber,
            value: data?.phone_number || "",
          },
          {
            icon: <Location className="size-7" />,
            label: `${jp.city} / ${jp.area}`,
            value:
              data?.prefecture || data?.area
                ? `${data?.prefecture || ""} / ${data?.area || ""}`
                : "",
          },
          {
            icon: <CompanyAddress className="size-7" />,
            label: jp.companyAddress,
            value: data?.address || "",
          },
          {
            icon: <CompanyCalendar className="size-7" />,
            label: jp.establishment,
            value: data?.starting || "",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-5 bg-white p-3 rounded-lg shadow-sm h-24 `}
          >
            <div>{item.icon}</div>
            <div className="flex flex-col gap-y-1">
              <p
                className={`${item.value ? "text-sm text-gray-500" : "text-lg text-gray-900"}`}
              >
                {item.label}
              </p>
              {item.value && (
                <p className="font-semibold text-gray-800">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className=" md:grid-cols-2 gap-6 w-full">
        <div className="w-full flex flex-col gap-y-1">
          <h2 className="font-bold text-lg text-gray-800 mb-3">
            {jp.companyDescription}
          </h2>
          <p className="flex items-center gap-5 bg-white p-6 rounded-lg shadow-sm  overflow-x-auto text-sm">
            {data?.company_des}
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl items-center justify-center flex gap-x-10 pt-8 py-10">
        {data?.fb_url && (
          <a href={data?.fb_url} target="_blank">
            <Facebook className="size-10 text-gray-500 hover:text-primaryColor transition-all duration-500 ease-in-out" />
          </a>
        )}

        {data?.yt_url && (
          <a href={data?.yt_url} target="_blank" className="">
            <Youtube className="size-12 text-gray-500 hover:text-primaryColor transition-all duration-500 ease-in-out" />
          </a>
        )}

        {data?.ig_url && (
          <a href={data?.ig_url} target="_blank" className="">
            <Instagram className="size-10 text-gray-500 hover:text-primaryColor transition-all duration-500 ease-in-out" />
          </a>
        )}

        {data?.web_url && (
          <a href={data?.web_url} target="_blank" className="">
            <Website className="size-12 text-gray-500 hover:text-primaryColor transition-all duration-500 ease-in-out" />
          </a>
        )}
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
