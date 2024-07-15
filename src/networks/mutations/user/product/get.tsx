import ApiService from "@/networks/services";
import { Product } from "@/types/product/product";

type GetProductRes = {
  status: string;
  message: string;
  code: number;
  data?: Array<Product>;
  errors?: string;
};

const get = (): Promise<GetProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .get(`/product`)
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
