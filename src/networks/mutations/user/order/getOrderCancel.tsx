import ApiService from "@/networks/services";
import { OrderCancelRes } from "@/types/order/order-decline/order_decline";

type GetOrderCancelRes = {
    status: string;
    message: string;
    code: number;
    data: Array<OrderCancelRes>;
}

const getOrderCancel =() : Promise<GetOrderCancelRes> => {
    return new Promise((resolve,reject) => {
        ApiService.user.get("/order/cancel/history")
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export default getOrderCancel;