
type Applicant =     {
    id: number,
    name: string,
    userId: string,
    preferJob: string[],
    address: string,
    education: string,
    japaneseLevel: string,
    gender: string,
  }

type ApplicantTableProps = {
    applicants: Applicant[]
}

const ApplicantTable = ({applicants}: ApplicantTableProps) => {
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
            {applicants.map((applicant,index) => (
            <tr className="bg-white dark:bg-gray-800" key={index}>
                <td className=" py-2 text-center">
                    {applicant.id}
                </td>
                <th scope="row" className=" py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p>{applicant.name}</p>
                    <p className="text-xs font-normal text-gray-500">{applicant.userId}</p>
                </th>
                <td className=" py-2 flex flex-col items-center justify-center gap-1">
                    {applicant.preferJob.map((job,index) => (
                        <p className="text-xs text-white font-normal bg-primaryColor rounded-full px-2 py-1" key={index}>{job}</p>
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
                    view
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>

  )
}

export default ApplicantTable