import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Routenames from "./routes";
import ServicesProtectedPage from "./ServicesProtectRoute";
import AuthProtectRoute from "./AuthProtectRoute";
import ShareLayout from "@/lib/ShareLayout";
import { AnimatePresence } from "framer-motion";
import AuthShareLayout from "@/layouts/AuthShareLayout";
import {
  initialLanding,
  LoginScreen,
  RegisterScreen,
  ForgotPassword,
  ChangePassword,
  Otp,
} from "@/screens";
import { NotFound, Loading, VerifyMali,Guide } from "@/components";

const DashboardScreen = lazy(() => import("@/screens/DashboardScreen"));
const Profile = lazy(() => import("@/screens/Profile"));
const ApplicantScreen = lazy(() => import("@/screens/ApplicantScreen"));
const MatchedScreend = lazy(() => import("@/screens/MatchedScreend"));
const ChatScreen = lazy(() => import("@/screens/ChatScreen"));
const JobScreen = lazy(() => import("@/screens/JobScreen"));
const CalendarScreen = lazy(() => import("@/screens/CalendarScreen"));
const UserFormScreen = lazy(() => import("@/screens/UserFormScreen"));
const ProfileFormScreen = lazy(() => import("@/screens/ProfileFormScreen"));

const Router = () => {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </Suspense>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* initial landing route */}
        <Route path={Routenames.INITIAL_LANDING} Component={initialLanding} />
        {/* auth route */}
        <Route path={Routenames.REGISTER} Component={RegisterScreen} />
        <Route path={Routenames.LOGIN} Component={LoginScreen} />
        
        {/* Auth Protected routes */}
        <Route
          element={
            <AuthProtectRoute>
              <AuthShareLayout />
            </AuthProtectRoute>
          }
        >
          {/* verification route */}
          <Route path={Routenames.VERIFICATION} Component={VerifyMali} />
          {/* Forgot password route */}
          <Route path={Routenames.FORGOT_PASSWORD} Component={ForgotPassword} />
          {/* OTP route */}
          <Route path={Routenames.OTP} Component={Otp} />
          <Route path={Routenames.PROFILE_FORM} Component={ProfileFormScreen} />
          {/* Change password route */}
          <Route path={Routenames.CHANGE_PASSWORD} Component={ChangePassword} />
          {/* User form route */}
          <Route path={Routenames.USER_FORM} Component={UserFormScreen} />
        </Route>

        {/* Services Protected routes */}
        <Route
          element={
            <ServicesProtectedPage>
              <ShareLayout />
            </ServicesProtectedPage>
          }
        >
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
          <Route path={Routenames.CALENDAR} Component={CalendarScreen} />
          {/* jobs routes */}
          <Route path={Routenames.PROFILE} Component={Profile} />
          {/* Guide routes */}
          <Route path={Routenames.GUIDE} Component={Guide} />
        </Route>

        {/* Not found route */}
        <Route path="*" Component={NotFound} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
