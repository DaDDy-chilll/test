import { GlobalProps } from "@/App";
import UserLayout from "@/layouts/user/UserLayout";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import OrderInfoDetailComponent from "@/components/admin/order/order_detail/OrderInfoDetailComponent";
import OrderItemComponent from "@/components/admin/order/order_detail/OrderItemComponent";

const OrderDetailScreen = ({}: GlobalProps) => {
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
      Title: "ご注文詳細",
      route: null,
    },
  ];
  return (
    <UserLayout>
      {/* Temp */}
      <div className="container mx-auto">
        <SubNavbarComponent text="ご注文詳細" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="">
          <OrderInfoDetailComponent />
          <SizeBox h={20} />

          <div className="grid grid-cols-2 gap-4">
            <OrderItemComponent />
          </div>
        </div>

        <SizeBox h={100} />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default OrderDetailScreen;
