import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Routenames from "./routes";
type ProtectedPageProps = {
  children: React.ReactNode;
};

/**
 * This function is used to protect routes based on authentication status
 * @author PSK
 * @param {ProtectedPageProps} children - The child components to render if the user is authenticated
 * @returns {JSX.Element} - A Navigate component to redirect or the children components
 */
const AuthProtectRoute = ({ children }: ProtectedPageProps) => {
  const { forgotPassword, user, token, verified } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!forgotPassword && verified == null) {
    return <Navigate to={Routenames.LOGIN} />;
  } else if (user && token && verified) {
    return <Navigate to={Routenames.DASHBOARD} />;
  } else {
    return children;
  }
};

export default AuthProtectRoute;
