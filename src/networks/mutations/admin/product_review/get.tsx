import ApiService from "@/networks/services";
import { ProductReview } from "@/types/product_review/product_review";

type params = {
  customer?: string|undefined;
  product?: string|undefined;
  date?: string|undefined;
  title?: string|undefined;
  review?: string|undefined;
  shoninsha_id?: number|undefined;
  rating?: number|undefined;
  approver_name?: string|undefined;
};

type GetProductReviewListRes = {
  status: string;
  message: string;
  code: number;
  data: Array<ProductReview>;
}

export type getProductReviewListErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: any;
};

const get = (params?: params): Promise<GetProductReviewListRes> => {
  return new Promise((resolve, reject) => {
    console.log("params", params);
    ApiService.admin.get("/product/review", {params})
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default get;