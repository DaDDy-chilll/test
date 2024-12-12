import { useState, useEffect } from "react";
import { Chat } from "@/types/helperTypes";
import { jp } from "@/lang/jp";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { MeetingAlert } from "@/components";
import moment from "moment";
import { apiRoutes } from "@/utils/apiRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/utils/queryKey";
import { fetchServer } from "@/utils/helper";

type ChatHeaderProps = {
  selectedChat: Chat | null;
  setIsAppointmentModelOpen: (isOpen: boolean) => void;
};

const ChatHeader = ({
  selectedChat,
  setIsAppointmentModelOpen,
}: ChatHeaderProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [isMeetingAlertOpen, setIsMeetingAlertOpen] = useState<boolean>(false);
  const [isMeetingEnded, setIsMeetingEnded] = useState<boolean>(false);
  const [meetingStatus, setMeetingStatus] = useState<string>("");
  const [meetingError, setMeetingError] = useState<string | null>(null);
  const navigate = useNavigate();
  const timeNow = moment().format("HH:mm");

  /**
   * This function is used to build the query string for fetching the meeting data.
   * @author PSK
   * @returns {string} The query string for fetching the meeting data.
   */
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (selectedChat?.jobfinder_id)
      params.append("user_id", selectedChat?.jobfinder_id);
    if (selectedChat?.job_id) params.append("job_id", selectedChat?.job_id);
    if (selectedChat?.company_id)
      params.append("company_id", selectedChat?.company_id);
    return params.toString();
  };

  /**
   * This Query fetches the meeting data.
   * @author PSK
   */
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: [
      QueryKey.USER_INTERVIEW,
      selectedChat?.jobfinder_id,
      selectedChat?.job_id,
    ],
    queryFn: () => {
      setIsMeetingAlertOpen(false);
      return fetchServer({
        endpoint: `${apiRoutes.FIND_INTERVIEW}?${buildQueryString()}`,
        method: "GET",
        token: token,
      });
    },
    enabled: !!selectedChat?.jobfinder_id || !!selectedChat?.job_id,
    retry: false
  });

  

  const handleAppointmentModel = () => setIsAppointmentModelOpen(true);
  const handleProfileDetail = () =>
    navigate(RouteName.APPLICANTS, { state: selectedChat });
  const handleJobDetail = (): void =>
    navigate(RouteName.JOBS, { state: selectedChat });
  const handleMeetingAlert = () => setIsMeetingAlertOpen(!isMeetingAlertOpen);

  /**
   * This Effect is used to handle the error and success of the mutation.
   * @author PSK
   */
  useEffect(() => {
    if (isSuccess && data?.data) {
      setMeetingError(null);
      let startTime = data?.data?.start_time;
      let endTime = data?.data?.end_time;
      let meetingDate = data?.data?.date;
      const meetingDateISO = moment(meetingDate, "YYYY-MM-DD").format(
        "YYYY-MM-DD",
      );
      const dateNowISO = moment().format("YYYY-MM-DD");
      const meetingMoment = moment(meetingDateISO);
      const dateNowMoment = moment(dateNowISO);
      const currentTime = moment(timeNow, "HH:mm");
      const startTimeMoment = moment(startTime, "HH:mm");
      const endTimeMoment = moment(endTime, "HH:mm");

      if (meetingMoment.isSame(dateNowMoment, "day")) {
        if (currentTime.isBefore(startTimeMoment)) {
          setMeetingStatus(startTimeMoment.from(currentTime));
          setIsMeetingEnded(false);
        } else if (currentTime.isBetween(startTimeMoment, endTimeMoment)) {
          setMeetingStatus(jp.meetingInProgress);
          setIsMeetingEnded(false);
        } else {
          setMeetingStatus(jp.meetingEnded);
          setIsMeetingEnded(true);
        }
      } else if (meetingMoment.isBefore(dateNowMoment)) {
        setMeetingStatus(meetingMoment.fromNow());
        setIsMeetingEnded(true);
      } else {
        setMeetingStatus(meetingMoment.fromNow());
        setIsMeetingEnded(false);
      }
      setIsMeetingAlertOpen(true);
    }
    if (error) {
      setMeetingError(error.message);
      setMeetingStatus("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, data]);

  return (
    <div className="flex items-center justify-between w-full h-full px-4 py-3 border-4 border-gray-300 rounded-sm border-opacity-30 shadow-sm">
      <div className="flex items-center gap-x-3">
        <h1
          aria-label="チャット相手の名前"
          title={selectedChat?.jobfinder_name}
          className="text-normal font-bold flex items-center"
        >
          {selectedChat?.jobfinder_name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 ml-3 hover:text-primaryColor cursor-pointer"
            onClick={handleProfileDetail}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </h1>
        <div>
          <button
            className="text-sm text-gray-500 underline cursor-pointer"
            onClick={handleJobDetail}
          >
            {selectedChat?.job_title}
          </button>
        </div>

        {isLoading ? (
          <Skeleton
            width={70}
            height={30}
            className="rounded-full"
            borderRadius={100}
            baseColor="#e1e1e1"
            highlightColor="#f3f3f3"
          />
        ) : (
          isSuccess &&
          !meetingError && (
            <div className="relative flex flex-col justify-center items-center">
              <button
                onClick={handleMeetingAlert}
                className={`flex justify-start gap-x-2 items-center pl-1 pr-2 py-1 cursor-pointer  rounded-full  ${isMeetingEnded ? "text-gray-300 bg-gray-500" : "text-white hover:text-white/50 bg-primaryColor"}`}
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
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
                <p className="text-xs ">{meetingStatus}</p>
              </button>
              <div className="absolute top-8 w-full  flex flex-col justify-end  text-center z-50">
                {isMeetingAlertOpen && (
                  <MeetingAlert
                    onclick={handleMeetingAlert}
                    isMeetingEnded={isMeetingEnded}
                    meetingData={data?.data}
                  />
                )}
              </div>
            </div>
          )
        )}
      </div>
      <button
        className="bg-gray-500 text-sm text-white px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-gray-400"
        onClick={handleAppointmentModel}
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
        {jp.interviewSchedule}
      </button>
    </div>
  );
};

export default ChatHeader;
