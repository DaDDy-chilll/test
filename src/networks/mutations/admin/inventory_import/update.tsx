import ApiService from "@/networks/services";
import { WarehouseTransactionInfo } from "@/types/inventory/product_import_info";

type inventoryUpdateRes = {
  status: string;
  message: string;
  code: number;
  data: WarehouseTransactionInfo;
};

type inventoryUpdateErr = {
  warehouse_detail_id?: number | string;
  transaction_type: number;
  transaction_status: number;
  product_qty?: number | string;
};

export type inventoryUpdateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: inventoryUpdateErr;
};

export type inventoryUpdateProps = {
  warehouse_transaction_id?: number | string;
  invPayload: {
    transaction_status: number;
  };
};

const updateInventoryImportInfo = ({
  warehouse_transaction_id,
  invPayload,
}: inventoryUpdateProps): Promise<inventoryUpdateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(
        `warehouse/transaction/import/${warehouse_transaction_id}`,
        invPayload
      )
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
export default updateInventoryImportInfo;
