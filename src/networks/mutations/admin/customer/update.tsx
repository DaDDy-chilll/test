import ApiService from "@/networks/services";
import { CustomerRequest } from "@/types/customer/customer_request";

type CustomerUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: CustomerRequest;
}

export type CustomerUpdateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: CustomerUpdateErr;
}

type CustomerUpdateErr = {
    user_name ?: string;
    user_name_kana?: string;
    date_of_birth ?: string;
    phone ?: string;
    status ?: number;
    role ?: string;
    point?: number;
}

 type CustomerUpdateReq={
    user_name ?: string;
    user_name_kana ?:string;
    date_of_birth ?:string;
    phone ?:string;
    status ?: number;
    role ?:string;
    point ?:number;
}

const update =(user_id: number, user:CustomerUpdateReq):Promise<CustomerUpdateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.put(`/user/${user_id}`,user)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
           reject(err.response.data);
        })
    })
}

export default update;