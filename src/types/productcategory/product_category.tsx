export type ProductCategory = { 
    product_category_id:number;
    product_category_name:string;
    product_sub_category: Array<ProductSubCategory>;
    created_at: string;
    updated_at: string;
}


type ProductSubCategory ={
    product_sub_category_id:number;
    product_category_id : number;
    name:string;
    created_at : string;
    updated_at : string;
}
