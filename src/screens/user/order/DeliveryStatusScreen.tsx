import { GlobalProps } from "@/App";
import UserLayout from "@/layouts/user/UserLayout";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import OrderScheduleDetailComponent from "@/components/user/order/OrderScheduleDetailComponent";
import { useLocation } from "react-router-dom";
import { OrderForCustomerRes } from "@/types/order/order";

const DeliveryStatusScreen = ({}: GlobalProps) => {

  const location = useLocation();
  const {deliveryDetail} : {deliveryDetail : OrderForCustomerRes } = location.state;
  
  const subNavItems: Array<subNavItemsProp> = [
    {
      Title: HomeIcon,
      route: Routes.USER.TOP_PAGE,
    },
    {
      Title: "マイページ",
      route: Routes.USER.ACCOUNT,
    },
    {
      Title: "ご注文リスト",
      route: Routes.USER.ORDER,
    },
    {
      Title: "配達状況",
      route: null,
    },
  ];
  return (
    <UserLayout>
      {/* Temp */}
      <div className="container mx-auto">
        <SubNavbarComponent text="配達状況" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="flex space-x-8">
          <div className=" w-3/5 pt-4">
            <OrderScheduleDetailComponent
              orderDetail = {deliveryDetail}
             />
          </div>

          <div className="w-2/5 pt-2 space-y-4">
            <div className="bg-white px-8 py-6 rounded-md space-y-4">
              <p className="font-semibold text-xl">Tracking</p>
              <p className="text-sm">配達サービス：ヤマト</p>
              <p className="text-sm">Tracking ID：T0304p43o30033</p>
            </div>

            <div className="bg-white px-8 py-6 rounded-md space-y-4">
              <p className="font-semibold text-xl">配達住所</p>
              <p className="font-semibold">{deliveryDetail.customer?.user_name}</p>
              <p className="text-sm">{deliveryDetail.address?.post_code}</p>
              <p className="text-sm">{deliveryDetail.address?.name}</p>
              <p className="text-sm">{deliveryDetail.address?.address_name}</p>
              <p className="text-sm">電話：{deliveryDetail.customer?.phone}</p>
            </div>

            <div className="bg-white px-8 py-6 rounded-md space-y-4">
              <p className="font-semibold text-xl">注文情報</p>
              <p className="text-sm text-textBlue underline underline-offset-2">詳細はこちら</p>
            </div>
          </div>
        </div>
        <SizeBox h={100} />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default DeliveryStatusScreen;
