import ApiService from "@/networks/services";
import { ProductSubCategory } from "@/types/product_sub_category/product_sub_category";

type ProductSubCategoryCreateReq = {
  name: string;
  product_category_id: number;
};
type ProductSubCategoryCreateRes = {
  status: string;
  message: string;
  code: number;
  data: ProductSubCategory;
};
export type ProductSubCategoryCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: ProductSubCategoryCreateErr;
};

type ProductSubCategoryCreateErr = {
  name?: string;
};
const create = ({
  name,
  product_category_id,
}: ProductSubCategoryCreateReq): Promise<ProductSubCategoryCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post(`/sub-category`, { name, product_category_id })
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
export default create;
