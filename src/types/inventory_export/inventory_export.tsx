
export type InventoryExport = {
    warehouse_transaction_id: number;
    warehouse_detail_id: number,
    order_code: string;
    created_at: string;
    product_qty: number;
    schedule_pickup_date: string;
    schedule_delivery_date: string;
    user_name: string
    user_code: string
}