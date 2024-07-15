import ApiService from "@/networks/services";
import { CustomerResponse } from "@/types/customer/customer_response";

type GetDetailCustomerRes ={
    status:string;
    message:string;
    code:number;
    data:Array<CustomerResponse>;
}

const index = (user_id: number): Promise<GetDetailCustomerRes>=> {
    return new Promise((resolve, reject)=>{
        ApiService.admin.get(`/user/${user_id}`)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default index;