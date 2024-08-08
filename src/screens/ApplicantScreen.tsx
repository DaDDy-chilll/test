import Layout from "@/layouts/Layout"
import FilterBar from "@/components/Applicants/FilterBar";
import ApplicantCard from "@/components/Applicants/ApplicantCard";
const ApplicantScreen = () => {
  const applicants = Array(10).fill(0);
  return (
    <Layout>
    <div className="bg-gray-950 min-h-screen text-white">
            <FilterBar />
            <div className="p-4">
                <div className="text-3xl mb-4">ユーザー一覧</div>
                <p className="text-lg mb-8">Find your suitable applicants</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {applicants.map((_, idx) => (
                        <ApplicantCard avatar="" username="Ko Ko Zay" country="Myanmar" jlptLevel="n5" jobs={['IT','English','Math']} key={idx} />
                    ))}
                </div>
                <div className="flex justify-center items-center mt-8">
                    <button className="bg-gray-800 p-2 rounded-l-md">{"<"}</button>
                    <button className="bg-gray-800 p-2">1</button>
                    <button className="bg-gray-800 p-2">2</button>
                    <button className="bg-gray-800 p-2">3</button>
                    <button className="bg-gray-800 p-2">4</button>
                    <button className="bg-gray-800 p-2 rounded-r-md">{">"}</button>
                </div>
                <button className="bg-gray-800 text-white p-2 mt-4 rounded-md block mx-auto">
                    Matched Applicants
                </button>
            </div>
        </div>
    
    </Layout>
  )
}

export default ApplicantScreen;

