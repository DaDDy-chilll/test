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
  props?: any;
};

const MatchedApplicants = ({
  className,
  applicantDetail,
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
    m_tokutei_exams
  } = applicantDetail;
  const profile_path = `https://api.japanjob.exbrainedu.com/v1/file/photo/${m_basicinfos.profile_path}`;
  const video_path = `https://api.japanjob.exbrainedu.com/v1/file/video/${m_basicinfos.video_path}`;

  const groupedAreas = m_prefer_areas.reduce((acc: any, area: any) => {
    if (!acc[area.area.area]) {
      acc[area.area.area] = [];
    }
    acc[area.area.area].push(area.prefecture.name);
    return acc;
  }, {});


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

            {m_basicinfos.name && (
              <>
                <h1 className="font-semibold text-lg">{m_basicinfos.name}</h1>
                <span className="text-xl text-gray-500">・</span>
              </>
            )}

            {m_basicinfos.jp_name && (
              <>
                <h1 className="font-semibold text-lg">
                  {m_basicinfos.jp_name}
                </h1>
                <span className="text-xl text-gray-500">・</span>
              </>
            )}
            {m_basicinfos.mm_name && (
              <>
                <h1 className="font-semibold text-lg">
                  {m_basicinfos.mm_name}
                </h1>
                <span className="text-xl text-gray-500">・</span>
              </>
            )}

            <div className="flex items-center gap-2">
              {m_basicinfos.gender === 0 ? (
                <p className="text-sm">{jp.male}</p>
              ) : (
                <p className="text-sm">{jp.female}</p>
              )}

              {code && (
                <>
                  <span className="text-xl text-gray-500">・</span>
                  <h1 className="text-normal">({code})</h1>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-primaryColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <p className="text-sm">
                {`${m_basicinfos.address} (${m_basicinfos.live_in_japan === 1 ? jp.japan : jp.myanmar})`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor "
                className="size-5 text-primaryColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>

              <p className="text-sm">
                {moment(m_basicinfos.dob).format("YYYY-MM-DD")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="size-5 text-primaryColor "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>

              <p className="text-sm">
                {jp.passport} {" : "}{" "}
                {m_basicinfos.has_passport === 1 ? jp.yes : jp.no}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_3fr_2fr] mt-10">
        {/* column left */}
        <div className="space-y-5 flex flex-col gap-y-3 ">
          <div className=" px-2">
            <div className="flex justify-start items-center mb-3 gap-x-1">
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              <h1 className="text-sm font-semibold">{jp.selfIntroduction}</h1>
            </div>

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

          <div className="pl-2">
            <div className="flex justify-start items-center mb-3 gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-primaryColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <h1 className="font-semibold text-sm">{jp.test}</h1>
            </div>
            <div className="items-center flex-col justify-start gap-y- pl-6">
              {m_tokutei_exams.length > 0 ? (
                m_tokutei_exams.map((exam, index) => (
                  <p key={index} className="text-sm mb-1">
                    {exam.m_exams.name_jp} - {" "}
                    <span className={`${exam.result === 1 ? "text-green-500" : "text-red-500"} font-semibold`}>
                      {exam.result === 1 ? jp.pass : jp.fail}
                    </span>
                  </p>
                ))
              ) : (
                <p className="text-xs text-center text-gray-500">
                  {jp.noFoundTest}
                </p>
              )}
            </div>
          </div>


          <div className="pl-2">
            <div className="flex justify-start items-center mb-3 gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-primaryColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <h1 className="font-semibold text-sm">{jp.language}</h1>
            </div>
            <div className="items-center flex-col justify-start gap-x-3 pl-6">
              {m_language_exams.length > 0 ? (
                m_language_exams.map((language, index) => (
                  <p key={index} className="text-sm">
                    {language.m_exams.name_jp} - <span className="font-semibold">{language.m_exam_levels.level}</span>
                  </p>
                ))
              ) : (
                <p className="text-xs text-center text-gray-500">
                  {jp.notFoundLanguage}
                </p>
              )}
            </div>
          </div>
        </div>

         {/* column Center */}      
        <div className=" px-7 flex flex-col gap-y-3 ">
          <div>
            <div className="flex justify-start items-center mb-3 gap-x-1">
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
              <h1 className=" font-sm font-semibold">{jp.workExperience}</h1>
            </div>
            {m_job_experiences.length > 0 ? (
              m_job_experiences.map((exp, index) => (
                <div key={index} className="flex items-start gap-x-2 my-4 px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-primaryColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <div className="w-full">
                    <div className="flex items-start justify-between w-full">
                      <div className=" mb-1 text-wrap  max-w-60">
                        <h1 className="text-sm font-semibold text-wrap w-full">
                          {exp.job_name}
                          <span className="text-wrap">
                            {" "}
                            • ({exp.m_job_types.job_type_jp}) •{" "}
                          </span>
                          <span className="text-green-500">{`  ${Number(exp.end_year) - Number(exp.start_year)} ${jp.year}`}</span>
                        </h1>
                      </div>
                      <p className="text-sm font-semibold">
                        {exp.start_year}{" "}
                        {exp.end_year ? `- ${exp.end_year}` : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium">{exp.description}</p>
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
          <div>
            <div className="flex justify-start items-center mb-3 gap-x-1">
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
              <h1 className=" font-sm font-semibold">{jp.education}</h1>
            </div>
              {m_education.length > 0 ? (
                m_education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-x-2 my-4 px-5">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-primaryColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>

                  <div className="w-full">
                    <div className="flex items-start justify-between w-full">
                      <div className=" mb-1 text-wrap w-52">
                        <h1 className="text-sm font-semibold text-wrap w-full">
                        {edu.university_name}
                          <span className="text-wrap">
                            {" "}
                            •  ( {edu.academic_start_year}{" "}
                            {edu.academic_end_year
                              ? `- ${edu.academic_end_year}`
                              : ""}
                            )
                          </span>
                        </h1>
                      </div>
                      <p className="text-sm font-semibold">
                      {edu.m_acdemic_types.name_jp}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-500">{edu.major}</p>
                    </div>
                  </div>
                </div>
                ))
              ) : (
                <p className="text-sm font-normal text-center text-gray-500">
                  {jp.notFoundEducation}
                </p>
              )}
          </div>
        </div>

        {/* column right */}
        <div className="space-y-5 ">
          <div className="w-full  space-y-2 ">
            <div className="flex justify-start items-center gap-x-1 text-yellow-600">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <h1 className="font-sm font-semibold">{jp.acceptView}</h1>
            </div>

            <div className="space-y-1">
              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-2 text-xs">
                  <p className="text-sm">・{jp.salary}</p>
                </div>

                <p className="text-sm text-start px-2 font-semibold text-green-500">
                  ¥ {m_prefer_other.start_salary}万 ~ ¥{" "}
                  {m_prefer_other.end_salary}万
                </p>
              </div>

              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-3 text-xs">
                  <p className="text-sm">・{jp.overTime}</p>
                </div>

                <p className={`text-sm text-start px-2 font-semibold ${m_prefer_other.overtime === 1 ? "text-green-500" : "text-red-500"}`}>
                  {m_prefer_other.overtime === 1 ? jp.required : jp.notRequired}
                </p>
              </div>

              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-3 text-xs">
                  <p className="text-sm">・{jp.dormitory}</p>
                </div>

                <p
                  className={`text-sm text-start px-2 font-semibold ${m_prefer_other.support_home === 1 ? "text-green-500" : "text-red-500"}`}
                >
                  {m_prefer_other.support_home === 1
                    ? jp.required
                    : jp.notRequired}
                </p>
              </div>

              <div className="grid grid-cols-2 px-5">
                <div className="flex items-center gap-x-3 text-xs">
                  <p className="text-sm">・{jp.rent}</p>
                </div>

                <p
                  className={`text-sm text-start px-2 font-semibold ${m_prefer_other.support_home_rent === 1 ? "text-green-500" : "text-red-500"}`}
                >
                  {m_prefer_other.support_home_rent === 1
                    ? jp.required
                    : jp.notRequired}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 ">
            {m_preferred_jobs.length > 0 && (
              <>
                <div className="flex justify-start items-center gap-x-1 text-yellow-600">
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  <h1 className="font-semibold text-sm ">{jp.preferredJobs}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 pl-8">
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

           
          </div>

          <div className="flex flex-col gap-y-3 ">
          {m_prefer_areas.length > 0 && (
              <>
                <div className="flex justify-start items-center gap-x-1 text-yellow-600">
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  <h1 className="font-semibold text-sm ">{`${jp.desiredArea} / ${jp.preferredCities}`}</h1>
                </div>

                {Object.entries(groupedAreas).map(([region, prefectures]) => (
                  <div key={region} className="pl-5">
                    <h2 className="font-semibold text-sm mb-2 text-primaryColor">{`・${region}`}</h2>
                    <div className="flex flex-wrap items-center gap-2 ml-4">
                      {(prefectures as string[]).map((prefecture, index) => (
                        <p
                          key={index}
                          className="bg-primaryColor text-white text-xs p-1 rounded-md"
                        >
                          {prefecture}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
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
