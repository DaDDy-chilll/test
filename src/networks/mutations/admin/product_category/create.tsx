import ApiService from "@/networks/services";
import { ProductCategory } from "@/types/product_category/product_category";

export type ProductCategoryCreateRes = {
  status: string;
  message: string;
  code: number;
  data: ProductCategory;
};
export type ProductCategoryCreateReq = {
  name: string;
};

export type ProductCategoryCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: ProductCategoryCreateErr;
};

type ProductCategoryCreateErr = {
  product_category_name?: string;
};

const create = ({
  name,
}: ProductCategoryCreateReq): Promise<ProductCategoryCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post("/category", { product_category_name: name })
      .then((ans) => { 
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

// const update = (categoryId: number, name: string): Promise<ProductCategoryCreateRes> => {
//     const body = {
//         category_id: categoryId,
//         product_category_name: name
//     }
//     return new Promise((resolve, reject) => {
//         ApiService.admin.post("/category", body)
//             .then(ans => {
//                 resolve(ans.data);
//             })
//             .catch(err => {
//                 reject(err.response.data);
//             })
//     })
// }

export default create;
