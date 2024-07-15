import ApiService from "@/networks/services";
import { Product } from "@/types/product/product";

type productCreateRes = {
  status: string;
  message: string;
  code: number;
  data?: Product;
  errors?: productCreateErr;
};

export type productCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: productCreateErr;
};

export type ProductPhotoTempProps = {
  product_photo_id?: number;
  main_photo: number;
  img_url: string;
};

type productCreateErr = {
  product_code: string;
  product_subcategory_id: number;
  product_name: string;
  product_name_kana: string;
  title: string;
  bikou: string; // ***
  description: string;
  user_search_tag: number;
  product_search_tag: string;
  status: number;
  discount: number;
  subscribe: number;
  subscribe_discount: number;
  safe_stock_amt: number; // ***
  price: number;
  tax: number;
  expense: number; // ***
  min_sell_amt: number;
  max_sell_amt: number;
  buy_tax: number;
  buy_price: number;
  product_photos: Array<ProductPhotoTempProps>;
};

export type ProductCreateProps = {
  productPayload: {
    product_code: string;
    product_subcategory_id: number;
    product_name: string;
    product_name_kana: string;
    title: string;
    bikou: string;
    description: string;
    user_search_tag: string;
    product_search_tag: string;
    status: number;
    discount: number;
    subscribe: number;
    subscribe_discount: number;
    safe_stock_amt: number | string;
    price: number;
    tax: number;
    expense: number | string;
    min_sell_amt: number;
    max_sell_amt: number;
    buy_tax: number;
    buy_price: number;
    product_photos: Array<ProductPhotoTempProps>;
    subscribe_factor:number;
  };
};

const create = ({
  productPayload,
}: ProductCreateProps): Promise<productCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post("/product", productPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default create;
