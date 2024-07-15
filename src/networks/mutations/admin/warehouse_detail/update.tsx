import ApiService from "@/networks/services";
import { WarehouseDetailRes } from "./create";

export type WarehouseDetailUpdateReq = {
    inventory : number;
}
export type WarehouseDetailUpdateErrRes = {
    status: string;
    message: string;
    code: number;
    errors?: WarehouseDetailUpdateErr;
}

 type WarehouseDetailUpdateErr = {
    inventory?: number;
}
// function updateWarehouseDetail(warehouse_detail_id, updatedData) {
//     return new Promise((resolve, reject) => {
//         ApiService.admin.put(`/warehouse/detail/${warehouse_detail_id}`, updatedData)
//             .then((ans) => {
//                 resolve(ans.data);
//             })
//             .catch((err) => {
//                 reject(err.response.data);
//             });
//     });
// }
const update = ( warehouse_detail_id:number,updatedData:WarehouseDetailUpdateReq):Promise<WarehouseDetailRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.put(`/warehouse/detail/${warehouse_detail_id}`,updatedData)
        .then((ans)=>{
            console.log("success");
            resolve(ans.data);
        })
        .catch((err)=>{
            console.log("err")
            reject(err.response.data);

        })
    })
}
export default update;