import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Routenames from "./routes";
import ProtectRoute from "./ProtectRoute";
import ShareLayout from "@/layouts/ShareLayout";
import {
  AddJobScreen,
  ApplicantScreen,
  CalendarScreen,
  ChatScreen,
  initialLanding,
  JobScreen,
  LoginScreen,
  MatchedScreend,
  RegisterScreen,
  UserFormScreen,
} from "@/screens";
import DashboardScreen from "@/screens/DashboardScreen";
import Profile from "@/screens/Profile";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import NotFound from "@/components/Auth/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation(); // useLocation should be used here, inside BrowserRouter
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* initial landing route */}
        <Route path={Routenames.INITIAL_LANDING} Component={initialLanding} />
        {/* auth route */}
        <Route path={Routenames.REGISTER} Component={RegisterScreen} />
        <Route path={Routenames.LOGIN} Component={LoginScreen} />
        {/* Not found route */}
        <Route path="*" Component={NotFound} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectRoute>
              <ShareLayout />
            </ProtectRoute>
          }
        >
          {/* User form route */}
          <Route path={Routenames.USER_FORM} Component={UserFormScreen} />
          {/* Dashboard routes */}
          <Route path={Routenames.DASHBOARD} Component={DashboardScreen} />
          {/* Applicants routes */}
          <Route path={Routenames.APPLICANTS} Component={ApplicantScreen} />
          {/* Matched routes */}
          <Route path={Routenames.MATCHES} Component={MatchedScreend} />
          {/* Matched routes */}
          <Route path={Routenames.CHAT} Component={ChatScreen} />
          {/* jobs routes */}
          <Route path={Routenames.JOBS} Component={JobScreen} />
          {/* jobs routes */}
          <Route path={Routenames.ADDJOB} Component={AddJobScreen} />
          {/* calendar routes */}
          <Route path={Routenames.CALENDAR} Component={CalendarScreen} />
          {/* jobs routes */}
          <Route path={Routenames.PROFILE} Component={Profile} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
