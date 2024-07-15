import ApiService from "@/networks/services";

type PaymentServiceInfoDeleteReq = {
    payment_service_info_id: number;
}

type PaymentServiceInfoDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type PaymentServiceInfoDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deletePaymentServiceInfo = ({payment_service_info_id}: PaymentServiceInfoDeleteReq): Promise<PaymentServiceInfoDeleteRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.delete(`/payment-service/${payment_service_info_id}`)
        .then((ans)=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch((err)=>{
            console.log(err.response.data)
            reject(err.response.data);
        })
    });
}

export default deletePaymentServiceInfo;