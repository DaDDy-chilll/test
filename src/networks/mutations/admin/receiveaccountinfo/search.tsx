import ApiService from "@/networks/services";
import { ReceiveAccountInfo } from "@/types/receiveaccountinfo/receiveaccountinfo";

type GetReceiveAccountInfoRes = {
    status: string;
    message: string;
    code: number;
    data: Array<ReceiveAccountInfo>;
}

type ReceiveAccountInfoReq = {
    receive_account_info_id: number;
}

const search = ({receive_account_info_id}: ReceiveAccountInfoReq): Promise<GetReceiveAccountInfoRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get(`/payment/receive/account-info/${receive_account_info_id}`)
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