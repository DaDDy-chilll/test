import ApiService from "@/networks/services";

type CartUpdateRes = {
  status: string;
  message: string;
  code: number;
  data?: CartCreateProps;
  errors?: CartUpdateErr;
};

type CartUpdateErr = {
  cart_detail_id: number;
  cart_id: number;
  product_id: number;
  is_subscribe: number;
  subscribe_kikan: string;
  product_qty: number;
  subscribe_qty: number;
};

type CartCreateProps = {
  product_id: number;
  is_subscribe: number;
  subscribe_kikan: number | undefined;
  product_qty: number;
  subscribe_qty: number;
};

const update = ( cartPayload : Array<CartCreateProps>): Promise<CartUpdateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .post("/cart/details", cartPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default update;
