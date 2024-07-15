import ApiService from "@/networks/services";

type OrderCreateRes = {
  status: string;
  message: string;
  code: number;
  data?: OrderForCustomerRes;
  error?: OrderForCustomerRes;
};

export type OrderCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: OrderForCustomerRes;
};

type CartDetail = {
    cartDetailId: number;
    cartId: number;
    productId: number;
    isSubsribe: number;
    subscribeKikan: number;
    productQty: number;
    subscribeQty: number;
}

type OrderForCustomerRes = {
  userId: number;
  order_code: string;
  card_detail: Array<CartDetail>;
  address_id: number;
  schedule_delivery_date: string;
  schedule_delivery_time_id: number;
};

type bodyType = {
  address_id: number;
  schedule_delivery_date: string;
  schedule_delivery_time_id: number;
};

const create = (body: bodyType): Promise<OrderCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .post("/order", body)
      .then((ans) => {
        resolve(ans.data)
      })
      .catch((err) => {
       reject(err.response.data);
      });
  });
};

export default create;
