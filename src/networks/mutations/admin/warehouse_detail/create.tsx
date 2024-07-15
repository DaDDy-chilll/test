import ApiService from "@/networks/services";
export type WarehouseDetailCreateReq = {
   product_id : number;
   inventory: number;
}

export type WarehouseDetailType = {
    warehouse_detail_id : number;
    product_id : number;
    inventory: number;
}
export type WarehouseDetailRes = {
    status: string;
    message: string;
    code: number;
    data: WarehouseDetailType;
}

export type WarehouseDetailCreateErrRes = {
    status: string;
    message: string;
    code: number;
    errors?: WarehouseDetailCreateErr;
}

 type WarehouseDetailCreateErr = {
    product_id?: number;
    inventory?: number;
}

const create = (warehouseDetailData:WarehouseDetailCreateReq):Promise<WarehouseDetailRes>=>{
        return new Promise((resolve,reject)=>{
            ApiService.admin.post("/warehouse/detail",warehouseDetailData)
            .then((ans)=>{
                resolve(ans.data);
            })
            .catch((err)=>{
                reject(err.response.data);
            })
        })

    }


export default create;