import ApiService from "@/networks/services";
import { InventoryExport } from "@/types/inventory_export/inventory_export";

type GetInventoryExportRes = {
    status: string;
    message: string;
    code: number;
    data: Array<InventoryExport>;
}

export type getExpotFilterType = {
    warehouse_detail_id?:number;
    search?:string;
    date_from?:string;
    schedule_delivery_date?:string;
}

const get =(params?: getExpotFilterType): Promise<GetInventoryExportRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get(`/warehouse/transaction/export`,{params})
        .then(ans=>{
            // console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}

export default get;