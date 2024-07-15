import ApiService from "@/networks/services";
import { ProductSubscribeUpdateReq } from "@/types/productsubscribe/productSubscribeRes";

type ProductSubscribeUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: ProductSubscribeUpdateReq;
}

const removeProductSubscribe = (product_subscribe_id : number, productSub ?: ProductSubscribeUpdateReq) : Promise<ProductSubscribeUpdateRes>=>{
    return new Promise( (resolve,reject) =>{
        ApiService.user.put(`/subscribe/${product_subscribe_id}`,{productSub})
        .then( ans => {
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err => {
            console.log("Error");
            reject(err.response.data);
        })
    })
}

export default removeProductSubscribe;

