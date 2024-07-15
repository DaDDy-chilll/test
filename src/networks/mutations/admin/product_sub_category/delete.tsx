import ApiService from "@/networks/services";
import { ProductSubCategory } from "@/types/product_sub_category/product_sub_category";

// type ProductSubCategoryDeleteReq = {
//   product_sub_category_id: number;
// };

type ProductSubCategoryDeleteRes = {
  status: string;
  message: string;
  code: number;
  data: ProductSubCategory;
};

export type ProductSubCategoryDeleteErrRes = {
  status: string;
  message: string;
  code: number;
  data: ProductSubCategoryIdErr;
};
type ProductSubCategoryIdErr = {
  product_sub_catgegory_id?: number;
};

const deleteMaster = (product_sub_category_id: number): Promise<ProductSubCategoryDeleteRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete(`/sub-category/${product_sub_category_id}`)
      .then((ans) => {
        console.log(ans.data);
        resolve(ans.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        reject(err.response.data);
      });
  });
};

export default deleteMaster;
