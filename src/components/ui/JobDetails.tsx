import { motion } from "framer-motion";
import { jp } from "@/lang/jp";
import moment from "moment";
import { ConfirmationBox } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { useEffect } from "react";

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
  deleteHandler?: () => void;
  data?: any;
  setFormData?: (value: any) => void;
  showConfirmation?: boolean;
  setShowConfirmation: (value: boolean) => void;
  token?: string | null;
  setShowDetails: (value: boolean) => void;
  setIsEdit: (value: boolean) => void;
  setIsAdd: (value: boolean) => void;
};

const JobDetails = ({
  backHandler,
  editHandler,
  // deleteHandler,
  setFormData,
  data,
  showConfirmation,
  setShowConfirmation,
  token,
  setShowDetails,
  setIsEdit,
  setIsAdd,
}: Props) => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteJob,
    isPending: loading,
    isSuccess: success,
  } = useMutation({
    mutationFn: () => {
      return fetchServer({
        endpoint: `${apiRoutes.DELETE_JOB}/${data.id}`,
        method: "DELETE",
        token: token,
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        setShowConfirmation(false);
        setShowDetails(false);
        setIsEdit(false);
        setIsAdd(false);
      }, 500);
      queryClient.invalidateQueries({ queryKey: [QueryKey.JOBS] });
    },
  });

  const clickBackEvent = () => backHandler && backHandler(false);
  const clickDeleteEvent = () => deleteJob();
  const clickEditEvent = () => {
    editHandler && editHandler(true);
    setFormData && setFormData((prev: any) => ({ ...prev, id: data.id }));
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    clickDeleteEvent();
  };

  return (
    <motion.div
      key="complete"
      className="w-full bg-white shadow-lg rounded-lg overflow-hidden"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {data?.job_title || "Job Title"}
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          ¥ {data?.annual_salary || "Salary"}
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <InfoItem
            icon={<LocationIcon />}
            text={data?.prefecture.name || "Location"}
          />
          <InfoItem
            icon={<JobTypeIcon />}
            text={data?.job_type.job_type_jp || "Job Type"}
          />
          <InfoItem
            icon={<SalaryIcon />}
            text={`¥ ${data?.annual_salary || "Annual Salary"}`}
          />
          <InfoItem
            icon={<TimeIcon />}
            text={`${moment(data?.start_time, "HH:mm").format(
              "hh:mm A",
            )} - ${moment(data?.end_time, "HH:mm").format("hh:mm A")}`}
          />
          <InfoItem
            icon={<SupportIcon />}
            text={data?.support_home === 1 ? "Support Available" : "No Support"}
          />
          <InfoItem icon={<HolidayIcon />} text={jp.annualHoliday} />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {jp.jobDescription}
          </h2>
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: data?.job_des || "Job Description",
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
            onClick={clickBackEvent}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
          <div className="flex gap-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-2"
              onClick={() => setShowConfirmation(true)}
            >
              <DeleteIcon />
              {jp.delete}
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center gap-2"
              onClick={clickEditEvent}
            >
              <EditIcon />
              {jp.edit}
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ConfirmationBox
              message="削除してもよろしいですか？"
              onCancel={handleCancel}
              onConfirm={handleDelete}
              loading={loading}
              isSuccess={success}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
    {icon}
    <span className="text-gray-700">{text}</span>
  </div>
);

// Icons components (you can replace these with your SVG icons)
const LocationIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const JobTypeIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const SalaryIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const TimeIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const SupportIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const HolidayIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

export default JobDetails;
