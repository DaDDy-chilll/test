import ApiService from "@/networks/services";

type DeleteProductPhotoRes = {
  status: string;
  message: string;
  code: number;
};

type DeleteProductPhotoProps = {
  product_photo_id: number;
};

export type DeleteProductPhotoErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    product_photo_id: string;
  };
};

export const deleteProductPhoto = ({
  product_photo_id,
}: DeleteProductPhotoProps): Promise<DeleteProductPhotoRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete(`product/photo/${product_photo_id}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
