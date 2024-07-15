import ApiService from "@/networks/services";
import { WarehouseTransactionInfo } from "@/types/inventory/product_import_info";

type inventoryCreateRes = {
  status: string;
  message: string;
  code: number;
  data: WarehouseTransactionInfo;
};

type inventoryCreateErr = {
  warehouse_detail_id?: number | string;
  product_qty: number | string;
};

export type inventoryCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: inventoryCreateErr;
};

export type inventoryCreateProps = {
  invPayload: {
    warehouse_detail_id?: number | string;
    product_qty: number | string;
  };
};

const createInventoryImportInfo = ({
  invPayload,
}: inventoryCreateProps): Promise<inventoryCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post("/warehouse/transaction/import", invPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default createInventoryImportInfo;
