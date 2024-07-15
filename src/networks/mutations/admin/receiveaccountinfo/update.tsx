import ApiService from "@/networks/services";
import { ReceiveAccountInfo } from "@/types/receiveaccountinfo/receiveaccountinfo";

export type ReceiveAccountInfoUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: ReceiveAccountInfo
    errors?: ReceiveAccountInfoUpdateErrRes;
}

export type ReceiveAccountInfoUpdateErrRes = {
    payment_service_info_id?: number;
    address_id?: number;
    receiver_name?: string;
    receiver_phone?: string;
    account_no?:string;
}

// type ReceiveAccountInfoUpdateErr = {
//     payment_service_info_id?: number;
//     address_id?: number;
//     receiver_name?: string;
//     receiver_phone?: string;
//     account_no?:string;
// }

type ReceiveAccountInfoUpdateIDReq = {
    receive_account_info_id:number;
}
type ReceiveAccountInfoUpdateBodydataReq = {
    payment_service_info_id: number;
    address_id: number;
    receiver_name: string;
    receiver_phone: string;
    account_no:string;
}

const update = ({receive_account_info_id}:ReceiveAccountInfoUpdateIDReq,receiveaccountinfo:ReceiveAccountInfoUpdateBodydataReq):Promise<ReceiveAccountInfoUpdateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.put(`/payment/receive/account-info/${receive_account_info_id}`,receiveaccountinfo)
        .then(ans=>{
           resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response);
        })
    })
}

export default update;