export interface ApiRoutesType {
  LOGIN: string;
  REGISTER: string;
  LOGOUT: string;
  APPLICANTS: string;
  APPLICANTS_DETAILS: string;
  JOBS: string;
  EVENTS: string;
  JOB_TYPES: string;
  TOKUTEI_EXAM: string;
  LANGUAGE: string;
  CITY: string;
  PROFILE: string;
  USER_DETAILS: string;
  JOB_DETAILS: string;
  MATCHED: string;
  LIKE: string;
  UNLIKE: string;
  UPDATE_JOB: string;
  INTERVIEW: string;
  FORGOT_PASSWORD: string;
  VERIFY_OTP: string;
  CHANGE_PASSWORD: string;
  DASHBOARD: string;
  CALENDAR: string;
  CREATE_JOB: string;
  DELETE_JOB: string;
  UPCOMING_INTERVIEW: string;
  UPLOAD_IMAGE: string;
  PRIVACY_POLICY: string;
  NOTIFICATION: string;
  FIND_INTERVIEW: string;
  GUIDE_VIDEO:string;
  CHECK_INTERVIEW:string;
  INDUSTRY_TYPES:string;
}

export const apiRoutes: ApiRoutesType = {
  LOGIN: "/client/auth/login",
  REGISTER: "/client/auth/register",
  LOGOUT: "/client/auth/logout",
  APPLICANTS: "/client/users",
  APPLICANTS_DETAILS: "/client/users/details",
  JOBS: "/client/job",
  EVENTS: "/client/events",
  JOB_TYPES: "/client/auth/job-types",
  INDUSTRY_TYPES: "/client/auth/industry-type",
  TOKUTEI_EXAM: "/auth/tokutei-exam",
  LANGUAGE: "/auth/language-exam",
  CITY: "/auth/areas",
  PROFILE: "/client/auth/company",
  USER_DETAILS: "client/users/detail",
  JOB_DETAILS: "/client/job/detail",
  UPDATE_JOB: "/client/job/update",
  CREATE_JOB: "/client/job",
  MATCHED: "/client/job/match",
  LIKE: "/client/users/like",
  UNLIKE: "/client/users/dislike",
  INTERVIEW: "/client/interview",
  FORGOT_PASSWORD: "/client/auth/send-forgot-password-otp",
  VERIFY_OTP: "/client/auth/verify-forgot-password-otp",
  CHANGE_PASSWORD: "/client/auth/change-password",
  DASHBOARD: "/client/dashboard",
CALENDAR: "/client/calendar",
  DELETE_JOB: "/client/job/delete",
  UPCOMING_INTERVIEW: "/client/interview/upcoming",
  UPLOAD_IMAGE: "/file",
  PRIVACY_POLICY: "/setting/privacy-policy",
  NOTIFICATION: "/client/auth/company-notification",
  FIND_INTERVIEW: "/client/interview/find",
  GUIDE_VIDEO:"/setting/links",
  CHECK_INTERVIEW:"/client/interview/check-user-interview"
};
