import ApiService from "@/networks/services";

type ReceiveAccountInfoDeleteReq = {
    receive_account_info_id: number;
}

type ReceiveAccountInfoDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type ReceiveAccountInfoDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deleteReceiveAccountInfo = ({receive_account_info_id}: ReceiveAccountInfoDeleteReq): Promise<ReceiveAccountInfoDeleteRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.delete(`/payment/receive/account-info/${receive_account_info_id}`)
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

export default deleteReceiveAccountInfo;