import ApiService from "@/networks/services";
import { ProductSubCategory } from "@/types/product_sub_category/product_sub_category";

export type ProductSubCategoryUpdateRes = {
  status: string;
  message: string;
  code: number;
  data: ProductSubCategory;
};
export type ProductSubCategoryUpdateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: ProductSubCategoryUpdateErr;
};

type ProductSubCategoryUpdateErr = {
  name?: string;
};
type ProductSubCategoryUpdateReq = {
  name: string;
  id: number;
};

const update = ({
  name,
  id,
}: ProductSubCategoryUpdateReq): Promise<ProductSubCategoryUpdateRes> => {
  return new Promise((resolve, reject) => {
    // ApiService.admin.put(`/category/${id}`, {  product_category_name: product_category_name })
    ApiService.admin
      .put(`/sub-category/${id}`, { name })
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default update;
