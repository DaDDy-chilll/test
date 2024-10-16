// import notfound from "@/assets/images/notfound.svg";
import { Link } from "react-router-dom";
import Routes from "@/navigations/routes";
import notfound from "@/assets/images/404.svg";
import { jp } from "@/lang/jp";
const NotFound = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-y-10">
      <img src={notfound} alt="not found" width={300} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-4xl font-normal text-secondaryColor">
          {jp.pageNotFound}
        </h1>
        <p className="text-lg font-light text-gray-500">
          申し訳ありませんが、お探しのページは見つかりませんでした。
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

export default NotFound;
