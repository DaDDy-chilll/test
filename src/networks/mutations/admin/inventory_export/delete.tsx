import ApiService from "@/networks/services";

type InventoryExportDeleteReq = {
    warehouse_transaction_id: number;
}

type InventoryExportDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type InventoryExportDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deleteInventoryExport = ({warehouse_transaction_id}: InventoryExportDeleteReq): Promise<InventoryExportDeleteRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.delete(`/warehouse/transaction/export/${warehouse_transaction_id}`)
        .then((ans)=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch((err)=>{
            console.log(err.response.data)
            reject(err.response.data);
        })
    });
}

export default deleteInventoryExport;