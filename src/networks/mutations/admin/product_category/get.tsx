import ApiService from "@/networks/services";
import { product_category } from "@/types/product/product_category";

type GetProductCategoryListRes = {
  status: string;
  message: string;
  code: number;
  data: Array<product_category>;
};

type GetProductCategoryRes = {
  status: string;
  message: string;
  code: number;
  data: product_category;
};

export type getProductCategoryErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    検索商品カテゴリーID: string;
  };
};

export const getProductCategoryLists =
  (): Promise<GetProductCategoryListRes> => {
    return new Promise((resolve, reject) => {
      ApiService.admin
        .get("/sub-category")
        .then((ans) => resolve(ans.data))
        .catch((err) => reject(err.response.data));
    });
  };

export const getProductCategoryById = ({
  categoryId,
}: {
  categoryId: number;
}): Promise<GetProductCategoryRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(`/sub-category/${categoryId}`)
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

// AKM

// type GetProductCategoryRes ={
//     status: string;
//     message: string;
//     code: number;
//     data: Array<ProductCategory>;
// }

const getProductCategory = (name : string): Promise<GetProductCategoryListRes> => {
    const params = {name}
    return new Promise((resolve,reject) => {
        ApiService.admin.get(`/category`,{params, headers : {}})
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data)
        })
    })
}

export default getProductCategory;
