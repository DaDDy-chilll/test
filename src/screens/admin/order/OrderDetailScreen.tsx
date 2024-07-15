import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import OrderMenu from "@/components/admin/order/OrderMenu";
import OrderInfoDetailComponent from "@/components/admin/order/order_detail/OrderInfoDetailComponent";
import OrderItemComponent from "@/components/admin/order/order_detail/OrderItemComponent";
import OrderScheduleDetailComponent from "@/components/admin/order/order_detail/OrderScheduleDetailComponent";
import Routes from "@/navigations/routes";
import { useNavigate } from "react-router-dom";

const OrderDetailScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
 
  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "注文一覧",
      action: () => navigate(Routes.ADMIN.ORDER),
    },
    {
      title: "注文詳細",
      action: () => {},
    },
  ];
  return (
    <div className="">
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />
      <SizeBox h={95} />

      <OrderMenu title="注文詳細" openDialog={() => {}} />

      <SizeBox h={20} />

      <div className="px-[25px]">
        <OrderInfoDetailComponent />
        <SizeBox h={20} />

        <div className="grid grid-cols-2 gap-4">
            <OrderScheduleDetailComponent />
            <OrderItemComponent />
        </div>
      </div>

      <SizeBox h={100} />
    </div>
  );
};

export default OrderDetailScreen;
