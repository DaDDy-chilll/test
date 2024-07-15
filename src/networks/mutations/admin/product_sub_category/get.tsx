import ApiService from "@/networks/services";
import { ProductSubCategory } from "@/types/product_sub_category/product_sub_category";

type GetProductSubCategoryRes = {
  status: string;
  message: string;
  code: number;
  data: Array<ProductSubCategory>;
};

const get = (): Promise<GetProductSubCategoryRes> => {
  //   const params = { name };
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(`/sub-category`)
      .then((ans) => {
        console.log(ans.data);
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default get;
