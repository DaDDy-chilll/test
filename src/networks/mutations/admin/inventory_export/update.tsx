import ApiService from "@/networks/services";
import { InventoryExport } from "@/types/inventory_export/inventory_export";

type InventoryExportUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: InventoryExport
}

export type InventoryExportUpdateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: TransactionStatusUpdateErr;
}

type TransactionStatusUpdateErr = {
    product_qty?: string;
}

type InventoryExportUpdateIDReq = {
    warehouse_transaction_id:Array<number>;
}

const update = ({ warehouse_transaction_id }:InventoryExportUpdateIDReq):Promise<InventoryExportUpdateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.put(`/warehouse/transaction/export`,warehouse_transaction_id)
        .then(ans=>{
           resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default update;