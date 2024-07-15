import ApiService from "@/networks/services";
import { ShippingInfoList } from "@/types/inventory_export/shipping_info_list";

type GetShippingInfoBySearchRes = {
    status: string;
    message: string;
    code: number;
    data: Array<ShippingInfoList>;
}

type GetShippingInfoBySearchReq = {
    warehouse_detail_id: number;
    search: string;
    order_date: string;
    schedule_pickedup_date: string;
}

const searchShipping = (params: GetShippingInfoBySearchReq): Promise<GetShippingInfoBySearchRes>=> {
    return new Promise((resolve,reject)=>{
        console.log(params);
        ApiService.admin.get("/warehouse/transaction/export",{params})
        .then(ans=>{
            // console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}


export default searchShipping;