import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Routenames from "./routes";
type ProtectedPageProps = {
  children: React.ReactNode;
};

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
