export type InventoryExportCreateRequest = {
    warehouse_detail_id: number;
    transaction_type: number,
    transaction_status: number,
    product_qty: number,
    shoninsha_id: number
}