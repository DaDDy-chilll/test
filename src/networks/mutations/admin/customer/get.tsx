
import ApiService from "@/networks/services";
//import axios from "axios";
import { CustomerResponse } from "@/types/customer/customer_response";

type GetCustomerRes ={
    status:string;
    message:string;
    code:number;
    data:Array<CustomerResponse>;
}

type GetCustomerReq ={
    search?: string | undefined;
    address?: string | undefined;
    status?: number | undefined;
}

const get = (params?:GetCustomerReq ): Promise<GetCustomerRes>=> {
    return new Promise((resolve, reject)=>{
        ApiService.admin.get("/user",{params})
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}
export default get;
