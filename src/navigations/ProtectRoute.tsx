/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Routenames from "./routes";
type ProtectedPageProps = {
  children: React.ReactNode;
};

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  if (!user || !token) {
    return <Navigate to={Routenames.LOGIN} />;
  }
  return children;
};
export default ProtectedPage;