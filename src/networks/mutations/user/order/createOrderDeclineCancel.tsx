import ApiService from "@/networks/services";
import { OrderDeclineReq } from "@/types/order/order-decline/order_decline";


type OrderDeclineCancelRes = {
    status: string;
    message: string;
    code: number;
    data: OrderDeclineReq;
}

export type OrderDeclineErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: OrderDeclineCancelErr;
}

type OrderDeclineCancelErr = {
    orderId: number;
    reasonId: number;
    reasonDetail: string;
    rejectReason: string;
}


const createOrderDeclineCancel = (order_id:number,productReturn:OrderDeclineReq):Promise<OrderDeclineCancelRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.user.post(`/order/cancel/${order_id}`,productReturn)
        .then(ans=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default createOrderDeclineCancel;