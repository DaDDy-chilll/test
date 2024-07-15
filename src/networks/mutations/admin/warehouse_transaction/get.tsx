import ApiService from "@/networks/services";
export type getWarehouseTransactionHistoryFilterType = {
    kanrisya_name?:string;
    transaction_type?:number;
    warehouse_detail_id?:number;
    date?:string;
    search?:string;
}

export type WarehouseHistoryRes = {
    status: string;
    message: string;
    code: number;
    data: Array<WarehouseHistory>
}

export type WarehouseHistory = {
    warehouse_detail_id: number;
    warehouse_transaction_id: number;
    transaction_type: number;
    transaction_status: number;
    product_qty: number;
    created_at: string;
    kanrisya_name: string;
    order_id: number;
    order_code: string;
    schedule_delivery_date: string;
    user_name: string;
    user_code: string;
}

const get = (params?:getWarehouseTransactionHistoryFilterType):Promise<WarehouseHistoryRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.get("/warehouse/transaction/history",{params})
        .then((ans)=>{
            resolve(ans.data);
        })
        .catch((err)=>{
            reject(err.response.data);
        })
    })
}
export default get;


