import { Timestamp } from "firebase/firestore";

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
  confirm_password: string;
};

export type ErrorType = {
  error: boolean;
  message: any;
  status?: number;
};

export type AuthErrorType = {
  email?: {
    jp: string;
    mm: string;
  };
  password?: {
    jp: string;
    mm: string;
  };
  confirm_password?: {
    jp: string;
    mm: string;
  };
  otp?: {
    jp: string;
    mm: string;
  };
  validation?: [
    email?: {
      jp: string;
      mm: string;
    },
    password?: {
      jp: string;
      mm: string;
    },
    confirm_password?: {
      jp: string;
      mm: string;
    },
  ];
};

export type ProfileFormErrorType = {
  photo?: {
    jp: string;
    mm: string;
  };
  name?: {
    jp: string;
    mm: string;
  };
  industry_type_id?: {
    jp: string;
    mm: string;
  };
  budget?: {
    jp: string;
    mm: string;
  };
  starting?: {
    jp: string;
    mm: string;
  };
  staff?: {
    jp: string;
    mm: string;
  };
  area?: {
    jp: string;
    mm: string;
  };
  prefecture_id?: {
    jp: string;
    mm: string;
  };
  company_des?: {
    jp: string;
    mm: string;
  };
  address?: {
    jp: string;
    mm: string;
  };
  manager?: {
    jp: string;
    mm: string;
  };
  ceo?: {
    jp: string;
    mm: string;
  };
  secondary_email?: {
    jp: string;
    mm: string;
  };
  phone_number?: {
    jp: string;
    mm: string;
  };
  yt_url?: {
    jp: string;
    mm: string;
  };
  fb_url?: {
    jp: string;
    mm: string;
  };
  ig_url?: {
    jp: string;
    mm: string;
  };
  web_url?: {
    jp: string;
    mm: string;
  };
  validation?: [
    name?: {
      jp: string;
      mm: string;
    },
    industry_type_id?: {
      jp: string;
      mm: string;
    },
    budget?: {
      jp: string;
      mm: string;
    },
    starting?: {
      jp: string;
      mm: string;
    },
    staff?: {
      jp: string;
      mm: string;
    },
    area?: {
      jp: string;
      mm: string;
    },
    prefecture_id?: {
      jp: string;
      mm: string;
    },
    company_des?: {
      jp: string;
      mm: string;
    },
    address?: {
      jp: string;
      mm: string;
    },
    undertake?: {
      jp: string;
      mm: string;
    },
    ceo?: {
      jp: string;
      mm: string;
    },
    email?: {
      jp: string;
      mm: string;
    },
    phone_number?: {
      jp: string;
      mm: string;
    },
  ];
};

export type JobFormErrorType = {
  job_title?: {
    jp: string;
    mm: string;
  };
  job_types?: {
    jp: string;
    mm: string;
  };
  prefecture_id?: {
    jp: string;
    mm: string;
  };
  annual_salary?: {
    jp: string;
    mm: string;
  };
  working_time?: {
    jp: string;
    mm: string;
  };
  holiday_in_year?: {
    jp: string;
    mm: string;
  };
  start_time?: {
    jp: string;
    mm: string;
  };
  end_time?: {
    jp: string;
    mm: string;
  };
  job_des?: {
    jp: string;
    mm: string;
  };
  area?: {
    jp: string;
    mm: string;
  };
  validation?: [
    job_title?: {
      jp: string;
      mm: string;
    },
    job_types?: {
      jp: string;
      mm: string;
    },
    prefecture_id?: {
      jp: string;
      mm: string;
    },
    annual_salary?: {
      jp: string;
      mm: string;
    },
    working_time?: {
      jp: string;
      mm: string;
    },
    holiday_in_year?: {
      jp: string;
      mm: string;
    },
    start_time?: {
      jp: string;
      mm: string;
    },
    end_time?: {
      jp: string;
      mm: string;
    },
    job_des?: {
      jp: string;
      mm: string;
    },
    area?: {
      jp: string;
      mm: string;
    },
  ];
};

export type FilterType = {
  live_in_japan: string;
  gender: string;
  job_type: string;
};

export type Event = {
  name: string;
  user_photo: any;
  start_time: any;
  end_time: any;
  job_title: any;
};

export interface Chat {
  id: string;
  job_id: string;
  company_id: string;
  job_title: string;
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
  };
}

export interface PersonalInfo {
  location: string;
  birthdate: string;
  gender: string;
}

//TODO: delete this
export type UserProfile = {
  id: string;
  profileImage: string;
  personalInfo: PersonalInfo;
  jobsPreference: JobPreference;
  languages: Language[];
  education: Education[];
  workExperience: WorkExperience[];
};

export interface User {
  id: string | number;
  email: string;
  name: string;
  code: string;
}

export type ApplicantDetail = {
  id: string | number;
  address: string;
  email: string;
  code: string;
  m_basicinfos: {
    profile_path: string;
    name: string;
jp_name:string;
mm_name:string;
    live_in_japan: number;
    dob: string;
    gender: number;
    has_passport: number;
    video_path: string;
    phone: string;
    address: string;
  };
  m_prefer_areas: [
    {
      prefecture: {
        area_id: number;
        name: string;
      };
      area:{
        area:string;
      };
    },
  ];
  m_preferred_jobs: [
    {
      m_job_types: {
        job_type_jp: string;
      };
    },
  ];
  m_prefer_other: {
    start_salary: number;
    end_salary: number;
    working_time: number;
    support_home: number;
    support_home_rent: number;
  };
  m_language_exams: [
    {
      id: number;
      m_exam_levels: {
        level: number;
      };
      m_exams: {
        name_jp: string;
      };
    },
  ];
  m_education: [
    {
      id: number;
      academic_end_year: number;
      academic_start_year: number;
      academic_types_id: number;
      major: string;
      university_name: string;
      m_acdemic_types:{
        name_jp:string;
      }
    },
  ];
  m_job_experiences: [
    {
      id: number;
      job_name: string;
      job_type: string;
      description: string;
      start_year: string;
      end_year: string;
      m_job_types:{
        job_type_jp:string;
      }
    },
  ];
  m_tokutei_exams:[
    {
      m_exams:{
        name_jp:string;
      }
    }
  ]

};
