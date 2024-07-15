import ApiService from "@/networks/services";
import { ReceiveAccountInfo } from "@/types/receiveaccountinfo/receiveaccountinfo";

export type ReceiveAccountInfoCreateRes = {
    status: string;
    message: string;
    code: number;
    data?: ReceiveAccountInfo
    errors?: ReceiveAccountInfoCreateErrRes;
}

export type ReceiveAccountInfoCreateErrRes = {
    payment_service_info_id?: number;
    address_id?: number;
    receiver_name?: string;
    receiver_phone?: string;
    account_no?:string;
 
}

// type ReceiveAccountInfoCreateErr = {
//     payment_service_info_id?: number;
//     address_id?: number;
//     receiver_name?: string;
//     receiver_phone?: string;
//     account_no?:string;
// }

type ReceiveAccountInfoCreateReq = {
    payment_service_info_id: number;
    address_id: number;
    receiver_name: string;
    receiver_phone: string;
    account_no:string;
}

const create = (receiveaccountinfo:ReceiveAccountInfoCreateReq):Promise<ReceiveAccountInfoCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post("/payment/receive/account-info",receiveaccountinfo)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;