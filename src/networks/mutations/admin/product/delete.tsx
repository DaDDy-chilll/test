import ApiService from "@/networks/services";

type DeleteProductRes = {
  status: string;
  message: string;
  code: number;
};

type DeleteProductProps = {
  product_id: number;
};

export type DeleteProductErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    product_id: string;
  };
};

export const deleteProductById = ({
  product_id,
}: DeleteProductProps): Promise<DeleteProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete(`/product/${product_id}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
