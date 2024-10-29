import { ApplicantDetail } from "@/types/helperTypes";
import DefaultProfile from "@/assets/icons/default_user.svg";
import { jp } from "@/lang/jp";
import moment from "moment";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import NoVideo from "@/assets/images/no-video.svg";

type MatchProps = {
  className?: string;
  applicantDetail: ApplicantDetail;
  onBack?: () => void;
};

const MatchedApplicants = ({
  className,
  applicantDetail,
  onBack,
}: MatchProps) => {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  if (!applicantDetail) return null;
  const {
    code,
    m_basicinfos,
    m_education,
    m_job_experiences,
    m_language_exams,
    m_prefer_areas,
    m_preferred_jobs,
    m_prefer_other,
  } = applicantDetail;
  const profile_path = `https://api.japanjob.exbrainedu.com/v1/file/photo/${m_basicinfos.profile_path}`;
  const video_path = `https://api.japanjob.exbrainedu.com/v1/file/video/${m_basicinfos.video_path}`;


  console.log('code', code)

  return (
    <div className={`bg-gray-100 py-5 px-6 shadow-md relative ${className}`}>
      <div className="flex items-center gap-x-10 my-3 ">
        <img
          src={
            m_basicinfos.profile_path !== null ? profile_path : DefaultProfile
          }
          alt="profile"
          className="w-16 h-16 rounded-full"
          crossOrigin="anonymous"
        />
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-start">
            <h1 className="font-semibold text-lg">{m_basicinfos.name}</h1>
            <span className="text-xl text-gray-500">・</span>
            <h1 className="text-lg">{code}</h1>
            <span className="text-xl">・</span>
            <div className="flex items-center gap-2">
              {m_basicinfos.gender === 0 ? (
                <p className="text-sm">{jp.male}</p>
              ) : (
                <p className="text-sm">{jp.female}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="16"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z"
                  fill="#D04040"
                />
              </svg>
              <p className="text-sm">
                {m_basicinfos.live_in_japan === 1 ? jp.japan : jp.myanmar}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="16"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 20C0.716667 20 0.479167 19.9042 0.2875 19.7125C0.0958333 19.5208 0 19.2833 0 19V14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4.55C7.7 4.35 7.45833 4.10833 7.275 3.825C7.09167 3.54167 7 3.2 7 2.8C7 2.55 7.05 2.30417 7.15 2.0625C7.25 1.82083 7.4 1.6 7.6 1.4L9 0L10.4 1.4C10.6 1.6 10.75 1.82083 10.85 2.0625C10.95 2.30417 11 2.55 11 2.8C11 3.2 10.9083 3.54167 10.725 3.825C10.5417 4.10833 10.3 4.35 10 4.55V6H14C14.55 6 15.0208 6.19583 15.4125 6.5875C15.8042 6.97917 16 7.45 16 8V12C16.55 12 17.0208 12.1958 17.4125 12.5875C17.8042 12.9792 18 13.45 18 14V19C18 19.2833 17.9042 19.5208 17.7125 19.7125C17.5208 19.9042 17.2833 20 17 20H1ZM4 12H14V8H4V12ZM2 18H16V14H2V18Z"
                  fill="#D04040"
                />
              </svg>
              <p className="text-sm">
                {moment(m_basicinfos.dob).format("YYYY-MM-DD")}
              </p>
            </div>

            {/* <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 text-primaryColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <p className="text-sm">{applicantDetail?.email || "無"}</p>
            </div>

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 text-primaryColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              <p className="text-sm">{m_basicinfos.phone}</p>
            </div> */}

            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="16"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.2C6.43333 1.4 6.8 0.916667 7.3 0.55C7.8 0.183333 8.36667 0 9 0C9.63333 0 10.2 0.183333 10.7 0.55C11.2 0.916667 11.5667 1.4 11.8 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM9 3.25C9.21667 3.25 9.39583 3.17917 9.5375 3.0375C9.67917 2.89583 9.75 2.71667 9.75 2.5C9.75 2.28333 9.67917 2.10417 9.5375 1.9625C9.39583 1.82083 9.21667 1.75 9 1.75C8.78333 1.75 8.60417 1.82083 8.4625 1.9625C8.32083 2.10417 8.25 2.28333 8.25 2.5C8.25 2.71667 8.32083 2.89583 8.4625 3.0375C8.60417 3.17917 8.78333 3.25 9 3.25ZM2 16.85C2.9 15.9667 3.94583 15.2708 5.1375 14.7625C6.32917 14.2542 7.61667 14 9 14C10.3833 14 11.6708 14.2542 12.8625 14.7625C14.0542 15.2708 15.1 15.9667 16 16.85V4H2V16.85ZM9 12C9.96667 12 10.7917 11.6583 11.475 10.975C12.1583 10.2917 12.5 9.46667 12.5 8.5C12.5 7.53333 12.1583 6.70833 11.475 6.025C10.7917 5.34167 9.96667 5 9 5C8.03333 5 7.20833 5.34167 6.525 6.025C5.84167 6.70833 5.5 7.53333 5.5 8.5C5.5 9.46667 5.84167 10.2917 6.525 10.975C7.20833 11.6583 8.03333 12 9 12ZM4 18H14V17.75C13.3 17.1667 12.525 16.7292 11.675 16.4375C10.825 16.1458 9.93333 16 9 16C8.06667 16 7.175 16.1458 6.325 16.4375C5.475 16.7292 4.7 17.1667 4 17.75V18ZM9 10C8.58333 10 8.22917 9.85417 7.9375 9.5625C7.64583 9.27083 7.5 8.91667 7.5 8.5C7.5 8.08333 7.64583 7.72917 7.9375 7.4375C8.22917 7.14583 8.58333 7 9 7C9.41667 7 9.77083 7.14583 10.0625 7.4375C10.3542 7.72917 10.5 8.08333 10.5 8.5C10.5 8.91667 10.3542 9.27083 10.0625 9.5625C9.77083 9.85417 9.41667 10 9 10Z"
                  fill="#D04040"
                />
              </svg>

              <p className="text-sm">
                {jp.passport} {" : "}{" "}
                {m_basicinfos.has_passport === 1 ? "有" : "無"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-10">
        {/* column left */}
        <div className="space-y-7 flex flex-col gap-y-3 ">
          <div className="w-full h-auto p-2">
            <h1 className="text-sm font-semibold mb-3">
              {jp.selfIntroduction}
            </h1>
            {video_path && m_basicinfos.video_path !== null ? (
              <>
                {isVideoLoading && <Skeleton height={200} width={"100%"} />}
                <video
                  src={video_path}
                  className={`object-contain w-full h-48 ${isVideoLoading ? "hidden" : ""}`}
                  crossOrigin="anonymous"
                  controls
                  onLoadStart={() => {
                    setIsVideoLoading(true);
                  }}
                  onLoadedData={() => {
                    setIsVideoLoading(false);
                  }}
                ></video>
              </>
            ) : (
              <div className="text-xs text-center text-gray-500 flex items-center justify-center">
                <img src={NoVideo} alt="no-video" className="w-40 h-40" />
              </div>
            )}
          </div>

          <div className="p-2">
            <h1 className="font-semibold text-sm mb-3">{jp.language}</h1>
            <div className="flex items-center gap-x-3">
              {m_language_exams.length > 0 ? (
                m_language_exams.map((language, index) => (
                  <p key={index} className="text-sm">
                    {language.m_exams.name_jp} - {language.m_exam_levels.level}
                  </p>
                ))
              ) : (
                <p className="text-xs text-center text-gray-500">
                  {jp.notFoundLanguage}
                </p>
              )}
            </div>
            {/* <div className="flex items-center gap-x-3 mt-3 mr-2">
              {m_language_exams.map((language, index) => (
                <p key={index} className="text-xs">
                  {language.m_exams.name_jp}
                </p>
              ))}
            </div> */}
          </div>
        </div>

        <div className=" p-3 flex flex-col gap-y-3 ">
          <div>
            <h1 className=" font-sm font-semibold mb-3 ">{jp.education}</h1>
            <div className="flex flex-col gap-y-3">
              {m_education.length > 0 ? (
                m_education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-x-3 px-5"
                  >
                    <div className="flex items-center justify-between gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-primaryColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                      </svg>

                      <div>
                        <h1 className="text-sm font-semibold">{edu.major}</h1>
                        <p className="text-xs text-gray-500">
                          {edu.university_name}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm ">
                      {edu.academic_start_year}{" "}
                      {edu.academic_end_year
                        ? `- ${edu.academic_end_year}`
                        : ""}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm font-normal text-center text-gray-500">
                  {jp.notFoundEducation}
                </p>
              )}
            </div>
          </div>

          <div>
            <h1 className=" font-sm font-semibold mb-3">{jp.workExperience}</h1>
            {m_job_experiences.length > 0 ? (
              m_job_experiences.map((exp, index) => (
                <div key={index} className="flex items-start gap-x-2 my-4 px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-primaryColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <div className="w-full">
                    <div className="flex items-start justify-between w-full">
                      <div className=" mb-1">
                        <h1 className="text-sm font-semibold">
                          {exp.job_name}
                        </h1>
                        {/* <p className="text-sm text-gray-500">{exp.job_name}</p> */}
                      </div>
                      <p className="text-sm font-semibold">
                        {exp.start_year}{" "}
                        {exp.end_year ? `- ${exp.end_year}` : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-light">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm font-normal text-center text-gray-500">
                {jp.notFoundJobExprenced}
              </p>
            )}
          </div>
        </div>
        {/* column right */}
        <div className="p-2 space-y-8  px-4">
          <div className="w-full  space-y-2 ">
            <h1 className="font-sm font-semibold">{jp.acceptView}</h1>

            <div className="space-y-1">
              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-2 text-xs">
                  <p className="text-sm">・{jp.salary}</p>
                </div>

                <p className="text-sm text-start px-2">
                  ¥ {m_prefer_other.start_salary}万 ~ ¥{" "}
                  {m_prefer_other.end_salary}万
                </p>
              </div>

              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-3 text-xs">
                  <p className="text-sm">・{jp.hourRate}</p>
                </div>

                <p className="text-sm text-start px-2">
                  {m_prefer_other.working_time || 0} 時
                </p>
              </div>

              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-3 text-xs">
                  <p className="text-sm">・{jp.dormitory}</p>
                </div>

                <p className="text-sm text-start px-2">
                  {m_prefer_other.support_home === 1
                    ? jp.required
                    : jp.notRequired}
                </p>
              </div>

              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-3 text-xs">
                  <p className="text-sm">・{jp.rent}</p>
                </div>

                <p className="text-sm text-start px-2">
                  {m_prefer_other.support_home_rent === 1
                    ? jp.required
                    : jp.notRequired}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 mt-8">
            {m_preferred_jobs.length > 0 && (
              <>
                <h1 className="font-semibold text-sm ">{jp.preferredJobs}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  {m_preferred_jobs.map((jobType, index) => (
                    <p
                      key={index}
                      className="bg-primaryColor text-white text-xs p-1 rounded-md"
                    >
                      {jobType.m_job_types.job_type_jp}
                    </p>
                  ))}
                </div>
              </>
            )}

            {/* <hr className="mx-4 border rounded-md  border-gray-400" /> */}
            {m_prefer_areas.length > 0 && (
              <>
                <h1 className="font-semibold text-sm ">{jp.preferredCities}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  {m_prefer_areas.map((area, index) => (
                    <p
                      key={index}
                      className="bg-primaryColor text-white text-xs p-1 rounded-md"
                    >
                      {area.prefecture.name}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MatchedApplicants;
