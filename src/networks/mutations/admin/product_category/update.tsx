import ApiService from "@/networks/services";
import { ProductCategory } from "@/types/product_category/product_category";

export type ProductCategoryUpdateRes = {
  status: string;
  message: string;
  code: number;
  data: ProductCategory;
};
export type ProductCategoryUpdateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: ProductCategoryUpdateErr;
};

type ProductCategoryUpdateErr = {
  product_category_name?: string;
};
type ProductCategoryUpdateReq = {
  product_category_name: string;
  id: number;
};

const update = ({
  product_category_name,
  id,
}: ProductCategoryUpdateReq): Promise<ProductCategoryUpdateRes> => {
  return new Promise((resolve, reject) => {
    // ApiService.admin.put(`/category/${id}`, {  product_category_name: product_category_name })
    ApiService.admin
      .put(`/category/${id}`, { product_category_name })
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default update;
