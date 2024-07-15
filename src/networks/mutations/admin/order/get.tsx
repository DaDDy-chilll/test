//import { Order } from "@/models/dataModel";
import ApiService from "@/networks/services";
import { OrderForCustomerRes } from "@/types/order/order";

type GetOrderRes = {
    status: string;
    message: string;
    code: number;
    data: Array<OrderForCustomerRes>;
}

type GetOrderReq = {
    order_code ?: string | undefined;
    product ?: string | undefined;
    customer ?: string | undefined;
    order_date ?: string | undefined;
    payment_method ?: string | undefined;
    payment_date ?: string | undefined;
    address ?: string | undefined;
    schedule_delivery_date ?: string | undefined;
    schedule_pickedup_date ?: string | undefined;
    status ?: number | undefined;
}

const get = (params?: GetOrderReq): Promise<GetOrderRes> => {
    return new Promise((resolve, reject) => {
        ApiService.admin.get("/order",{params})
        // ApiService.admin.get(`/order?order_code=${orderBody.orderCode}&product=${orderBody.product}&customer=${orderBody.customer}&order_date=${orderBody.orderDate}&
        // payment_method=${orderBody.paymentMethod}&payment_date=${orderBody.paymentDate}&address=${orderBody.address}&schedule_delivery_date=${orderBody.scheduleDeliveryDate}&
        // schedule_pickedup_date=${orderBody.schedulePickedupDate}&status=${orderBody.orderStatus}`)
            .then(ans => {
                //  console.log("Success...")
                // console.log(ans.data);
                resolve(ans.data);
            })
            .catch(err => {
                // console.log("Fail...")
                reject(err);
            })
    })
}

export default get;