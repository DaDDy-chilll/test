import ApiService from "@/networks/services";
import { PaymentServiceInfo } from "@/types/paymentserviceinfo/paymentserviceinfo";

type GetPaymentServiceInfoRes = {
    status: string;
    message: string;
    code: number;
    data: Array<PaymentServiceInfo>;
}

const get = (): Promise<GetPaymentServiceInfoRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get("/payment-service")
        .then(ans=>{
            // console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}
export default get;
