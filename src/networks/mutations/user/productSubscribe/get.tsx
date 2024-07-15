import ApiService from "@/networks/services";
import { ProductSubscribe } from "@/types/productsubscribe/productSubscribeRes";

type GetProductSubscribeRes = {
    status: string;
    message: string;
    code: number;
    data: Array<ProductSubscribe>;
}

const get =() : Promise<GetProductSubscribeRes> => {
    return new Promise((resolve,reject) => {
        ApiService.user.get("/subscribe")
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export default get;