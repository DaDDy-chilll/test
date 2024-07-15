import ApiService from "@/networks/services";
import { ProductPhoto } from "@/types/product/product_photo";

type productPhotoCreateRes = {
  status: string;
  message: string;
  code: number;
  data: ProductPhoto;
};

export type productPhotoCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: productPhotoCreateErr;
};

type productPhotoCreateErr = {
  main_photo: number;
  img_url: string;
  product_id: number;
};

export type ProductPhotoProps = {
  productPhotoPayload: {
    main_photo: number;
    img_url: string;
    product_id: number;
  };
};
const create = ({
  productPhotoPayload,
}: ProductPhotoProps): Promise<productPhotoCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post("/product/photo", productPhotoPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default create;
