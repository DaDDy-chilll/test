
interface ApiRoutesType {
    LOGIN: string,
    REGISTER: string,
    LOGOUT: string,
    APPLICANTS: string,
    APPLICANTS_DETAILS:string,
    JOBS: string,
    EVENTS: string,
    JOB_TYPES:string,
    TOKUTEI_EXAM:string
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
    TOKUTEI_EXAM:"/auth/tokutei-exam"
}