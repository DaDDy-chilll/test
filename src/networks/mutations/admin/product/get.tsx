import ApiService from "@/networks/services";
import { Product } from "@/types/product/product";

type GetProductRes = {
  status: string;
  message: string;
  code: number;
  data?: Array<Product>;
  errors?: string;
};

const get = ({
  category = "",
  subCategory = "",
  publicStatus = 2,
  search = "",
}: {
  category: string;
  subCategory: string;
  publicStatus: number;
  search: string;
}): Promise<GetProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(
        `/product?category=${category}&sub_category=${subCategory}&public=${publicStatus}&search=${search}`
      )
      .then((ans) => {
        //console.log(ans.data);
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

type GetRegularPurchaseProductRes = {
  status: string;
  message: string;
  code: number;
  data: Array<Product>;
};

export const getRegularPurchase = (): Promise<GetRegularPurchaseProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get("/product/subscribe")
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
