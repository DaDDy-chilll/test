import ApiService from "@/networks/services";
import { ProductReturnPolicy } from "@/types/product/productReturnPolicy";

type ProductReturnPolicyCreateRes = {
    status: string;
    message: string;
    code: number;
    data: ProductReturnPolicy;
}

export type ProductReturnPolicyCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: ProductReturnPolicyCreateErr;
}

type ProductReturnPolicyCreateErr = {
    product_id?:number;
    title?: string;
    policy?:string;
}

type ProductReturnPolicyCreateReq = {
    product_id: number;
    title: string;
    policy: string;
}

const create = (productReturnPolicy:ProductReturnPolicyCreateReq):Promise<ProductReturnPolicyCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post("/product/return/policy",productReturnPolicy)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;