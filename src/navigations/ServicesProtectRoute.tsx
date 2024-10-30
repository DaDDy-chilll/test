import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Routenames from "./routes";
type ProtectedPageProps = {
  children: React.ReactNode;
};

/**
 * This function is used to protect routes based on user authentication and verification status
 * @param {ProtectedPageProps} children - The child components to render if the user is authenticated and verified
 * @returns {React.ReactNode} - The child components or a navigation component to redirect the user
 * @author PSK
 */
const ServicesProtectedPage = ({ children }: ProtectedPageProps) => {
  const { user, token, verified } = useSelector(
    (state: RootState) => state.auth,
  );
  if (!user && !token && verified == null) {
    return <Navigate to={Routenames.INITIAL_LANDING} />;
  } else if (user && token && verified == false) {
    return <Navigate to={Routenames.PROFILE_FORM} />;
  }
  return children;
};
export default ServicesProtectedPage;
