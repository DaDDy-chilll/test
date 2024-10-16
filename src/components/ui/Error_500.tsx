import { Link } from "react-router-dom";
import Routes from "@/navigations/routes";
import internalServerError from "@/assets/images/500.svg";
import { jp } from "@/lang/jp";
const Error500 = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-y-10">
      <img src={internalServerError} alt="not found" width={300} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-4xl font-normal text-secondaryColor">
          {jp.serverError}
        </h1>
        <p className="text-lg font-light text-gray-500">
          申し訳ありませんが、内部サーバーエラーが発生しました。
        </p>
        <p className="text-sm font-light text-gray-500">
          後でもう一度お試しください
        </p>
        <Link
          to={Routes.DASHBOARD}
          className="bg-primaryColor text-white px-10 py-2 rounded-md"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
};

export default Error500;
