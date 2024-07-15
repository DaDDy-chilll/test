import ApiService from "@/networks/services";
import { ProductPhoto } from "@/types/product/product_photo";
import { getProductPhotoListById } from "./get";
import create from "./create";
import { updateProductPhoto } from "./update";
import { deleteProductPhoto } from "./delete";

export type ProductPhotoResponse = {
  status: string;
  message: string;
  code: number;
  data: Array<ProductPhoto>;
};

const productPhoto = {
  index: (productId: number): Promise<ProductPhotoResponse> => {
    const params = { name: "AarKar" };
    return new Promise((resolve, reject) => {
      ApiService.admin
        .get(`/product/photo/${productId}?name=Aarkar&age=28`, { params })
        .then((ans) => {
          //console.log(ans.data);
          resolve(ans.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
  getProductPhotoListById,
  create,
  updateProductPhoto,
  deleteProductPhoto,
};

export default productPhoto;
