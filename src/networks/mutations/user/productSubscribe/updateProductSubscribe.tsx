import ApiService from "@/networks/services";
import { ProductSubscribeUpdateReq } from "@/types/productsubscribe/productSubscribeRes";

type ProductSubscribeUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: ProductSubscribeUpdateReq;
}

export type getProductSubscribeUpdateErrRes = {
    code:number;
    status:string;
    message:string;
    errors?:Error;
}

type Error = {
    schedule_delivery_date : string;
}

const updateProductSubscribe = (product_subscribe_id : number, productSub : ProductSubscribeUpdateReq) : Promise<ProductSubscribeUpdateRes>=>{
    return new Promise( (resolve,reject) =>{
        ApiService.user.put(`/subscribe/${product_subscribe_id}`, productSub)
        .then( ans => {
            resolve(ans.data);
        })
        .catch(err => {
            reject(err.response.data);
        })
    })
}

export default updateProductSubscribe;

