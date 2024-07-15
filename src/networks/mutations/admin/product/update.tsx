import ApiService from "@/networks/services";
import { Product } from "@/types/product/product";
import { ProductPhotoTempProps } from "./create";

export type UpdateProductRes = {
  status: string;
  message: string;
  code: number;
  data: Product;
};

export type UpdateProductMode1Props = {
  product_id: number;
  productPayload: {
    product_subcategory_id:number;
    product_name: string;
    bikou: string;
    product_code: string;
    title: string;
    status: number;
    product_name_kana: string;
    mode: number;
  };
};

// export type UpdateProductMode2Props = {
//     product_id: number;
//     productPayload: {
//     buy_price:number;
//     price: number;
//     tax: number;
//     sell_tax: number;
//     min_sell_amt: number;
//     max_sell_amt: number;
//     discount: number;
//     subscribe: number;
//     subscribe_discount: number;
//     mode: number;
//   };
// };

export type UpdateProductMode3Props = {
  product_id: number;
  productPayload: {
    user_search_tag: string;
    product_search_tag: string;
    mode: number;
  };
};

export type UpdateProductMode4Props = {
  product_id: number;
  productPayload: {
    mode: number;
    description: string;
  };
};

export type UpdateProductMode5Props = {
  product_id: number;
  productPayload: {
    mode: number;
    product_photos: Array<ProductPhotoTempProps>;
  };
};

export type UpdateProductMode1ErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    product_name: string;
    bikou?: string;
    product_code?: string;
    title?: string;
    status?: string;
    product_name_kana?: string;
    mode?: string;
  };
};

export type UpdateProductMode2ErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    price: number;
    tax: number;
    min_sell_amt: number;
    max_sell_amt: number;
    discount: number;
    subscribe: number;
    subscribe_discount: number;
    mode: number;
  };
};

export type UpdateProductMode3ErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    user_search_tag?: string;
    product_search_tag?: string;
    description?: string;
    mode?: number;
  };
};

export type UpdateProductMode4ErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    description?: string;
    mode?: number;
  };
};

export type UpdateProductMode5ErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    mode?: number;
    product_photos?: Array<ProductPhotoTempProps>;
  };
};



export const updateProductMode1 = ({
  product_id,
  productPayload,
}: UpdateProductMode1Props): Promise<UpdateProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`product/${product_id}`, productPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export type updateProductMode2Props = {
  product_id: number;
  price?: number;
  tax?: number;
  buy_price?: number;
  buy_tax?: number;
  min_sell_amt?: number;
  max_sell_amt?: number;
  subscribe_factor?: number;
  discount?: number;
  mode?: number;
}

export const updateProductMode2 = (props: updateProductMode2Props): Promise<UpdateProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`product/${props.product_id}`, props)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export const updateProductMode3 = ({
  product_id,
  productPayload,
}: UpdateProductMode3Props): Promise<UpdateProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`product/${product_id}`, productPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export const updateProductMode4 = ({
  product_id,
  productPayload,
}: UpdateProductMode4Props): Promise<UpdateProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`product/${product_id}`, productPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export const updateProductMode5 = ({
  product_id,
  productPayload,
}: UpdateProductMode5Props): Promise<UpdateProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`product/${product_id}`, productPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
