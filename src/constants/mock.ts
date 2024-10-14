import { UserProfile } from "@/types/user";

export const userProfile: UserProfile = {
  id: "U20231254",
  profileImage: "",
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
    { level: "Tokutei Level" },
    { level: "English Level" },
    { level: "Japanese Level" },
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
