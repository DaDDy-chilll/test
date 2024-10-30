import { useEffect, useState } from "react";
import { Select, InterviewDatePicker, ConfirmationBox } from "@/components";
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
import "react-datepicker/dist/react-datepicker.css";
import useHandleError from "@/hooks/useHandleError";
import { AuthErrorType } from "@/types/helperTypes";
import { QueryKey } from "@/utils/queryKey";
import { useQueryClient } from "@tanstack/react-query";

type AppointmentModelProps = {
  setIsAppointmentModelOpen: (isOpen: boolean) => void;
  userId: number;
  jobId: number;
};

interface MeetingData {
  user_id: number;
  job_id: number;
  direct?: {
    date: string;
    start_time: string;
    end_time: string;
    zoom_link: string;
  };
  req_admin?: {
    first_date: string;
    first_start_time: string;
    first_end_time: string;
    second_date: string;
    second_start_time: string;
    second_end_time: string;
    third_date: string;
    third_start_time: string;
    third_end_time: string;
  };
}

const meetingTypeOptions = [
  { label: "直接面接", value: "direct" },
  { label: "管理者サポート", value: "admin" },
];

const defaultDirectInterview = {
  meetingType: meetingTypeOptions[0].value,
  date: moment().format("YYYY-MM-DD"),
  start_time: "10:00",
  end_time: "11:00",
  url: "",
};

const defaultAdminInterview = {
  meetingType: meetingTypeOptions[1].value,
  option_one: {
    date: moment().format("YYYY-MM-DD"),
    start_time: "10:00",
    end_time: "11:00",
  },
  option_two: {
    date: moment().add(1, "days").format("YYYY-MM-DD"),
    start_time: "10:00",
    end_time: "11:00",
  },
  option_three: {
    date: moment().add(2, "days").format("YYYY-MM-DD"),
    start_time: "10:00",
    end_time: "11:00",
  },
};

const AppointmentModel = ({
  setIsAppointmentModelOpen,
  userId,
  jobId,
}: AppointmentModelProps) => {
  const queryClient = useQueryClient();
  const { token } = useSelector((state: RootState) => state.auth);
  const { authHandleError, emailError, resetAuthError } = useHandleError();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [interview, setInterview] = useState(defaultDirectInterview);
  const [adminInterview, setAdminInterview] = useState(defaultAdminInterview);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const handleCloseModel = () => setIsAppointmentModelOpen(false);
  const [meetingType, setMeetingType] = useState<{
    label: string;
    value: string;
  }>(meetingTypeOptions[0]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  /**
   * This Mutation is used to post the meeting data.
   * @author PSK
   */
  const {
    mutate: postMeeting,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data: MeetingData) => {
      return fetchServer({
        endpoint: `${apiRoutes.INTERVIEW}`,
        method: "POST",
        token: token,
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.USER_INTERVIEW],
      });
    },
  });

  /**
   * This function is used to confirm the meeting data.
   * @author PSK
   */
  const handleConfirmRewrite = () => {
    if (meetingType.value === "admin") {
      const meetingData: MeetingData = {
        user_id: userId,
        job_id: jobId,
        req_admin: {
          first_date: adminInterview.option_one.date,
          first_start_time: adminInterview.option_one.start_time,
          first_end_time: adminInterview.option_one.end_time,
          second_date: adminInterview.option_two.date,
          second_start_time: adminInterview.option_two.start_time,
          second_end_time: adminInterview.option_two.end_time,
          third_date: adminInterview.option_three.date,
          third_start_time: adminInterview.option_three.start_time,
          third_end_time: adminInterview.option_three.end_time,
        },
      };
      postMeeting(meetingData);
    } else {
      if (interview.url === "") {
        setAlertMessage("Zoom又は Meet リンクを入力してください");
        setShowConfirmModal(false);
        setShowAlert(true);
        return;
      } else {
        const meetingData: MeetingData = {
          user_id: userId,
          job_id: jobId,
          direct: {
            date: interview.date,
            start_time: interview.start_time,
            end_time: interview.end_time,
            zoom_link: interview.url,
          },
        };
        postMeeting(meetingData);
      }
    }
  };
  const handleCancel = () => setShowConfirmModal(false);

  /**
   * This Effect is used to handle the error and success of the mutation.
   * @author PSK
   */
  useEffect(() => {
    if (error) {
      authHandleError(error?.message as AuthErrorType);
      setShowConfirmModal(false);
      setShowAlert(true);
    }

    if (isSuccess) {
      setTimeout(() => setShowConfirmModal(false), 500);
      setIsAppointmentModelOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);

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
              value={meetingType}
              onChange={(e) => {
                setMeetingType({
                  label: e.target.labels as unknown as string,
                  value: e.target.value,
                });
              }}
              defaultOption={meetingType.label}
              className="border-none  mb-0 tracking-wider font-semibold"
            />
          </div>

          <AnimatePresence mode="wait">
            {meetingType.value === "direct" && (
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
                    <InterviewDatePicker
                      selected={
                        interview.date
                          ? moment(interview.date).toDate()
                          : moment().toDate()
                      }
                      setInterview={(date: Date | null) => {
                        if (date) {
                          setInterview({
                            ...interview,
                            date: moment(date).format("YYYY-MM-DD"),
                          });
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
                      onTimeSelect={(time) =>
                        setInterview({ ...interview, start_time: time })
                      }
                      dropStyle={1}
                      time={interview.start_time}
                    />
                    <TimeSelect
                      onTimeSelect={(time) =>
                        setInterview({ ...interview, end_time: time })
                      }
                      dropStyle={1}
                      time={interview.end_time}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start mt-5  gap-2">
                  <p className="text-sm font-semibold text-secondaryColor">
                    Zoom又は Meet リンク
                  </p>
                  <textarea
                    name="url"
                    id="url"
                    rows={2}
                    value={interview.url}
                    onChange={(e) =>
                      setInterview({ ...interview, url: e.target.value })
                    }
                    className="w-full border-2 border-gray-900 rounded-md p-1 text-sm  text-start max-h-40"
                    required
                  />
                </div>
              </motion.div>
            )}
            {meetingType.value === "admin" && (
              <motion.div
                variants={interviewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pl-5 flex flex-col gap-y-8 mt-3"
              >
                {/*! Option One */}
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
                      <InterviewDatePicker
                        selected={
                          adminInterview.option_one.date
                            ? moment(adminInterview.option_one.date).toDate()
                            : moment().toDate()
                        } // Ensure it's a Date object
                        setInterview={(date: Date | null) => {
                          if (date) {
                            setAdminInterview({
                              ...adminInterview,
                              option_one: {
                                ...adminInterview.option_one,
                                date: moment(date).format("YYYY-MM-DD"),
                              },
                            });
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
                        onTimeSelect={(time) =>
                          setAdminInterview({
                            ...adminInterview,
                            option_one: {
                              ...adminInterview.option_one,
                              start_time: time,
                            },
                          })
                        }
                        dropStyle={1}
                        time={adminInterview.option_one.start_time}
                      />
                      <TimeSelect
                        onTimeSelect={(time) =>
                          setAdminInterview({
                            ...adminInterview,
                            option_one: {
                              ...adminInterview.option_one,
                              end_time: time,
                            },
                          })
                        }
                        dropStyle={1}
                        time={adminInterview.option_one.end_time}
                      />
                    </div>
                  </div>
                </div>

                {/*! Option Two */}
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
                      <InterviewDatePicker
                        selected={
                          adminInterview.option_two.date
                            ? moment(adminInterview.option_two.date).toDate()
                            : moment().toDate()
                        } // Ensure it's a Date object
                        setInterview={(date: Date | null) => {
                          if (date) {
                            setAdminInterview({
                              ...adminInterview,
                              option_two: {
                                ...adminInterview.option_two,
                                date: moment(date).format("YYYY-MM-DD"),
                              },
                            });
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
                        onTimeSelect={(time) =>
                          setAdminInterview({
                            ...adminInterview,
                            option_two: {
                              ...adminInterview.option_two,
                              start_time: time,
                            },
                          })
                        }
                        dropStyle={1}
                        time={adminInterview.option_two.start_time}
                      />
                      <TimeSelect
                        onTimeSelect={(time) =>
                          setAdminInterview({
                            ...adminInterview,
                            option_two: {
                              ...adminInterview.option_two,
                              end_time: time,
                            },
                          })
                        }
                        dropStyle={1}
                        time={adminInterview.option_two.end_time}
                      />
                    </div>
                  </div>
                </div>

                {/* Option Three */}
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
                      <InterviewDatePicker
                        selected={
                          adminInterview.option_three.date
                            ? moment(adminInterview.option_three.date).toDate()
                            : moment().toDate()
                        } // Ensure it's a Date object
                        setInterview={(date: Date | null) => {
                          if (date) {
                            setAdminInterview({
                              ...adminInterview,
                              option_three: {
                                ...adminInterview.option_three,
                                date: moment(date).format("YYYY-MM-DD"),
                              },
                            });
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
                        onTimeSelect={(time) =>
                          setAdminInterview({
                            ...adminInterview,
                            option_three: {
                              ...adminInterview.option_three,
                              start_time: time,
                            },
                          })
                        }
                        dropStyle={2}
                        time={adminInterview.option_three.start_time}
                      />
                      <TimeSelect
                        onTimeSelect={(time) =>
                          setAdminInterview({
                            ...adminInterview,
                            option_three: {
                              ...adminInterview.option_three,
                              end_time: time,
                            },
                          })
                        }
                        dropStyle={2}
                        time={adminInterview.option_three.end_time}
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
            className="bg-gray-500 text-white flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
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
          </Button>
          <Button
            onClick={() => setShowConfirmModal(true)}
            variant="destructive"
            className="px-5 flex items-center gap-2"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            {jp.makeAppointment}
          </Button>
        </div>
      </motion.div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ConfirmationBox
              message="送信してもよろしいですか？"
              onCancel={handleCancel}
              loading={isPending}
              onConfirm={handleConfirmRewrite}
              isSuccess={isSuccess}
            />
          </div>
        </div>
      )}

      <Modal isOpen={showAlert} onClose={() => setShowAlert(false)}>
        <div className="p-6">
          <p className="mb-4">{alertMessage || emailError}</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                resetAuthError();
                setShowAlert(false);
                setAlertMessage("");
              }}
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
