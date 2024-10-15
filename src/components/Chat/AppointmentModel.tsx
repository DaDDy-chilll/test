import { useState } from "react";
import { Select } from "@/components";
import TimeSelect from "../ui/SelectTime";
import { Button } from "../ui/button";
import { jp } from "@/lang/jp";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Modal from "./Modal";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type AppointmentModelProps = {
  setIsAppointmentModelOpen: (isOpen: boolean) => void;
  userId: number;
  jobId: number;
};

interface MeetingData {
  user_id: number;
  job_id: number;
  date: string;
  start_time: string;
  end_time: string;
  initial: boolean;
}

const meetingTypeOptions = [
  { label: "直接面接", value: "direct" },
  { label: "管理者サポート", value: "admin" },
];

const defaultDirectInterview = {
  meetingType: {
    label: meetingTypeOptions[0].label,
    value: meetingTypeOptions[0].value,
  },
  date: "",
  start_time: "",
  end_time: "",
};

// const defaultAdminInterview = {
//   meetingType: {
//     label: meetingTypeOptions[1].label,
//     value: meetingTypeOptions[1].value,
//   },
// };

const AppointmentModel = ({
  setIsAppointmentModelOpen,
  userId,
  jobId,
}: AppointmentModelProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startMeetingTime, setStartMeetingTime] = useState<string>("9:00");
  const [endMeetingTime, setEndMeetingTime] = useState<string>("9:00");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [interview, setInterview] = useState(defaultDirectInterview);
  const [currentMeetingData, setCurrentMeetingData] =
    useState<MeetingData | null>(null);
  const handleCloseModel = () => setIsAppointmentModelOpen(false);
  const [validationData, setValidationData] = useState<any>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  // const handleDateSelect = (date: Date) => {
  //   setSelectedDate(date);
  // };
  const { mutate: postMeeting } = useMutation({
    mutationFn: (data: MeetingData) => {
      return fetchServer({
        endpoint: `${apiRoutes.INTERVIEW}`,
        method: "POST",
        token: token,
        body: data,
      });
    },
    onSuccess: (responseData) => {
      if (responseData.data) {
        setValidationData(responseData.data);
        setShowConfirmModal(true);
      } else {
        handleCloseModel();
      }
    },
  });

  const handleMakeAppointment = (isInitial: boolean) => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
    const mettingdata: MeetingData = {
      user_id: userId,
      job_id: jobId,
      date: formattedDate,
      start_time: startMeetingTime,
      end_time: endMeetingTime,
      initial: isInitial,
    };
    setCurrentMeetingData(mettingdata);
    postMeeting(mettingdata);
  };
  const handleConfirmRewrite = () => {
    if (currentMeetingData) {
      postMeeting({ ...currentMeetingData, initial: false });
    }
    setShowConfirmModal(false);
  };

  return (
    <>
      <motion.div
        className="bg-white flex flex-col justify-between absolute w-80 top-0 right-0 h-[calc(100vh-65px)] overflow-y-auto p-3 shadow-[-10px_0px_20px_-10px_rgba(0,0,0,0.3)] rounded-l-md"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div>
          <div className="flex items-center gap-2 justify-start">
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <p className="text-sm font-semibold">{jp.calendar}</p>
          </div>

          <div className="flex items-center  gap-5 pl-3 mt-3">
            <div className="w-[20px] h-[18px] bg-gray-300 rounded-full"></div>
            <Select
              label=""
              options={meetingTypeOptions}
              value={interview.meetingType}
              onChange={(e) => {
                setInterview({
                  ...interview,
                  meetingType: {
                    label: e.target.labels as unknown as string,
                    value: e.target.value,
                  },
                });
              }}
              defaultOption={interview.meetingType.label}
              className="border-none  mb-0 tracking-wider font-semibold"
            />
          </div>

          <AnimatePresence mode="wait">
            {interview.meetingType.value === "direct" && (
              <motion.div
                variants={interviewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-3 pl-5"
              >
                <div className="flex items-center justify-between mt-6">
                  <div className="text-xs font-bold flex items-center gap-3 ">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <p className="text-gray-500 text-sm">{jp.date}</p>
                  </div>

                  <div className="relative w-44">
                    <DatePicker
                      className="w-full text-sm border rounded p-1 border-gray-500 font-semibold text-center"
                      selected={
                        interview.date
                          ? moment(interview.date).toDate()
                          : moment().toDate()
                      }
                      onChange={(date: Date | null) => {
                        if (date) {
                          setInterview({
                            ...interview,
                            date: moment(date).format(
                              "YYYY-MM-DD",
                            ) as unknown as string,
                          });
                          setIsDatePickerVisible(false); // Optionally close the date picker after selecting a date
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 ">
                  <div className="text-xs font-bold flex items-center gap-3 ">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <p className="text-gray-500 text-sm">{jp.startTime}</p>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <TimeSelect
                      onTimeSelect={setEndMeetingTime}
                      dropStyle={1}
                    />
                    <TimeSelect
                      onTimeSelect={setEndMeetingTime}
                      dropStyle={1}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start mt-5  gap-2">
                  <p className="text-sm font-semibold text-secondaryColor">
                    Zoom又は Meet リンク
                  </p>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    className="w-full border-2 border-gray-900 rounded-md p-1 text-sm"
                  />
                </div>
              </motion.div>
            )}
            {interview.meetingType.value === "admin" && (
              <motion.div
                variants={interviewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pl-5 flex flex-col gap-y-10 mt-3"
              >
                <div>
                  <h1 className="text-normal font-bold text-secondaryColor">
                    第1希望時間
                  </h1>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs font-bold flex items-center gap-3 ">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">{jp.date}</p>
                    </div>

                    <div className="relative w-44">
                      <DatePicker
                        className="w-full text-sm border rounded p-1 border-gray-500 font-semibold text-center"
                        selected={
                          interview.date
                            ? moment(interview.date).toDate()
                            : moment().toDate()
                        }
                        onChange={(date: Date | null) => {
                          if (date) {
                            setInterview({
                              ...interview,
                              date: moment(date).format(
                                "YYYY-MM-DD",
                              ) as unknown as string,
                            });
                            setIsDatePickerVisible(false); // Optionally close the date picker after selecting a date
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 ">
                    <div className="text-xs font-bold flex items-center gap-3 ">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">{jp.startTime}</p>
                    </div>
                    <div className="flex items-center gap-3 ">
                      <TimeSelect
                        onTimeSelect={setEndMeetingTime}
                        dropStyle={1}
                      />
                      <TimeSelect
                        onTimeSelect={setEndMeetingTime}
                        dropStyle={1}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-normal font-bold text-secondaryColor">
                    第2希望時間
                  </h1>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs font-bold flex items-center gap-3 ">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">{jp.date}</p>
                    </div>

                    <div className="relative w-44">
                      <DatePicker
                        className="w-full text-sm border rounded p-1 border-gray-500 font-semibold text-center"
                        selected={
                          interview.date
                            ? moment(interview.date).toDate()
                            : moment().toDate()
                        }
                        onChange={(date: Date | null) => {
                          if (date) {
                            setInterview({
                              ...interview,
                              date: moment(date).format(
                                "YYYY-MM-DD",
                              ) as unknown as string,
                            });
                            setIsDatePickerVisible(false); // Optionally close the date picker after selecting a date
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 ">
                    <div className="text-xs font-bold flex items-center gap-3 ">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">{jp.startTime}</p>
                    </div>
                    <div className="flex items-center gap-3 ">
                      <TimeSelect
                        onTimeSelect={setEndMeetingTime}
                        dropStyle={1}
                      />
                      <TimeSelect
                        onTimeSelect={setEndMeetingTime}
                        dropStyle={1}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-normal font-bold text-secondaryColor">
                    第3希望時間
                  </h1>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs font-bold flex items-center gap-3 ">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">{jp.date}</p>
                    </div>

                    <div className="relative w-44">
                      <DatePicker
                        className="w-full text-sm border rounded p-1 border-gray-500 font-semibold text-center"
                        selected={
                          interview.date
                            ? moment(interview.date).toDate()
                            : moment().toDate()
                        }
                        onChange={(date: Date | null) => {
                          if (date) {
                            setInterview({
                              ...interview,
                              date: moment(date).format(
                                "YYYY-MM-DD",
                              ) as unknown as string,
                            });
                            setIsDatePickerVisible(false); // Optionally close the date picker after selecting a date
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 ">
                    <div className="text-xs font-bold flex items-center gap-3 ">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">{jp.startTime}</p>
                    </div>
                    <div className="flex items-center gap-3 ">
                      <TimeSelect
                        onTimeSelect={setEndMeetingTime}
                        dropStyle={1}
                      />
                      <TimeSelect
                        onTimeSelect={setEndMeetingTime}
                        dropStyle={1}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-10 ">
          <Button
            onClick={handleCloseModel}
            className="bg-gray-500 text-white "
          >
            {jp.cancel}
          </Button>
          <Button
            onClick={() => handleMakeAppointment(true)}
            variant="destructive"
            className="px-10"
          >
            {jp.makeAppointment}
          </Button>
        </div>
      </motion.div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">予約の上書き確認</h2>
          <p className="mb-4">
            この予約は既に存在します。上書きしてもよろしいですか？
          </p>

          {/* Add validation data display */}
          {validationData && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">既存の予約:</h3>
              <p>日付: {validationData.date}</p>
              <p>開始時間: {validationData.start_time}</p>
              <p>終了時間: {validationData.end_time}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={() => setShowConfirmModal(false)}
            >
              {jp.cancel}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmRewrite}
            >
              {jp.confirm}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const modalVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
};

const interviewVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};

export default AppointmentModel;
