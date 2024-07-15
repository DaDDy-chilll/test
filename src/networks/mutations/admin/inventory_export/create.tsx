import ApiService from "@/networks/services";
import { InventoryExportCreateRequest } from "@/types/inventory_export/inventory_export_request";

type InventoryExportCreateRes = {
    status: string;
    message: string;
    code: number;
    data: InventoryExportCreateRequest
}

export type InventoryExportCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: InventoryExportCreateErr;
}

type InventoryExportCreateErr = {
    warehouse_detail_id?: number;
    transaction_type?: number,
    transaction_status?: number,
    product_qty?: number,
    shoninsha_id?: number
}

type InventoryExportCreateReq = {
    warehouse_detail_id: number;
    transaction_type: number,
    transaction_status: number,
    product_qty: number,
    shoninsha_id: number
}

const create = (createRequest:InventoryExportCreateReq):Promise<InventoryExportCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post("/warehouse/transaction/export",createRequest)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;