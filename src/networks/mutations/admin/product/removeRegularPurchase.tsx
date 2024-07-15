import ApiService from "@/networks/services";

type removeRegularPurchaseRes = {
  status: string;
  message: string;
  code: number;
};

type removeRegularPurchaseProps = {
  product_id: number;
};

export type removeRegularPurchaseErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    product_id: string;
  };
};

export const removeRegularPurchase = ({
  product_id,
}: removeRegularPurchaseProps): Promise<removeRegularPurchaseRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`/product/subscribe/${product_id}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
