export type Cart = {
  index?: number;
  cart_detail_id: number;
  cart_id: number;
  product_id: number;
  is_subscribe: number;
  subscribe_kikan: number;
  product_qty: number;
  subscribe_qty: number;
  created_at?: string;
  updated_at?: string;
  product_details: ProductDetails;
};
 
type ProductDetails = {
  product_id: number;
  product_code: string;
  product_name: string;
  product_name_kana: string;
  title: string;
  price: number;
  tax: number;
  discount: number;
  buy_price: number;
  buy_tax: number;
  bikou: string;
  description: string;
  status: number;
  min_sell_amt: number;
  max_sell_amt: number;
  safe_stock_amt: number;
  product_category_name: string;
  product_subcategory_name: string;
  expense: number;
  subscribe_status: number;
  product_photos: Array<ProductPhoto>;
};

type ProductPhoto = {
  product_photo_id: number;
  product_id: number;
  main_photo: number;
  img_url: string;
  created_at: string;
  updated_at: string;
};
