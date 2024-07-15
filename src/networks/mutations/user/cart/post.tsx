import ApiService from "@/networks/services";
import { Cart } from "@/types/cart/cart";

type cartCreateRes = {
  status: string;
  message: string;
  code: number;
  data?: Cart;
  errors?: cartCreateErr;
};

export type productCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: cartCreateErr;
};

type cartCreateErr = {
  cart_detail_id: number;
  cart_id: number;
  product_id: number;
  is_subscribe: number;
  subscribe_kikan: string;
  product_qty: number;
  subscribe_qty: number;
};

export type CartCreateProps = {
  cartPayload: {
    product_id: number;
    is_subscribe: number;
    subscribe_kikan: number | undefined;
    product_qty: number;
    subscribe_qty: number;
  };
};

const post = ({ cartPayload }: CartCreateProps): Promise<cartCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .post("/cart/detail", cartPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default post;
