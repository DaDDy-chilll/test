import ApiService from "@/networks/services";
import { WarehouseDetailRes } from "./create";

export type WarehouseDetailDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    errors?: WarehouseDetailDeleteErr;
}

 type WarehouseDetailDeleteErr = {
    product_id?: number;
}
export type WarehouseDetailDeleteReq = {
    warehouse_detail_id : number;
}


const deleteWarehouseDetail= ({warehouse_detail_id}:WarehouseDetailDeleteReq):Promise<WarehouseDetailRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.delete(`/warehouse/detail/${warehouse_detail_id}`)
        .then((ans)=>{
            resolve(ans.data);
        })
        .catch((err)=>{
           reject(err.response.data);
        })
    })
    }


export default deleteWarehouseDetail;