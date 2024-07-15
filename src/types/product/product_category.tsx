export type product_category = {
  product_category_id: number;
  product_category_name: string;
  product_sub_category: sub_category[];
  created_at: string;
  updated_at: string;
};

export type sub_category = {
  product_category_id: number;
  product_sub_category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
