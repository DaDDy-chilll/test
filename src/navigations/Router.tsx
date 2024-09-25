import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Routenames from "./routes";
import ProtectRoute from "./ProtectRoute";
import ShareLayout from "@/layouts/ShareLayout";
import { AnimatePresence } from "framer-motion";
import { initialLanding, LoginScreen, RegisterScreen } from "@/screens";
import Loading from "@/components/ui/Loading";
import ToastAlert from "@/components/ui/toast";
const DashboardScreen = lazy(() => import("@/screens/DashboardScreen"));
const Profile = lazy(() => import("@/screens/Profile"));
const NotFound = lazy(() => import("@/components/Auth/NotFound"));
const ApplicantScreen = lazy(() => import("@/screens/ApplicantScreen"));
const MatchedScreend = lazy(() => import("@/screens/MatchedScreend"));
const ChatScreen = lazy(() => import("@/screens/ChatScreen"));
const JobScreen = lazy(() => import("@/screens/JobScreen"));
const AddJobScreen = lazy(() => import("@/screens/AddJobScreen"));
const CalendarScreen = lazy(() => import("@/screens/CalendarScreen"));
const UserFormScreen = lazy(() => import("@/screens/UserFormScreen"));

const Router = () => {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <BrowserRouter>
        <AnimatedRoutes />
        <ToastAlert />
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
        {/* Not found route */}
        <Route path="*" Component={NotFound} />
        {/* User form route */}
        <Route
          path={Routenames.USER_FORM}
          element={
            <ProtectRoute>
              <UserFormScreen />
            </ProtectRoute>
          }
        />

        {/* Protected routes */}
        <Route
          element={
            <ProtectRoute>
              <ShareLayout />
            </ProtectRoute>
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
