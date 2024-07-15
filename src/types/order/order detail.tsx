
export type OrderDetail = {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    warehouse_transaction_id: number;
    subscribe_factor: number;
    product_qty: number;
    tax: number;
    price: number;
    created_at: string;
    updated_at: string;
}