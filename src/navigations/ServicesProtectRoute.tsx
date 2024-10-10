import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Routenames from "./routes";
type ProtectedPageProps = {
  children: React.ReactNode;
};

const ServicesProtectedPage = ({ children }: ProtectedPageProps) => {
  const { user, token,verified } = useSelector((state: RootState) => state.auth);
  if (!user && !token && verified == null) {
    return <Navigate to={Routenames.LOGIN} />;
  }
  else if(user && token && verified == false){
    return <Navigate to={Routenames.PROFILE_FORM} />;
  }
  return children;
};
export default ServicesProtectedPage;
