export type ProductSubCategory = {
  product_sub_category_id: number;
  product_category_id: number;
  product_sub_category: Array<productSubCategory>;
  name: string;
  product_category_name: string;
  created_at: string;
  updated_at: string;
};
type productSubCategory = {
  product_sub_category_id: number;
  product_category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
