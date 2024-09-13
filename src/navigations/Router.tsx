import { BrowserRouter, Route, Routes } from "react-router-dom";
import Routenames from "./routes";

import DashboardScreen from "@/screens/DashboardScreen";
import ApplicantScreen from "@/screens/ApplicantScreen";
import JobScreen from "@/screens/JobScreen";
import MessageScreen from "@/screens/MessageScreen";
import CalendarScreen from "@/screens/CalendarScreen";
import RegisterScreen from "@/screens/Auth/RegisterScreen";
import { events } from "@/constants";
import LoginScreen from "@/screens/Auth/LoginScreen";
import UserFormScreen from "@/screens/UserForm/UserFormScreen";
import initialLanding from "@/screens/initialLanding";
import ProtectRoute from "./ProtectRoute";
import ShareLayout from "@/components/Layout/ShareLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* initial landing route */}
        <Route path={Routenames.INITIAL_LANDING} Component={initialLanding} />
        {/* auth route */}
        <Route path={Routenames.REGISTER} Component={RegisterScreen} />

        <Route path={Routenames.LOGIN} Component={LoginScreen} />
        {/* end auth route */}


        {/* Protected routes */}
        <Route
          element={
            <ProtectRoute>
              <ShareLayout />
            </ProtectRoute>
          }
        >
          <Route
            path={Routenames.USER_FORM}
            Component={() => <UserFormScreen />}
          />
          {/* Dashboard routes */}
          <Route path={Routenames.DASHBOARD} Component={DashboardScreen} />
          {/* Applicants routes */}
          <Route path={Routenames.APPLICANTS} Component={ApplicantScreen} />
          {/* jobs routes */}
          <Route path={Routenames.JOBS} Component={JobScreen} />
          {/* message routes */}
          <Route path={Routenames.MESSAGES} Component={MessageScreen} />
          {/* calendar routes */}
          <Route
            path={Routenames.CALENDAR}
            Component={() => <CalendarScreen events={events} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
