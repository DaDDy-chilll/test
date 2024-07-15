import ApiService from "@/networks/services";
import { PaymentServiceInfo } from "@/types/paymentserviceinfo/paymentserviceinfo";

export type PaymentServiceInfoUpdateRes = {
    status: string;
    message: string;
    code: number;
    data?: PaymentServiceInfo
    errors?: PaymentServiceInfoUpdateErrRes;
}

export type PaymentServiceInfoUpdateErrRes = {
    payment_service_name?:string;
    img_url:string;
    service_fee_percent?:number;
}

// type PaymentServiceInfoUpdateErr = {
//     payment_service_name?:string;
//     img_url:string;
//     service_fee_percent?:number;
// }

type PaymentServiceInfoUpdateIDReq = {
    payment_service_info_id:number;
}
type PaymentServiceInfoUpdateBodydataReq = {
    payment_service_name:string;
    img_url:string;
    service_fee_percent:number;
}

const update = ({payment_service_info_id}:PaymentServiceInfoUpdateIDReq,paymentserviceinfo:PaymentServiceInfoUpdateBodydataReq):Promise<PaymentServiceInfoUpdateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.put(`/payment-service/${payment_service_info_id}`,paymentserviceinfo)
        .then(ans=>{
           resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response);
        })
    })
}

export default update;