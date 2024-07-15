import ApiService from "@/networks/services";
import { OrderDeclineReq } from "@/types/order/order-decline/order_decline";


type OrderDeclineCreateRes = {
    status: string;
    message: string;
    code: number;
    data: OrderDeclineReq;
}

export type OrderDeclineErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: OrderDeclineCreateErr;
}

type OrderDeclineCreateErr = {
    orderId: number;
    reasonId: number;
    reasonDetail: string;
    rejectReason: string;
}


const createOrderDeclineReturn = (order_id:number,productReturn:OrderDeclineReq):Promise<OrderDeclineCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.user.post(`/order/return/${order_id}`,productReturn)
        .then(ans=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default createOrderDeclineReturn;