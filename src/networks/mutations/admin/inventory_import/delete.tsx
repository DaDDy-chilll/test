import ApiService from "@/networks/services";

export type deleteInventoryImportRes = {
  status: string;
  message: string;
  code: number;
  data: any;
};
const deleteInventoryImport = (
  warehouseTransactionId: string
): Promise<deleteInventoryImportRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete("/warehouse/transaction/import/" + warehouseTransactionId)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default deleteInventoryImport;
