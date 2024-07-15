import ApiService from "@/networks/services";
import { Address } from "@/types/address/address";

type GetAddressRes = {
    status: string;
    message: string;
    code: number;
    data: Array<Address>;
}

// export type GetAddressErrRes = {
//     status: string;
//     message: string;
//     code: number;
//     data: any;
// }

const get = (addressBody: any): Promise<GetAddressRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.user.get(`/address?code=${addressBody.code}&prefecture=${addressBody.prefecture}&name=${addressBody.name}`)
        .then(ans=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            console.log("wrong...")
            reject(err);
        })
    })
}

export default get;