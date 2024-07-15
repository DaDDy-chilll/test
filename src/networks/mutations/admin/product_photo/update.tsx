import ApiService from "@/networks/services";
import { ProductPhoto } from "@/types/product/product_photo";

type UpdateProductPhotoRes = {
  status: string;
  message: string;
  code: number;
  data: ProductPhoto;
};

type UpdateProductPhotoProps = {
  product_photo_id: number;
  productPhotoPayload: {
    img_url: string;
  };
};

export type UpdateProductPhotoErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    img_url: string;
  };
};

export const updateProductPhoto = ({
  product_photo_id,
  productPhotoPayload,
}: UpdateProductPhotoProps): Promise<UpdateProductPhotoRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`product/photo/${product_photo_id}`, productPhotoPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
