import ApiService from "@/networks/services";
import { PaymentServiceInfo } from "@/types/paymentserviceinfo/paymentserviceinfo";

type GetPaymentServiceInfoRes = {
    status: string;
    message: string;
    code: number;
    data: Array<PaymentServiceInfo>;
}

type PaymentServiceInfoReq = {
    payment_service_info_id: number;
}

const search = ({payment_service_info_id}: PaymentServiceInfoReq): Promise<GetPaymentServiceInfoRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get(`/payment-service/${payment_service_info_id}`)
        .then(ans=>{
            // console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}
export default search;