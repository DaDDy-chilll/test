export type Order = {
    order_id: number;
    order_code: string;
    user_id: number;
    address_id: number;
    order_status: number;
    delivery_charges: number;
    schedule_pickup_date: string;
    schedule_pickup_time_id: number;
    schedule_delivery_date: string;
    schedule_delivery_time_id: number;
    created_at: string;
    updated_at: string;
}

export type OrderForCustomerRes = { 
    customer ?: Customer;
    address ?: Address;
    order_id : number;
    order_code : number;
    order_status : number;
    delivery_charges : number;
    schedule_pickup_date: string;
    schedule_pickup_time_id : number;
    schedule_delivery_date : string;
    schedule_delivery_time_id : number
    created_at : string; 
    updated_at : string;
    order_detail : Array<OrderDetailForCustomerRes>;
}

type Customer ={
    user_id: number;
    user_code: string;
    mail: string;
    user_name: string;
    user_name_kana: string;
    date_of_birth: string;
    phone: string;
    status: number;
    role: string;
    point: number;
    created_at: string;
    updated_at: string;
}

type Address ={
    name: string;
    status: number;
    address_id: number;
    user_id: number;
    prefecture_id: number;
    city_ward_town_id: number;
    main_address: number;
    address_name: string;
    post_code: string;
    created_at: string;
    updated_at: string;
}

export type OrderDetailForCustomerRes ={ 
    order_detail_id: number;            
    order_id: number;
    product_id: number;
    products?: Product;
    warehouse_transaction_id: number;
    subscribe_factor: number;
    product_qty: number;
    tax: number;
    price: number;
    discount: number;
    created_at: string;
    updated_at: string;
}

export type Product = {
    product_id: number;
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
    subscribe_factor: number;
    safe_stock_amt: number;
    price: number;
    tax: number;
    min_sell_amt: number;
    max_sell_amt: number;
    buy_price: string;
    buy_tax: string;
    main_photo: number;
    image_url: string;
    product_photos : Array<ProductPhoto>;
}

type ProductPhoto ={
    product_photo_id: number;
    product_id: number;
    main_photo: number;
    img_url: string;
    created_at : string;
    updated_at : string;
}
