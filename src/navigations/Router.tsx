import { BrowserRouter, Route, Routes } from "react-router-dom";
import Routenames from "./routes";


import DashboardScreen from "@/screens/DashboardScreen";
import ApplicantScreen from "@/screens/ApplicantScreen";
import JobScreen from "@/screens/JobScreen";
import MessageScreen from "@/screens/MessageScreen";
import CalendarScreen from "@/screens/CalendarScreen";
import RegisterScreen from "@/screens/Auth/RegisterScreen";
import { events } from "@/const";
import LoginScreen from "@/screens/Auth/LoginScreen";
import UserFormScreen from "@/screens/UserForm/UserFormScreen";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth route */}
        <Route
          path={Routenames.USER.USER_FORM}
          Component={() => <UserFormScreen />}
        />
        <Route
          path={Routenames.USER.REGISTER}
          Component={() => <RegisterScreen />}
        />
        /* <Route
     path={Routenames.USER.LOGIN}
     Component={()=> <LoginScreen/>}
     />
 
        {/* end auth route */}

        {/* Dashboard routes */}
        <Route
          path={Routenames.USER.DASHBOARD}
          Component={() => <DashboardScreen />}
        />
        {/* Applicants routes */}
        <Route
          path={Routenames.USER.APPLICANTS}
          Component={() => <ApplicantScreen />}
        />
        {/* jobs routes */}
        <Route path={Routenames.USER.JOBS} Component={() => <JobScreen />} />
        {/* message routes */}
        <Route
          path={Routenames.USER.MESSAGES}
          Component={() => <MessageScreen />}
        />
        {/* calendar routes */}
        <Route
          path={Routenames.USER.CALENDAR}
          Component={() => <CalendarScreen events={events} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
