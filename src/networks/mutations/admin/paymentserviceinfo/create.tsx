import ApiService from "@/networks/services";
import { PaymentServiceInfo } from "@/types/paymentserviceinfo/paymentserviceinfo";

export type PaymentServiceInfoCreateRes = {
    status: string;
    message: string;
    code: number;
    data?: PaymentServiceInfo,
    errors?: PaymentServiceInfoCreateErrRes
}

export type PaymentServiceInfoCreateErrRes = {
    payment_service_name?:string;
    img_url?:string;
    service_fee_percent?:number;
}

// type PaymentServiceInfoCreateErr = {
//     payment_service_name?:string;
//     img_url?:string;
//     service_fee_percent?:number;
// }

type PaymentServiceInfoCreateReq = {
    payment_service_name:string;
    img_url:string;
    service_fee_percent:number;
}

const create = (paymentserviceinfo:PaymentServiceInfoCreateReq):Promise<PaymentServiceInfoCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post("/payment-service",paymentserviceinfo)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;