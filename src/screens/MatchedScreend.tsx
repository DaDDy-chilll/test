import Layout from "@/layouts/Layout";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import MatchedApplicants from "@/components/Matched/MatchedApplicants";
import { UserProfile } from '@/types/user';
;


const MatchedScreend = () => {
  const [jobType, setJobType] = useState("Job Name");

  const defaultJobType = [
    { id: 0, name: "All" },
    { id: 1, name: "Full Time" },
    { id: 2, name: "Part Time" },
    { id: 3, name: "Remote" },
    { id: 4, name: "Internship" },
  ];

  const handleJobType = (item: any) => {
    setJobType(item.name);
  };


  const userProfile: UserProfile = {
    id: "U20231254",
    profileImage: '',
    personalInfo: {
      location: "Lives in Japan (Tokyo)",
      birthdate: "11.10.2000",
      gender: "Male",
    },
    jobsPreference: {
      passport: "Yes",
      salary: "220000¥",
      workingHours: "8 Hrs",
      accommodationProvided: "Yes",
      rentSupport: "Yes",
      preferredJobAndArea: {
        jobTypes: ["Accommodation", "Agriculture", "Aviation"],
        areas: ["Tokyo", "Kyoto", "Hokkaido", "Osaka", "Nagoya"],
      },
    },
    languages: [
      {level: "Tokutei Level"},
      {level: "English Level"},
      {level: "Japanese Level"},
    ],
    education: [
      {
        schoolLevel: "High School",
        schoolName: "School Name",
        year: "Year",
      },
      {
        schoolLevel: "Specialized Major (Bachelor)",
        schoolName: "School Name",
        year: "Year",
      },
      {
        schoolLevel: "Recent Class",
        schoolName: "",
        year: "",
      },
    ],
    workExperience: [
      {
        position: "Work Position (Job Type)",
        companyName: "Company Name",
        year: "Year",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mattis aenean euismod tellus aliquam interdum blandit tortor. Ac facilisis eget massa amet duis sed nibh leo. Urna viverra massa.",
      },
      {
        position: "Work Position (Job Type)",
        companyName: "Company Name",
        year: "Year",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mattis aenean euismod tellus aliquam interdum blandit tortor. Ac facilisis eget massa amet duis sed nibh leo. Urna viverra massa.",
      },
    ],
  };
  

  return (
    <Layout>
      <motion.div
        variants={matchedVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full py-3"
      >
        <div className="text-end px-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex w-40 justify-between items-center gap-2 bg-primaryColor text-white px-5 py-1.5 rounded-md">
                <p className="text-sm mr-3">{jobType}</p>
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {defaultJobType.map((item) => (
                <DropdownMenuItem key={item.id} onClick={() => handleJobType(item)}>
                  <p>{item.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="py-2 px-7">
          <MatchedApplicants applicant={userProfile} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-white text-gray-900 shadow-sm shadow-slate-900 p-2 rounded-full">
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button className="bg-white text-gray-900 shadow-sm shadow-slate-900 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button className="bg-white text-gray-900 shadow-sm shadow-slate-900 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-primaryColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          <button className="bg-white text-gray-900 shadow-sm shadow-slate-900 p-2 rounded-full">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </Layout>
  );
};

const matchedVariants = {
  initial: { opacity: 0},
  animate: { opacity: 1,transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 } },
};

export default MatchedScreend;
