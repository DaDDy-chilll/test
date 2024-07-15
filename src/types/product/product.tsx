// export type Product = {
//   product_id: number;
//   product_code: string;
//   product_name: string;
//   product_name_kana: string;
//   title: number;
//   price: number;
//   tax: number;
//   status: number;
//   subscribe_status: number;
//   product_photos: Array<ProductPhoto>;
//   product_category_name: string;
//   product_subcategory_name: string;
//   expense: number;
//   buy_price: number;
//   buy_tax: number;
//   bikou: string;
//   description: string;
//   discount: number;
//   max_sell_amt: number;
//   min_sell_amt: number;
//   safe_stock_amt: number;
// };

export type Product = {
  product_id: number;
  product_name: string;
  product_name_kana: string;
  title: string;
  product_code: string;
  product_subcategory_id: number;
  status: number;
  bikou: string;
  price: number;
  tax: number;
  min_sell_amt: number;
  max_sell_amt: number;
  buy_price: number;
  buy_tax: number;
  subscribe_factor: number;
  discount: number;
  product_category_name: string;
  product_subcategory_name: string;
  description: string;
  user_search_tag: string;
  product_search_tag: string;
  safe_stock_amt: number;
  main_photo: number;
  image_url: null,
  product_photos: Array<ProductPhoto>,
  expense: number;
  mode: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  subscribe_discount: string;
  subscribe_status: number;
}

type ProductPhoto = {
  product_photo_id: number;
  product_id: number;
  main_photo: number;
  img_url: string;
  created_at: string;
  updated_at: string;
};
