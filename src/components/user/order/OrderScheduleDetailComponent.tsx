import SizeBox from "@/components/SizeBox";
import { OrderForCustomerRes } from "@/types/order/order";
import { Checkbox } from "@material-tailwind/react";
import { format } from "date-fns";
import { useState } from "react";


interface OrderScheduleDetailProps {
  orderDetail : OrderForCustomerRes;
}

const OrderScheduleDetailComponent = ({
  orderDetail,
}:OrderScheduleDetailProps) => {

  const [deliverStatus] = useState<number>(orderDetail.order_status);
  return (
    <div className="rounded-[5px]">
      <div className="w-full">
        <p className="font-semibold text-[#08C856]">配達予定 01/15(金) 〜 01/17(日)</p>
      </div>
      <div className="space-y-8 relative">
        <div
          className={`absolute top-4 left-5 bg-[#08C856] w-1 ${
            deliverStatus === 1
              ? "h-0"
              : deliverStatus === 2
              ? "h-2/6"
              : deliverStatus === 3
              ? "h-[150px]"
              : "h-5/6"
          }`}
        ></div>
        {/* <div className="absolute top-0 left-[21px] w-0 h-5/6 border-l-2 border-dashed border-l-black border-opacity-50"></div> */}

        <div className="flex items-center space-x-4">
          <Checkbox
            crossOrigin={1}
            className="bg-white checked:bg-[#08C856] checked:border-[#08C856] rounded-none"
            checked={
              deliverStatus === 1 ||
              deliverStatus === 2 ||
              deliverStatus === 3 ||
              deliverStatus === 4
                ? true
                : false
            }
          />
          <p
            className={`text-sm ${
              deliverStatus === 1 ||
              deliverStatus === 2 ||
              deliverStatus === 3 ||
              deliverStatus === 4
                ? "font-semibold"
                : "font-light"
            }`}
          >
           注文日：{format(new Date(orderDetail.created_at), "yyyy/MM/dd")}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            crossOrigin={1}
            className="bg-white checked:bg-[#08C856] checked:border-[#08C856] rounded-none"
            checked={
              deliverStatus === 2 || deliverStatus === 3 || deliverStatus === 4
                ? true
                : false
            }
          />
          <p
            className={`text-sm ${
              deliverStatus === 2 || deliverStatus === 3 || deliverStatus === 4
                ? "font-semibold"
                : "font-light"
            }`}
          >
           配達準備：{orderDetail.schedule_delivery_date}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            crossOrigin={1}
            className="bg-white checked:bg-[#08C856] checked:border-[#08C856] rounded-none"
            checked={deliverStatus === 3 || deliverStatus === 4 ? true : false}
          />
          <p
            className={`text-sm ${
              deliverStatus === 3 || deliverStatus === 4
                ? "font-semibold"
                : "font-light"
            }`}
          >
            配達
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            crossOrigin={1}
            className="bg-white checked:bg-[#08C856] checked:border-[#08C856] rounded-none"
            checked={deliverStatus === 4 ? true : false}
          />
          <p
            className={`text-sm ${
              deliverStatus === 4 ? "font-semibold" : "font-light"
            }`}
          >
            到着 01/15 (金) 〜 01/17 (日)
          </p>
        </div>
      </div>

      <SizeBox h={20} />
    </div>
  );
};

export default OrderScheduleDetailComponent;
