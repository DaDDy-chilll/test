import { ReactNode, useState } from "react";
import logo from "@/assets/navbar/logo.svg";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import { LoginUser } from "@/types/user/loginUser";
import KeyGreen from "@/assets/user/top_page/KeyGreen.png";

interface UserLayoutProps {
  children: ReactNode;
  activeNumber?: number;
  badge?: number;
  loginUser?: LoginUser | undefined;
  changeLoginUserAction?: (loginUser: LoginUser | undefined) => void;
}

const UserLayout: React.FC<UserLayoutProps> = ({
  children,
  activeNumber,
  badge,
  loginUser,
  changeLoginUserAction,
}) => {
  const navigate = useNavigate();
  // const redirect = ({ route, state }: any) => {
  //   navigate(route, {
  //     state,
  //   });
  // };

  // const subNavItems: Array<subNavItemsProp> = [
  //   {
  //     Title: "製品一覧",
  //     route: Routes.USER.PRODUCT,
  //     active: activeNumber === 1,
  //   },
  //   {
  //     Title: "お問合せ",
  //     route: null,
  //     active: activeNumber === 2,
  //   },
  //   {
  //     Title: "ログイン",
  //     route: Routes.USER.LOGIN,
  //     active: activeNumber === 3,
  //   },
  //   {
  //     Title: "カート",
  //     route: Routes.USER.CART,
  //     active: activeNumber === 4,
  //     badge: 2,
  //   },
  // ];

  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="bg-white relative w-screen h-screen overflow-x-hidden">
      <div className=" w-full px-12 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50 bg-white">
        <div
          className="flex space-x-4 cursor-pointer"
          onClick={() => navigate(Routes.USER.TOP_PAGE)}
        >
          <img src={logo} alt="Euphoria's Logo" className="w-[60px]" />
          <div className="flex flex-col justify-center space-y-2">
            <p className="font-bold text-primaryColor text-xl">
              ユーフォリアプラスショップ
            </p>
            <p className="text-xs tracking-widest">online shop</p>
          </div>
        </div>
        <div className="flex space-x-16 text-sm font-thin">
          {/* {subNavItems.map(
            ({ Title, active, badge, route }: subNavItemsProp, index: number) => {
              return (
                <div
                  key={index}
                  onClick={route ? () => redirect({ route }) : () => {}}
                  className={`cursor-pointer font-semibold flex items-center space-x-2 ${
                    active && "text-primaryColor"
                  }`}
                >
                  <p>{typeof Title === "string" ? Title : <Title />}</p>
                  {badge && (
                    <div className="w-[20px] h-[20px] text-xs rounded-full bg-red-600 flex justify-center items-center text-white">
                      {badge}
                    </div>
                  )}
                </div>
              );
            }
          )} */}
          <div
            onClick={() => navigate(Routes.USER.PRODUCT)}
            className={`cursor-pointer font-semibold flex items-center space-x-2 ${
              activeNumber === 1 && "text-primaryColor"
            }`}
          >
            <p>製品一覧</p>
          </div>
          <div
            onClick={() => {}}
            className={`cursor-pointer font-semibold flex items-center space-x-2 ${
              activeNumber === 2 && "text-primaryColor"
            }`}
          >
            <p>お問合せ</p>
          </div>
          {!loginUser ? (
            <div
              onClick={() => navigate(Routes.USER.LOGIN)}
              className={`cursor-pointer font-semibold flex items-center space-x-2 ${
                activeNumber === 3 && "text-primaryColor"
              }`}
            >
              <p>ログイン</p>
            </div>
          ) : (
            <div
              onClick={() => setToggle(!toggle)}
              onBlur={() => setToggle(false)}
              tabIndex={0}
              className={`h-full cursor-pointer font-semibold flex items-center space-x-2 relative ${
                activeNumber === 3 && "text-primaryColor"
              }`}
            >
              <p>アカウント</p>
              <img
                src={KeyGreen}
                alt="key green"
                className={`w-[25px] transition-all duration-300 ${
                  toggle ? "-rotate-90" : "rotate-90"
                }`}
              />

              <div
                className={`absolute -bottom-28 -left-4 border-2 border-opacity-20 bg-white rounded-md overflow-hidden transition-all duration-500 ${
                  toggle ? "opacity-100 z-50" : "opacity-0"
                }`}
              >
                <div
                  onClick={() => navigate(Routes.USER.ACCOUNT)}
                  className="cursor-pointer uppercase px-8 py-2 border-b-2 border-opacity-30 duration-100 transition-all hover:bg-green-50"
                >
                  <p className="whitespace-nowrap">{loginUser.user_name}</p>
                </div>
                <div
                  onClick={() => {
                    navigate(Routes.USER.TOP_PAGE);
                    changeLoginUserAction && changeLoginUserAction(undefined);
                  }}
                  className="uppercase px-8 py-2 duration-100 transition-all hover:bg-green-50"
                >
                  <p>Logout</p>
                </div>
              </div>
            </div>
          )}
          <div
            onClick={() => navigate(Routes.USER.CART)}
            className={`cursor-pointer font-semibold flex items-center space-x-2 ${
              activeNumber === 4 && "text-primaryColor"
            }`}
          >
            <p>カート</p>
            {badge && (
              <div className="w-[20px] h-[20px] text-xs rounded-full bg-red-600 flex justify-center items-center text-white">
                {badge}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>{children}</div>
      <div className="bg-primaryColor w-full px-28 py-12 flex justify-between items-center relative overflow-hidden">
        <div className="flex flex-col space-y-12">
          <div className="flex space-x-4">
            <img src={logo} alt="Euphoria's Logo" className="w-[80px]" />
            <div className="flex flex-col justify-center space-y-2 text-white">
              <p className="font-bold  text-xl">ユーフォリアプラスショップ</p>
              <p className="text-xs tracking-widest">online shop</p>
            </div>
          </div>

          <div className="text-white text-sm space-y-2">
            <div className="flex">
              <p className="w-16">運用会社</p>：株式会社ユーフォリアプラス
            </div>
            <div className="flex">
              <p className="w-16">TEL</p>：03-6661-9531
            </div>
          </div>
        </div>

        <div className="text-white text-xs absolute bottom-12 right-28">
          <p>Copyright © Euphoria Plus Co.,Ltd. All Rights Reserved.</p>
        </div>

        <div className="absolute -bottom-[400px] -right-[30px] w-[600px] h-[1000px] bg-black bg-opacity-20 -skew-x-12 rotate-12"></div>
      </div>
    </div>
  );
};

export default UserLayout;
