import ApiService from "@/networks/services";
import { ProductPhoto } from "@/types/product/product_photo";

type ProductPhotoResponse = {
  status: string;
  message: string;
  code: number;
  data: Array<ProductPhoto>;
};

export type ProductPhotoErrRes = {
  status: string;
  message: string;
  code: number;
  errors?: {
    product_id: string;
  };
};

export const getProductPhotoListById = ({
  productId,
}: {
  productId: number;
}): Promise<ProductPhotoResponse> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(`/product/photo/${productId}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
