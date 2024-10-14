import { Link } from "react-router-dom";
import Routes from "@/navigations/routes";
import noConnection from "@/assets/images/no_connection.svg";
import { jp } from "@/lang/jp";
const NoConnection = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-10">
      <img src={noConnection} alt="not found" width={300} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-4xl font-normal text-secondaryColor">
          {jp.noConnection}
        </h1>
        <p className="text-lg font-light text-gray-500">
          インターネット接続を確認してください
        </p>
        <Link
          to={Routes.DASHBOARD}
          className="bg-primaryColor text-white px-10 py-2 rounded-md"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NoConnection;
