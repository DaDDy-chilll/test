import ApiService from "@/networks/services";

type OrderUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: updateMultipleRequest
}

export type updateMultipleRequest = {
    order_id_list: Array<number>,
	order_status : number;
}

const updateMultiple = (req:updateMultipleRequest): Promise<OrderUpdateRes> => {
    return new Promise((resolve, reject) => {
        ApiService.admin.put(`/order/status`, req)
            .then(ans => {
                resolve(ans.data);
            })
            .catch(err => {
                reject(err.response.data);
            })
    })
}

export default updateMultiple;