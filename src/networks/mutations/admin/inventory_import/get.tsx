import ApiService from "@/networks/services";
import { ProductImportInfo } from "@/types/inventory/product_import_info";

export type InventoryImportResponse = {
  status: string;
  message: string;
  code: number;
  data: Array<ProductImportInfo>;
};

export type InventoryImportResponseErrRes = {
  status: string;
  message: string;
  code: number;
  data: any;
};

const getProductImportInfo = (
  warehouseDetailId: string
): Promise<InventoryImportResponse> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get("warehouse/transaction/import/" + warehouseDetailId)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        reject(err.response.data);
      });
  });
};

export default getProductImportInfo;
