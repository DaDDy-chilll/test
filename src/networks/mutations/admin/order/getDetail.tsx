import ApiService from "@/networks/services";
import { OrderForCustomerRes } from "@/types/order/order";

type GetOrderRes = {
    status: string;
    message: string;
    code: number;
    data: Array<OrderForCustomerRes>;
}

type GetOrderReq = {
    order_id: number;
}

const getDetail = ({order_id}: GetOrderReq): Promise<GetOrderRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get(`/order/${order_id}`)
        .then(ans=>{
            console.log("Success...")
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            console.log("Fail...")
            reject(err);
        })
    })
}

export default getDetail;