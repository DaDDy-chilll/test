import ApiService from "@/networks/services";
import { Cart } from "@/types/cart/cart";

type GetCartRes = {
  status: string;
  message: string;
  code: number;
  data?: Array<Cart>;
  errors?: string;
};

const get = (): Promise<GetCartRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .get(`/cart/detail`)
      .then((ans) => {
        //console.log(ans.data);
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default get;
