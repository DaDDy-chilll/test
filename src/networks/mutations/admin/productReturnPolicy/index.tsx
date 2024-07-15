import ApiService from "@/networks/services"
import { ProductReturnPolicy } from "@/types/product/productReturnPolicy";

type ProductReturnPolicyRes = {
    product_id:number;
}

type GetProductReturnPolicyRes = {
    status: string;
    message: string;
    code: number;
    data: Array<ProductReturnPolicy>;
}

const index = ({product_id}:ProductReturnPolicyRes):Promise<GetProductReturnPolicyRes> => {
    return new Promise((resolve,reject) =>{
        ApiService.admin.get(`/product/return/policy/${product_id}`)
        .then(ans=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default index;