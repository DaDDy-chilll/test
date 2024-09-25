import {
  Timestamp,
} from "firebase/firestore";

export type FetchServerType = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  file?: boolean | null;
  endpoint?: string | null;
  token?: string | null;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ErrorType = {
  error: boolean;
  message: string;
  status: number;
}

export type FilterType = {
  livesInJapan: boolean;
  livesInMyanmar: boolean;
  gender: string;
  language: string;
  education: string;
  jobType: string;
}

export type Event = {
  title: string;
  date: string;
  description: string;
}


export interface Chat {
  id: string;
  job_id: string;
  company_id: string;
  jobfinder_id: string;
  company_name: string;
  jobfinder_name: string;
  company_logo: string;
  jobfinder_profile_image: string;
  created_at: Timestamp;
  last_message: string;
  last_message_timestamp: Timestamp;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: number;
  content: string;
  timestamp: Timestamp;
  read: boolean;
}

/*
export interface User {
  id: string;
  m_basicinfos: {
    name: string;
    profile_path: string;
  };
}
*/
export interface Education {
  schoolLevel: string;
  schoolName: string;
  year: string;
}

export interface WorkExperience {
  position: string;
  companyName: string;
  year: string;
  description: string;
}

export interface Language {
  level: string;
}

export interface JobPreference {
  passport: string;
  salary: string;
  workingHours: string;
  accommodationProvided: string;
  rentSupport: string;
  preferredJobAndArea: {
    jobTypes: string[];
    areas: string[];
  }
}

export interface PersonalInfo {
  location: string;
  birthdate: string;
  gender: string;
}

export type UserProfile = {
  id: string;
  profileImage: string;
  personalInfo: PersonalInfo,
  jobsPreference: JobPreference,
  languages: Language[],
  education: Education[],
  workExperience: WorkExperience[],
}

export interface User {
  id: string | number;
  email: string;
  // name: string;
}