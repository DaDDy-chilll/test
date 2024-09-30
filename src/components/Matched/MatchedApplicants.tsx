import { UserProfile } from "@/types/user";
import { ApplicantDetail } from "@/types/helperTypes";
import DefaultLogo from "@/assets/images/default.png";
import { jp } from "@/lang/jp";
import moment from "moment";

type MatchProps = {
  className?: string;
  applicantDetail: ApplicantDetail;
};

const MatchedApplicants = ({ className, applicantDetail }: MatchProps) => {
  if (!applicantDetail) return null;
  const {
    m_basicinfos,
    m_education,
    m_job_experiences,
    m_language_exams,
    m_prefer_areas,
    m_preferred_jobs,
    m_prefer_other,
  } = applicantDetail;
  const profile_path = m_basicinfos.profile_path;
  return (
    <div className={`bg-gray-100 pt-2 pb-5 px-14 shadow-md ${className}`}>

      <div className="flex items-center gap-x-10 my-3 ">
        <img
          src={profile_path ? profile_path : DefaultLogo}
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold text-lg">{m_basicinfos.name}</h1>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="18"
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
                Live in{" "}
                {m_basicinfos.live_in_japan === 1 ? " Japan" : " Myanmar"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="20"
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

            <div className="flex items-center gap-2">
              {m_basicinfos.gender === 0 ? (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="text-primaryColor"
                  >
                    <path
                      fill="currentColor"
                      d="M399.5 849.5a225 225 0 1 0 0-450 225 225 0 0 0 0 450zm0 56.25a281.25 281.25 0 1 1 0-562.5 281.25 281.25 0 0 1 0 562.5zm253.125-787.5h225q28.125 0 28.125 28.125T877.625 174.5h-225q-28.125 0-28.125-28.125t28.125-28.125z"
                    />
                    <path
                      fill="currentColor"
                      d="M877.625 118.25q28.125 0 28.125 28.125v225q0 28.125-28.125 28.125T849.5 371.375v-225q0-28.125 28.125-28.125z"
                    />
                    <path
                      fill="currentColor"
                      d="M604.813 458.9 565.1 419.131l292.613-292.668 39.825 39.824z"
                    />
                  </svg>
                  <p className="text-sm">Male</p>
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primaryColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="text-sm">Female</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 ">
        <div className="col-span-2 flex flex-col gap-y-3 border-r-2 border-gray-500">
          <h1 className="underline font-sm font-semibold ">
            {jp.jobPreferences}
          </h1>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-3 text-xs">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.2C6.43333 1.4 6.8 0.916667 7.3 0.55C7.8 0.183333 8.36667 0 9 0C9.63333 0 10.2 0.183333 10.7 0.55C11.2 0.916667 11.5667 1.4 11.8 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM9 3.25C9.21667 3.25 9.39583 3.17917 9.5375 3.0375C9.67917 2.89583 9.75 2.71667 9.75 2.5C9.75 2.28333 9.67917 2.10417 9.5375 1.9625C9.39583 1.82083 9.21667 1.75 9 1.75C8.78333 1.75 8.60417 1.82083 8.4625 1.9625C8.32083 2.10417 8.25 2.28333 8.25 2.5C8.25 2.71667 8.32083 2.89583 8.4625 3.0375C8.60417 3.17917 8.78333 3.25 9 3.25ZM2 16.85C2.9 15.9667 3.94583 15.2708 5.1375 14.7625C6.32917 14.2542 7.61667 14 9 14C10.3833 14 11.6708 14.2542 12.8625 14.7625C14.0542 15.2708 15.1 15.9667 16 16.85V4H2V16.85ZM9 12C9.96667 12 10.7917 11.6583 11.475 10.975C12.1583 10.2917 12.5 9.46667 12.5 8.5C12.5 7.53333 12.1583 6.70833 11.475 6.025C10.7917 5.34167 9.96667 5 9 5C8.03333 5 7.20833 5.34167 6.525 6.025C5.84167 6.70833 5.5 7.53333 5.5 8.5C5.5 9.46667 5.84167 10.2917 6.525 10.975C7.20833 11.6583 8.03333 12 9 12ZM4 18H14V17.75C13.3 17.1667 12.525 16.7292 11.675 16.4375C10.825 16.1458 9.93333 16 9 16C8.06667 16 7.175 16.1458 6.325 16.4375C5.475 16.7292 4.7 17.1667 4 17.75V18ZM9 10C8.58333 10 8.22917 9.85417 7.9375 9.5625C7.64583 9.27083 7.5 8.91667 7.5 8.5C7.5 8.08333 7.64583 7.72917 7.9375 7.4375C8.22917 7.14583 8.58333 7 9 7C9.41667 7 9.77083 7.14583 10.0625 7.4375C10.3542 7.72917 10.5 8.08333 10.5 8.5C10.5 8.91667 10.3542 9.27083 10.0625 9.5625C9.77083 9.85417 9.41667 10 9 10Z"
                  fill="#D04040"
                />
              </svg>

              <p>{jp.passport}</p>
            </div>

            <p className="text-sm text-end px-10">
              {m_basicinfos.has_passport === 1 ? "Yes" : "No"}
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-3 text-xs">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.1 17H10.85V15.75C11.6833 15.6 12.4 15.275 13 14.775C13.6 14.275 13.9 13.5333 13.9 12.55C13.9 11.85 13.7 11.2083 13.3 10.625C12.9 10.0417 12.1 9.53333 10.9 9.1C9.9 8.76667 9.20833 8.475 8.825 8.225C8.44167 7.975 8.25 7.63333 8.25 7.2C8.25 6.76667 8.40417 6.425 8.7125 6.175C9.02083 5.925 9.46667 5.8 10.05 5.8C10.5833 5.8 11 5.92917 11.3 6.1875C11.6 6.44583 11.8167 6.76667 11.95 7.15L13.55 6.5C13.3667 5.91667 13.0292 5.40833 12.5375 4.975C12.0458 4.54167 11.5 4.3 10.9 4.25V3H9.15V4.25C8.31667 4.43333 7.66667 4.8 7.2 5.35C6.73333 5.9 6.5 6.51667 6.5 7.2C6.5 7.98333 6.72917 8.61667 7.1875 9.1C7.64583 9.58333 8.36667 10 9.35 10.35C10.4 10.7333 11.1292 11.075 11.5375 11.375C11.9458 11.675 12.15 12.0667 12.15 12.55C12.15 13.1 11.9542 13.5042 11.5625 13.7625C11.1708 14.0208 10.7 14.15 10.15 14.15C9.6 14.15 9.1125 13.9792 8.6875 13.6375C8.2625 13.2958 7.95 12.7833 7.75 12.1L6.1 12.75C6.33333 13.55 6.69583 14.1958 7.1875 14.6875C7.67917 15.1792 8.31667 15.5167 9.1 15.7V17ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                  fill="#D04040"
                />
              </svg>

              <p className="text-sm ">{jp.salary}</p>
            </div>

            <p className="text-sm text-end px-10">
              ¥{m_prefer_other.start_salary} ~ ¥{m_prefer_other.end_salary}
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-3 text-xs">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.55 14.55L9 11V6H11V10.175L13.95 13.125L12.55 14.55ZM9 4V2H11V4H9ZM16 11V9H18V11H16ZM9 18V16H11V18H9ZM2 11V9H4V11H2ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                  fill="#D04040"
                />
              </svg>

              <p>{jp.hourRate}</p>
            </div>

            <p className="text-sm text-end px-10">
              {m_prefer_other.working_time || 0} hr
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-3 text-xs">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.925 9.04922L7.675 4.79922L9.1 3.39922L11.925 6.22422L17.6 0.574219L19 1.97422L11.925 9.04922ZM6 16.4992L12.95 18.3992L18.9 16.5492C18.8167 16.3992 18.6958 16.2701 18.5375 16.1617C18.3792 16.0534 18.2 15.9992 18 15.9992H12.95C12.5 15.9992 12.1417 15.9826 11.875 15.9492C11.6083 15.9159 11.3333 15.8492 11.05 15.7492L8.725 14.9742L9.275 13.0242L11.3 13.6992C11.5833 13.7826 11.9167 13.8492 12.3 13.8992C12.6833 13.9492 13.25 13.9826 14 13.9992C14 13.8159 13.9458 13.6409 13.8375 13.4742C13.7292 13.3076 13.6 13.1992 13.45 13.1492L7.6 10.9992H6V16.4992ZM0 19.9992V8.99922H7.6C7.71667 8.99922 7.83333 9.01172 7.95 9.03672C8.06667 9.06172 8.175 9.09089 8.275 9.12422L14.15 11.2992C14.7 11.4992 15.1458 11.8492 15.4875 12.3492C15.8292 12.8492 16 13.3992 16 13.9992H18C18.8333 13.9992 19.5417 14.2742 20.125 14.8242C20.7083 15.3742 21 16.0992 21 16.9992V17.9992L13 20.4992L6 18.5492V19.9992H0ZM2 17.9992H4V10.9992H2V17.9992Z"
                  fill="#D04040"
                />
              </svg>

              <p>{jp.dormitory}</p>
            </div>

            <p className="text-sm text-end px-10">
              {m_prefer_other.support_home === 1 ? "Yes" : "No"}
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-3 text-xs">
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 6H18V4H16V6ZM16 10H18V8H16V10ZM16 14H18V12H16V14ZM16 18V16H20V2H11V3.4L9 1.95V0H22V18H16ZM0 18V8L7 3L14 8V18H8V13H6V18H0ZM2 16H4V11H10V16H12V9L7 5.45L2 9V16Z"
                  fill="#D04040"
                />
              </svg>

              <p>{jp.rent}</p>
            </div>

            <p className="text-sm text-end px-10">
              {m_prefer_other.support_home_rent === 1 ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            <h1 className="underline font-semibold text-sm mt-3">
              {jp.jobTypeAndLocation}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {m_preferred_jobs.map((jobType, index) => (
                <p
                  key={index}
                  className="bg-primaryColor text-white text-xs px-2 py-1 rounded-full"
                >
                  {jobType.m_job_types.job_type_jp}
                </p>
              ))}
            </div>
            <hr className="mx-4 border rounded-md  border-gray-400" />
            <div className="flex flex-wrap items-center gap-2">
              {m_prefer_areas.map((area, index) => (
                <p
                  key={index}
                  className="bg-primaryColor text-white text-xs px-2 py-1 rounded-full"
                >
                  {area.prefecture.name}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-semibold my-3">{jp.language}</h1>
            <div className="flex items-center gap-x-3">
              {m_language_exams.map((language, index) => (
                <p key={index} className="text-sm">
                  {language.m_exam_levels.level}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-x-3 mt-3 mr-2">
              {m_language_exams.map((language, index) => (
                <p key={index} className="text-xs">
                  {language.m_exams.name_jp}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 pl-4">
          <h1 className=" font-sm font-semibold mb-2 ">{jp.education}</h1>
          <div className="flex flex-col gap-y-3 mb-2">
            {m_education.map((edu, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-x-3"
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
                  {edu.academic_end_year ? `- ${edu.academic_end_year}` : ""}
                </p>
              </div>
            ))}
          </div>
          <h1 className=" font-sm font-semibold">{jp.workExperience}</h1>
          <div>
            {m_job_experiences.map((exp, index) => (
              <div key={index} className="flex items-start gap-x-2 my-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10 text-primaryColor"
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
                      <h1 className="text-sm font-semibold">{exp.job_type}</h1>
                      <p className="text-sm text-gray-500">{exp.job_name}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {exp.start_year} {exp.end_year ? `- ${exp.end_year}` : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-light">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedApplicants;
