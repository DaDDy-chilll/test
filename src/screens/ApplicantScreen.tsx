import Layout from "@/layouts/Layout";
import { motion } from "framer-motion";
import FilterBar from "@/components/Applicants/FilterBar";
import ApplicantTable from "@/components/Applicants/ApplicantTable";
import { useState } from "react";
import Pagination from "@/components/Applicants/Pagination";
// import ApplicantCard from "@/components/Applicants/ApplicantCard";
const ApplicantScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const defaultApplicants = [
    {
      id: 1,
      name: "Zar Ni Win Lwin",
      userId: "U_2012112",
      preferJob: ["Accommodation", "Agriculture", "Aviation"],
      address: "Myanmar",
      education: "High School",
      japaneseLevel: "JLPT N4",
      gender: "Male",
    },
    {
      id: 2,
      name: "Aung Kyaw Moe",
      userId: "U_2013113",
      preferJob: ["IT", "Healthcare", "Construction"],
      address: "Thailand",
      education: "Bachelor's Degree",
      japaneseLevel: "JLPT N5",
      gender: "Male",
    },
    {
      id: 3,
      name: "Soe Thiri Aung",
      userId: "U_2014114",
      preferJob: ["Education", "Finance", "Marketing"],
      address: "Vietnam",
      education: "Master's Degree",
      japaneseLevel: "JLPT N3",
      gender: "Female",
    },
    {
      id: 4,
      name: "Kyaw Zeya",
      userId: "U_2015115",
      preferJob: ["Tourism", "Sales", "Engineering"],
      address: "Myanmar",
      education: "Diploma",
      japaneseLevel: "JLPT N2",
      gender: "Male",
    },
    {
      id: 5,
      name: "Hnin Wai Phyo",
      userId: "U_2016116",
      preferJob: ["Design", "Architecture", "Logistics"],
      address: "Cambodia",
      education: "High School",
      japaneseLevel: "JLPT N4",
      gender: "Female",
    },
    {
      id: 6,
      name: "Thiri Nwe Aye",
      userId: "U_2017117",
      preferJob: ["Accounting", "Management", "Law"],
      address: "Laos",
      education: "Bachelor's Degree",
      japaneseLevel: "JLPT N1",
      gender: "Female",
    },
    {
      id: 7,
      name: "Myat Thura",
      userId: "U_2018118",
      preferJob: ["Construction", "IT", "Agriculture"],
      address: "Myanmar",
      education: "Diploma",
      japaneseLevel: "JLPT N5",
      gender: "Male",
    },
  ];

  // Get current page's data
  const currentData = defaultApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <motion.div
        variants={applicantVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full overflow-hidden pb-4 relative"
      >
        <FilterBar />
        <div className="flex justify-start items-center px-4 py-2">
          <p className="text-gray-500 text-sm">
            Search Result <span className="text-secondaryColor">(100)</span>
          </p>
        </div>
        <ApplicantTable applicants={currentData} />
        <Pagination
          data={defaultApplicants}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    </Layout>
  );
};

const applicantVariants = {
  initial: { opacity: 0},
  animate: { opacity: 1,transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 } },
};

export default ApplicantScreen;
