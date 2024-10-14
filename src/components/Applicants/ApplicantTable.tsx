import { jp } from "../../lang/jp";
import eyeOpenWhite from "../../assets/icons/eye-open-white.svg";
import DefaultUser from "@/assets/icons/default_user.svg";
import { TableRowSkeleton } from "@/components";
type Applicant = {
  id: string;
  profileImage: string;
  m_basicinfos: {
    name: string;
    location: string;
    birthdate: string;
    gender: number;
    user_id: number;
    live_in_japan: number;
    profile_path: string;
    address: string;
  };
  m_preferred_jobs: [
    {
      job_type: number;
    },
  ];
  m_language_exams: [
    {
      m_exams: {
        name_jp: string;
      };
      m_exam_levels: {
        level: string;
      };
    },
  ];
  m_education: [
    {
      major: string;
    },
  ];
  jobsPreference: {
    passport: string;
    salary: string;
    workingHours: string;
    accommodationProvided: string;
    rentSupport: string;
    preferredJobAndArea: {
      jobTypes: string[];
      areas: string[];
    };
  };

  languages: {
    level: string;
  }[];
  education: [
    {
      schoolLevel: string;
      schoolName: string;
      year: string;
    },
    {
      schoolLevel: string;
      schoolName: string;
      year: string;
    },
    {
      schoolLevel: string;
      schoolName: string;
      year: string;
    },
  ];
  workExperience: [
    {
      position: string;
      companyName: string;
      year: string;
      description: string;
    },
    {
      position: string;
      companyName: string;
      year: string;
      description: string;
    },
  ];
};

type ApplicantTableProps = {
  applicants: Applicant[];
  handleDetail: (id: string) => void;
  jobTypes: any;
  loading: boolean;
};

const ApplicantTable = ({
  applicants,
  handleDetail,
  jobTypes,
  loading,
}: ApplicantTableProps) => {
  const getJobTypeJp = (jobTypeId: number) => {
    const jobType = jobTypes?.data.find((job: any) => job.id === jobTypeId);
    return jobType ? jobType.job_type_jp : "Unknown";
  };

  return (
    <div className="relative overflow-y-auto h-[calc(100vh-200px)]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 sticky top-0 bg-white z-40">
          <tr>
            <th scope="col" className=" py-3 text-start pl-5">
              {jp.id}
            </th>
            <th scope="col" className="py-3 text-start">
              {jp.name}
            </th>
            <th scope="col" className=" py-3 text-start">
              {jp.preferJob}
            </th>
            <th scope="col" className=" py-3 text-start w-[15%]">
              {jp.address}
            </th>
            <th scope="col" className=" py-3 text-start">
              {jp.education}
            </th>
            <th scope="col" className=" py-3 text-start">
              {jp.language}
            </th>
            <th scope="col" className=" py-3 text-start">
              {jp.level}
            </th>
            <th scope="col" className="py-3 text-start">
              {jp.gender}
            </th>
            <th scope="col" className=" py-3 text-start">
              {jp.view}
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))
          ) : applicants.length > 0 ? (
            applicants.map((applicant, index) => (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                key={index}
              >
                {/* image column */}
                <td className=" py-2 text-start pl-5">
                  <img
                    src={
                      applicant.m_basicinfos.profile_path
                        ? `https://api.japanjob.exbrainedu.com/v1/file/photo/${applicant.m_basicinfos.profile_path}`
                        : DefaultUser
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                    crossOrigin="anonymous"
                  />
                </td>
                {/* name column */}
                <th
                  scope="row"
                  className=" py-2 text-start font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p className="text-xs">{applicant.m_basicinfos.name}</p>
                  <p className="text-xs font-light text-gray-500">
                    {applicant.m_basicinfos.user_id}
                  </p>
                </th>

                {/* job column */}
                <td
                  data-tooltip-target="tooltip-default"
                  className="relative group py-2  flex flex-col items-start justify-center gap-1 cursor-pointer"
                >
                  <div className="flex flex-col items-center  justify-center gap-1 cursor-pointer">
                    {applicant.m_preferred_jobs.length > 0 ? (
                      <>
                        <div className="flex  items-center justify-start gap-1 cursor-pointer">
                          <p className="text-xs  text-white font-normal bg-primaryColor rounded-md px-2 py-1 inline-block">
                            {getJobTypeJp(
                              applicant.m_preferred_jobs[0].job_type,
                            )}
                          </p>
                          {applicant.m_preferred_jobs.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">
                              +{applicant.m_preferred_jobs.length - 1}
                            </span>
                          )}
                        </div>
                        {applicant.m_preferred_jobs.length > 1 && (
                          <div className="absolute invisible group-hover:visible z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2 mt-1  left-10 ml-2">
                            {applicant.m_preferred_jobs
                              .slice(1)
                              .map((job, index) => (
                                <p
                                  key={index}
                                  className="text-xs text-gray-700 whitespace-nowrap my-2"
                                >
                                  {getJobTypeJp(job.job_type)}
                                </p>
                              ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {jp.noPreferredJobs}
                      </div>
                    )}
                  </div>
                </td>

                {/* address column */}
                <td className="py-2 text-xs text-start text-gray-500">
                  {applicant.m_basicinfos.address}
                </td>

                {/* education column */}
                <td>
                  <div
                    data-tooltip-target="tooltip-default"
                    className="relative group py-2  flex flex-col items-start justify-center gap-1 cursor-pointer"
                  >
                    {applicant.m_education.length > 0 ? (
                      <>
                        <div className="flex  items-center justify-start gap-1 cursor-pointer">
                          <p className="text-xs">
                            {applicant.m_education[0].major}
                          </p>
                          {applicant.m_education.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">
                              +{applicant.m_education.length - 1}
                            </span>
                          )}
                        </div>
                        {applicant.m_education.length > 1 && (
                          <div className="absolute invisible group-hover:visible z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2 mt-1  left-10 ml-2">
                            {applicant.m_education
                              .slice(1)
                              .map((edu, index) => (
                                <p
                                  key={index}
                                  className="text-xs text-gray-700 whitespace-nowrap my-2"
                                >
                                  {edu.major}
                                </p>
                              ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {jp.noEducation}
                      </div>
                    )}
                  </div>
                </td>

                {/* Tokutei column */}
                <td>
                  <div
                    data-tooltip-target="tooltip-default"
                    className="relative group py-2  flex flex-col items-start justify-center gap-1 cursor-pointer"
                  >
                    {applicant.m_language_exams.length > 0 ? (
                      <>
                        <div className="flex  items-center justify-start gap-1 cursor-pointer">
                          <p className="text-xs">
                            {applicant.m_language_exams[0].m_exams.name_jp}
                          </p>
                          {applicant.m_language_exams.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">
                              +{applicant.m_language_exams.length - 1}
                            </span>
                          )}
                        </div>
                        {applicant.m_language_exams.length > 1 && (
                          <div className="absolute invisible group-hover:visible z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2 mt-1  left-10 ml-2">
                            {applicant.m_language_exams
                              .slice(1)
                              .map((lang, index) => (
                                <p
                                  key={index}
                                  className="text-xs text-gray-700 whitespace-nowrap my-2"
                                >
                                  {lang.m_exams.name_jp}
                                </p>
                              ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {jp.noTokutei}
                      </div>
                    )}
                  </div>
                </td>

                {/* japanese column */}
                <td>
                  <div
                    data-tooltip-target="tooltip-default"
                    className="relative group py-2  flex flex-col items-start justify-center gap-1 cursor-pointer"
                  >
                    {applicant.m_language_exams.length > 0 ? (
                      <>
                        <div className="flex  items-center justify-start gap-1 cursor-pointer">
                          <p className="text-xs">
                            {applicant.m_language_exams[0].m_exam_levels.level}
                          </p>
                          {applicant.m_language_exams.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">
                              +{applicant.m_language_exams.length - 1}
                            </span>
                          )}
                        </div>
                        {applicant.m_language_exams.length > 1 && (
                          <div className="absolute invisible group-hover:visible z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2 mt-1  left-10 ml-2">
                            {applicant.m_language_exams
                              .slice(1)
                              .map((lang, index) => (
                                <p
                                  key={index}
                                  className="text-xs text-gray-700 whitespace-nowrap my-2"
                                >
                                  {lang.m_exam_levels.level}
                                </p>
                              ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {jp.noJapanese}
                      </div>
                    )}
                  </div>
                </td>

                <td className=" p-2 text-start text-secondaryColor">
                  <p className="text-xs text-gray-500">
                    {applicant.m_basicinfos.gender === 0 ? jp.male : jp.female}
                  </p>
                </td>

                <td className=" py-2 text-start text-secondaryColor">
                  <button
                    onClick={() => handleDetail(applicant.id)}
                    className="text-xs text-white bg-primaryColor rounded-md px-2 py-1 hover:bg-secondaryColor"
                  >
                    <img
                      src={eyeOpenWhite}
                      alt="eye"
                      className="w-4 h-4 mr-2 inline-block text-gray-500"
                    />
                    {jp.view}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-gray-500 pt-40">
                <div>
                  <div className="flex justify-center items-center">
                    <svg
                      width="152px"
                      height="152px"
                      viewBox="0 0 24.00 24.00"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          opacity="0.4"
                          d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z"
                          stroke="#292D32"
                          strokeWidth="0.672"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          opacity="0.4"
                          d="M16.9675 14.4402C18.3375 14.6702 19.8475 14.4302 20.9075 13.7202C22.3175 12.7802 22.3175 11.2402 20.9075 10.3002C19.8375 9.59016 18.3075 9.35016 16.9375 9.59016"
                          stroke="#292D32"
                          strokeWidth="0.672"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          opacity="0.4"
                          d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z"
                          stroke="#292D32"
                          strokeWidth="0.672"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          opacity="0.4"
                          d="M6.9975 14.4402C5.6275 14.6702 4.1175 14.4302 3.0575 13.7202C1.6475 12.7802 1.6475 11.2402 3.0575 10.3002C4.1275 9.59016 5.6575 9.35016 7.0275 9.59016"
                          stroke="#292D32"
                          strokeWidth="0.672"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M12.0001 14.6302C11.9401 14.6202 11.8701 14.6202 11.8101 14.6302C10.4301 14.5802 9.33008 13.4502 9.33008 12.0502C9.33008 10.6202 10.4801 9.47021 11.9101 9.47021C13.3401 9.47021 14.4901 10.6302 14.4901 12.0502C14.4801 13.4502 13.3801 14.5902 12.0001 14.6302Z"
                          stroke="#292D32"
                          strokeWidth="0.672"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M9.0907 17.7804C7.6807 18.7204 7.6807 20.2603 9.0907 21.2003C10.6907 22.2703 13.3107 22.2703 14.9107 21.2003C16.3207 20.2603 16.3207 18.7204 14.9107 17.7804C13.3207 16.7204 10.6907 16.7204 9.0907 17.7804Z"
                          stroke="#292D32"
                          strokeWidth="0.672"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500 text-lg">{jp.noApplicants}</p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantTable;
