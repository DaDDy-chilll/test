import ApiService from "@/networks/services";
import { CustomerRequest } from "@/types/customer/customer_request";


type CustomerCreateRes = {
    status: string;
    message: string;
    code: number;
    data: CustomerRequest
}

export type CustomerCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: CustomerCreateErr;
}

type CustomerCreateErr = {
    user_code: string;
    mail: string;
    user_name: string;
    user_name_kana?: string;
    date_of_birth: string;
    phone: string;
    password:string;
    status: number;
    role: string;
    point?: number;
}

type CustomerCreateReq = {
    user_code: string;
    mail: string;
    user_name: string;
    user_name_kana: string;
    date_of_birth: string;
    phone: string;
    password:string;
    status: number;
    role: string;
    point: number;
}

const create = (user:CustomerCreateReq):Promise<CustomerCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post(`/user`,user)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;