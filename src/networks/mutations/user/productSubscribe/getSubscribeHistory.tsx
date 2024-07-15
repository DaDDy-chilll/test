import ApiService from "@/networks/services";
import { ProductSubscribe } from "@/types/productsubscribe/productSubscribeRes";

type GetProductSubscribeHistoryRes = {
    status: string;
    message: string;
    code: number;
    data: Array<ProductSubscribe>;
}

const getSubscribeHistory =() : Promise<GetProductSubscribeHistoryRes> => {
    return new Promise((resolve,reject) => {
        ApiService.user.get("/subscribe/history")
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export default getSubscribeHistory;