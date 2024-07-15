export type ProductImportInfo = {
  title: string;
  description: string;
  inventory: number;
  warehouse_transaction_id?: number | string;
  warehouse_detail_id?: number | string;
  transaction_type: number;
  transaction_status: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_qty: number;
  shoninsha_id?: number | string;
  created_at: string;
  updated_at: string;
};

type warehouse_detail = {
  warehouse_detail_id?: number | string;
  product_id?: number | string;
  inventory?: number | string;
  created_at: string;
  updated_at: string;
};

export type WarehouseTransactionInfo = {
  warehouse_transaction_id?: number | string;
  warehouse_detail: warehouse_detail;
  transaction_type: number;
  transaction_status: number;
  product_qty?: number | string;
  shoninsha_id: number;
  created_at: string;
  updated_at: string;
};
