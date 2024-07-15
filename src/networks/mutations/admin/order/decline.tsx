import ApiService from "@/networks/services";
import { OrderDeclineReq } from "@/types/order/order-decline/order_decline";

type DeclineOrderRes = {
  status: string;
  message: string;
  code: number;
  data: OrderDeclineReq;
};

type DeclineOrderProps = {
  order_decline_id: number;
  orderPayload: {
    status: string;
    reject_reason: string;
  };
};

export type DeclineOrderErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    status: string;
    reject_reason: string;
  };
};

export const declineOrder = ({
  order_decline_id,
  orderPayload,
}: DeclineOrderProps): Promise<DeclineOrderRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`order/decline/${order_decline_id}`, orderPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
