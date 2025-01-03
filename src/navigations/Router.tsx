import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Routenames from "./routes";
import ServicesProtectedPage from "./ServicesProtectRoute";
import AuthProtectRoute from "./AuthProtectRoute";
import ShareLayout from "@/lib/ShareLayout";
import { AnimatePresence } from "framer-motion";
import AuthShareLayout from "@/layouts/AuthShareLayout";

import {
  InitialLanding,
  LoginScreen,
  RegisterScreen,
  ForgotPassword,
  ChangePassword,
  Otp,
  PrivacyPolicy,
} from "@/screens";
import {
  NotFound,
  Loading,
  VerifyMali,
  Guide,
  Error500,
  NoConnection,
} from "@/components";

const DashboardScreen = lazy(() => import("@/screens/DashboardScreen"));
const Profile = lazy(() => import("@/screens/Profile"));
const ApplicantScreen = lazy(() => import("@/screens/ApplicantScreen"));
const MatchedScreend = lazy(() => import("@/screens/MatchedScreend"));
const ChatScreen = lazy(() => import("@/screens/ChatScreen"));
const JobScreen = lazy(() => import("@/screens/JobScreen"));
const CalendarScreen = lazy(() => import("@/screens/CalendarScreen"));
const ProfileFormScreen = lazy(() => import("@/screens/ProfileFormScreen"));
const DownloadApk = lazy(() => import("@/screens/DownloadApk"));

/**
 * This function is used to render the Router component with Suspense and BrowserRouter
 * @author PSK
 * @returns JSX.Element
 */
const Router = () => {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </Suspense>
  );
};

/**
 * This function is used to render the animated routes with AnimatePresence
 * @author PSK
 * @returns JSX.Element
 */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* initial landing route */}
        <Route path={Routenames.INITIAL_LANDING} Component={InitialLanding} />
        {/* auth route */}
        <Route path={Routenames.REGISTER} Component={RegisterScreen} />
        <Route path={Routenames.LOGIN} Component={LoginScreen} />
        {/* Download apk route */}
        <Route path={Routenames.DOWNLOAD_APK} Component={DownloadApk} />

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
        {/* Not found route */}
        <Route path={Routenames.NETWORK_ERROR} Component={NoConnection} />
        {/* Not found route */}
        <Route path={Routenames.SERVER_ERROR} Component={Error500} />
        {/* Privacy policy */}
        <Route path={Routenames.PRIVACY_POLICY} Component={PrivacyPolicy} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
