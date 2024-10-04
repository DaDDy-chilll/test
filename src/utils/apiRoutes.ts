
export interface ApiRoutesType {
    LOGIN: string,
    REGISTER: string,
    LOGOUT: string,
    APPLICANTS: string,
    APPLICANTS_DETAILS:string,
    JOBS: string,
    EVENTS: string,
    JOB_TYPES:string,
    TOKUTEI_EXAM:string,
    LANGUAGE:string,
    CITY:string,
    PROFILE:string,
    USER_DETAILS:string,
    JOB_DETAILS:string,
    MATCHED:string,
    LIKE:string,
    UNLIKE:string,
    UPDATE_JOB:string,
    INTERVIEW:string
}

export const apiRoutes: ApiRoutesType = {
    LOGIN: "/client/auth/login",
    REGISTER: "/client/auth/register",
    LOGOUT: "/client/auth/logout",
    APPLICANTS: "/client/users",
    APPLICANTS_DETAILS:"/client/users/details",
    JOBS: "/client/job",
    EVENTS: "/client/events",
    JOB_TYPES:"/auth/occupations",
    TOKUTEI_EXAM:"/auth/tokutei-exam",
    LANGUAGE:"/auth/language-exam",
    CITY:"/auth/areas",
    PROFILE:"/client/auth/company",
    USER_DETAILS:"client/users/detail",
    JOB_DETAILS:"/client/job/detail",
    UPDATE_JOB:"/client/job/update",
    MATCHED:"/client/job/match",
    LIKE:"/client/users/like",
    UNLIKE:'/client/users/dislike',
    INTERVIEW:'/client/interview'
}