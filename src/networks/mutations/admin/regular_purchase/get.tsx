import ApiService from "@/networks/services";
import { RegularPurchase } from "@/types/regularpurchase/regularPurchase";

type regularPurchaseGetRes = {
    status: string,
    message: string,
    code: number,
    data?: Array<RegularPurchase>,
    error?: string
}

type params = {
  user: string;
  product: string;
};

const get = (params: params): Promise<regularPurchaseGetRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(`/product/subscribe`, {params})
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default get;
