import ApiService from "@/networks/services";

type ProductReturnPolicyDeleReq = {
    product_return_policy_id : number;
}

type ProductReturnPolicyDeleRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type ProductReturnPolicyDeleErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deleteProductReturnPolicy = ({product_return_policy_id} : ProductReturnPolicyDeleReq) : Promise <ProductReturnPolicyDeleRes> =>{
    return new Promise( (resolve, reject) => {
        ApiService.admin.delete(`/product/return/policy/${product_return_policy_id}`)
        .then((ans)=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch((err) => {
            console.log(err.response.data);
            reject(err.response.data);
        })
    });
}

export default deleteProductReturnPolicy;