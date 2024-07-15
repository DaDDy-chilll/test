import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import Helper from "@/helpers";
import VisaCard from "@/assets/admin/visa.png"
import { OrderForCustomerRes } from "@/types/order/order";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';

const OrderInfoDetailComponent = () => {
  
  const location = useLocation();
  const {orderDetail} : {orderDetail : OrderForCustomerRes } = location.state;

  const totalProductAmount =  orderDetail.order_detail.reduce(
    (accumulator , od) =>
    accumulator +
      Math.round((
          od.price *
          (1 + od.tax / 100) *
          od.product_qty *
          od.subscribe_factor)
      ),
    0
  );

  const totalAmount = parseInt(totalProductAmount.toString()) + parseInt(orderDetail.delivery_charges.toString());

  return (
    <Card className="pb-[20px] bg-white rounded-[5px] border-black border-[1px] border-opacity-20">
      {/* Title */}
      <div className="w-full flex space-x-24 items-center h-[60px] px-[30px] bg-[#E2EDFF] border-black border-b-[1px] border-opacity-20">
        <p className="font-semibold">注文日：{format(new Date(orderDetail.created_at), "yyyy/MM/dd")}</p>
        <p className="font-semibold">注文ID：{orderDetail.order_code}</p>
      </div>
      <SizeBox h={30} />

      <div className="flex justify-between px-[30px]">
          <div className="space-y-6">
          <p className="font-semibold text-sm mb-4">配達先住所</p>
          <p className="font-thin text-sm">{orderDetail.customer?.user_name}</p>
          <p className="font-thin text-sm">{orderDetail.address?.post_code}</p>
          <p className="font-thin text-sm">{orderDetail.address?.name}</p>
          <p className="font-thin text-sm">{orderDetail.address?.address_name}</p>
          <p className="font-thin text-sm">電話：{orderDetail.customer?.phone}</p>
          </div>
          <div className="space-y-6">
            <p className="font-semibold text-sm mb-4">支払い方法</p>
            <div className="flex items-center space-x-2">
              <img src={VisaCard} alt="Visa Card Logo" />
              <p className="font-thin text-sm">***** 2343</p>
            </div>
          </div>
          <div className="space-y-6 w-1/6">
            <p className="font-semibold text-sm mb-4">注文合計</p> 
            <div className="flex justify-between items-center">
              <p className="font-thin text-sm">Items * {orderDetail.order_detail.length}</p>
              <p className="font-thin text-sm">
                {
                  Helper.japaneseNumberFormat({
                    number: Math.round((totalProductAmount))
                })
                }              
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-thin text-sm">配送</p>
              <p className="font-thin text-sm">{orderDetail.delivery_charges}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">合計</p>
              <p className="font-semibold text-sm">
                {
                 Helper.japaneseNumberFormat({
                  number: Math.round((totalAmount))
              })
                }

              </p>
            </div>
          </div>
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default OrderInfoDetailComponent;
