
interface ApiRoutesType {
    LOGIN:string,
    REGISTER:string,
    LOGOUT:string,
    APPLICANTS:string,
    JOBS:string,
    EVENTS:string
}

export const apiRoutes:ApiRoutesType = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    APPLICANTS: "/applicants",
    JOBS: "/jobs",
    EVENTS: "/events",
}