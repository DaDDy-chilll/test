import ApiService from "@/networks/services";
import { Product } from "@/types/product/product";

type GetProductByIdRes ={ 
    status: string;
    message: string;
    code: number;
    data: Product;
}

type getDetailProps = {
    productId: number;
}

  export type ProductByIdErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: {
      product_id: string;
    };
  };
  
  export const getProductById = ({
    productId,
  }: getDetailProps): Promise<GetProductByIdRes> => {
    return new Promise((resolve, reject) => {
      ApiService.admin
        .get(`/product/${productId}`)
        .then((ans) => {
          resolve(ans.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };

export default getProductById;