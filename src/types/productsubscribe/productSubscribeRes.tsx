export type ProductSubscribe = {
    product_subscribe_id: number;
    product_qty: number;
    subscribe_kikan: number;
    user_id: number;
    product_id: number;
    order_detail_id: number;
    product_code: string;
    product_name: string;
    title: string;
    price: number;
    img_url: string;
    status: number;
    tax: number;
    subscribe_factor:number;
    discount: number;
    created_at: string;
    min_sell_amt: number;
    max_sell_amt: number;
    last_order_created_at: string;
    next_order_create_on: string;
    schedule_delivery_date: string;
}

export type ProductSubscribeUpdateReq ={
    mode ?: number;
    product_qty ?: number;
    subscribe_kikan ?: number;
    schedule_delivery_date ?: string;
}