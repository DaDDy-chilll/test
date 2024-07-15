import ApiService from "@/networks/services";
import { ReceiveAccountInfo } from "@/types/receiveaccountinfo/receiveaccountinfo";

type GetReceiveAccountInfoRes = {
    status: string;
    message: string;
    code: number;
    data: Array<ReceiveAccountInfo>;
}

const get = (): Promise<GetReceiveAccountInfoRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get("/payment/receive/account-info")
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
