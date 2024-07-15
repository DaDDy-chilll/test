import ApiService from "@/networks/services";
import { OrderDeliveryForCustomerRes } from "@/types/order/orderdelivery";


type GetOrderRes = {
  status: string;
  message: string;
  code: number;
  data: Array<OrderDeliveryForCustomerRes>;
};

type GetOrderReq = {
  product?: string | undefined;
  customer ?: string | undefined;
  order_date ?: string | undefined;
  addressName ?: string | undefined;
  schedule_delivery_date ?: string | undefined;
  schedule_pickedup_date ?: string | undefined;
}

const getDelivery = (params?: GetOrderReq): Promise<GetOrderRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin.get("/order/delivery",{params})
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getDelivery;
