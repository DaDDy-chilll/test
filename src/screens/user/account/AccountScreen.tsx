import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import GivePng from "@/assets/icons/user/give.png";
import SecurityShieldPng from "@/assets/icons/user/security_shield.png";
import DeliveryPng from "@/assets/icons/user/delivery.png";
import CallPng from "@/assets/icons/user/callmale.png";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import UserLayout from "../UserLayout";

const AccountScreen = ({loginUser, changeLoginUserAction}: GlobalProps) => {
  const navigate = useNavigate();
  const menus = [
    {
      title: "ご注文リスト",
      subTitle: "配達、返品 or 再購入",
      image: GivePng,
      action: () => navigate(Routes.USER.ORDER),
    },
    {
      title: "ログイン & セキュリティ",
      subTitle: "メール、氏名、携帯番号など編集",
      image: SecurityShieldPng,
      action: () => navigate(Routes.USER.SECURITY),
    },
    {
      title: "配達先",
      subTitle: "配達先の住所を編集",
      image: DeliveryPng,
      action: () => navigate(Routes.USER.DESTINATION),
    },
    {
      title: "問い合わせ",
      subTitle: "メールや電話で問い合わせ",
      image: CallPng,
      action: () => {},
    },
  ];
  return (
    <UserLayout activeNumber={3} loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      {/* Temp */}
      <div className="container mx-auto py-20">
        <p className="text-center text-xl font-bold text-primaryColor tracking-widest">Your Account</p>
        <SizeBox h={60} />

        <div className="grid grid-cols-3 gap-6">
          {menus.map(({ title, subTitle, image, action }) => (
            <div
              onClick={action}
              className="px-8 py-4 rounded-md flex justify-between items-center bg-primaryColor space-x-4 cursor-pointer"
            >
              <div className="w-1/3 flex justify-center items-center">
                <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center bg-white">
                  <img src={image} alt="image" width={30} height={30} />
                </div>
              </div>
              <div className="w-2/3 space-y-2 text-white">
                <p className="text-sm">{title}</p>
                <p className="text-xs">{subTitle}</p>
              </div>
            </div>
          ))}
        </div>
        <SizeBox h={100} />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default AccountScreen;
