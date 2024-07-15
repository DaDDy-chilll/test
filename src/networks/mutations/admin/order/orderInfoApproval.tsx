import ApiService from "@/networks/services";
import { Order } from "@/types/order/order";

type OrderUpdateRes = {
  status: string;
  message: string;
  code: number;
  data: Order;
};

export type OrderUpdateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: OrderUpdateErr;
};

type OrderUpdateErr = {
  order_id: number;
};

type OrderUpdateReq = {
  order_status: number;
};

const orderInfoApproval = (  order_id: number, {order_status}: OrderUpdateReq): Promise<OrderUpdateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`/order/accept/${order_id}`, { order_status })
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default orderInfoApproval;
