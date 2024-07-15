import ApiService from "@/networks/services";
import { RegularPurchase } from "@/types/regularpurchase/regularPurchase";

type regularPurchaseGetRes = {
  status: string,
  message: string,
  code: number,
  data?: RegularPurchase,
  error?: string
}

export type removeProductSubscribeParams = {
  product_subscribe_id: number;
};

const removeRegularPurchase = ({product_subscribe_id}: removeProductSubscribeParams): Promise<regularPurchaseGetRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`/product/subscribe/${product_subscribe_id}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default removeRegularPurchase;