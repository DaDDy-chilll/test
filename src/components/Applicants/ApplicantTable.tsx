type Applicant = {
  id: number;
  name: string;
  userId: string;
  preferJob: string[];
  address: string;
  education: string;
  japaneseLevel: string;
  gender: string;
};

type ApplicantTableProps = {
  applicants: Applicant[];
  handleDetail: (id: number) => void;
};

const ApplicantTable = ({ applicants, handleDetail }: ApplicantTableProps) => {
  return (
    <div className="relative overflow-y-auto h-[calc(100vh-225px)] ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 sticky top-0 bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Prefer Job
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Address
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Education
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Japanese
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Gender
            </th>
            <th scope="col" className="px-6 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {applicants.length > 0 ? (
            applicants.map((applicant, index) => (
              <tr className="bg-white dark:bg-gray-800" key={index}>
                <td className=" py-2 text-center">{applicant.id}</td>
                <th
                  scope="row"
                  className=" py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>{applicant.name}</p>
                  <p className="text-xs font-normal text-gray-500">
                    {applicant.userId}
                  </p>
                </th>
                <td className=" py-2 flex flex-col items-center justify-center gap-1">
                  {applicant.preferJob.map((job, index) => (
                    <p
                      className="text-xs text-white font-normal bg-primaryColor rounded-full px-2 py-1"
                      key={index}
                    >
                      {job}
                    </p>
                  ))}
                </td>
                <td className="py-2 text-center text-secondaryColor">
                  {applicant.address}
                </td>
                <td className=" py-2 text-center text-secondaryColor">
                  {applicant.education}
                </td>
                <td className=" py-2 text-center text-secondaryColor">
                  {applicant.japaneseLevel}
                </td>
                <td className=" py-2 text-center text-secondaryColor">
                  {applicant.gender}
                </td>
                <td className=" py-2 text-center text-secondaryColor">
                  <button
                    onClick={() => handleDetail(applicant.id)}
                    className="text-xs text-white bg-primaryColor rounded-full px-2 py-1 hover:bg-secondaryColor"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center text-gray-500 pt-20">
                <div className="flex flex-col items-center justify-center gap-2">
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
                <p className="text-gray-500 text-lg">No Applicants</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantTable;
