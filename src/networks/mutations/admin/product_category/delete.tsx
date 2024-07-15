import ApiService from "@/networks/services";
import { ProductCategory } from "@/types/product_category/product_category";

type ProductCategoryDeleteReq = {
  product_category_id: number;
};

type ProductCategoryDeleteRes = {
  status: string;
  message: string;
  code: number;
  data: ProductCategory;
};

export type ProductCategoryDeleteErrRes = {
  status: string;
  message: string;
  code: number;
  data: ProductCategoryIdErr;
};
type ProductCategoryIdErr = {
  product_catgegory_id?: number;
};

const deleteMaster = ({
  product_category_id
}: ProductCategoryDeleteReq): Promise<ProductCategoryDeleteRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete(`/category/${product_category_id}`)
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
