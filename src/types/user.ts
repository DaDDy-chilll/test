export interface User {
  user_name?: string;
  mail: string;
  password: string;
}

export type UserProfile = {
  id: string;
  profileImage: string;
  personalInfo: {
    location: string;
    birthdate: string;
    gender: string;
  },
  jobsPreference: {
    passport: string;
    salary: string;
    workingHours: string;
    accommodationProvided: string;
    rentSupport: string;
    preferredJobAndArea: {
      jobTypes: string[];
      areas: string[];
    },
  },
  languages: 
    {
      level: string;
    }[],
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
  ],
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
  ],
}