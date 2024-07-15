import ApiService from "@/networks/services";
import { ProductReturnPolicy } from "@/types/product/productReturnPolicy";

type ProductReturnPolicyUpdateReq = {
    product_id: number;
    title: string;
    policy: string;
}

type ProductReturnPolicyUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: ProductReturnPolicy;
}

export type ProductReturnPolicyUpdateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: ProductReturnPolicyUpdateErr;
}

type ProductReturnPolicyUpdateErr = {
    product_id?:number;
    title?: string;
    policy?:string;
}

const update = (product_return_policy_id:number,productReturn : ProductReturnPolicyUpdateReq) : Promise<ProductReturnPolicyUpdateRes>=>{
    return new Promise( (resolve,reject) =>{
        ApiService.admin.put(`/product/return/policy/${product_return_policy_id}`, productReturn)
        .then( ans => {
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err => {
            reject(err.response.data);
        })
    })
}

export default update;

