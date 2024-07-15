import ApiService from "@/networks/services";
import { ProductReview } from "@/types/product_review/product_review";

type GetShoninProductReviewRes = {
  status: string;
  message: string;
  code: number;
  data: ProductReview;
}

export type getShoninProductReviewErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: any;
};

const shoninProductReview = (product_review_id: number): Promise<GetShoninProductReviewRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin.put(`/product/review/${product_review_id}`)
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default shoninProductReview;