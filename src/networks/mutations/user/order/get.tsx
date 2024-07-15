import ApiService from "@/networks/services";
import { OrderForCustomerRes } from "@/types/order/order"

type GetOrderRes = {
    status: string;
    message: string;
    code: number;
    data: Array<OrderForCustomerRes>;
}

type GetOrderReq = {
   
    product ?: string | undefined;
    order_date ?: string | undefined;
}

const get =(params?: GetOrderReq) : Promise<GetOrderRes> => {
    return new Promise((resolve,reject) => {
        ApiService.user.get("/order",{params})
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export default get;