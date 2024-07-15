import ApiService from "@/networks/services";
import { productReview } from "@/types/product/productReview";

type ProductReviewCreateRes = {
    status: string;
    message: string;
    code: number;
    data: productReview;
}

type ProductReviewCreateReq = {
    product_id : number;
    order_detail_id : number;
    user_id : number;
    title : string;
    review : string;
    rating : number;
    approver_id : number;
}

type ProductReviewCreateErr = {
    title ?: string;
    review ?: string;
    rating ?: number;
}

export type ProductReviewCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: ProductReviewCreateErr;
}

const create  = (productReview:ProductReviewCreateReq):Promise<ProductReviewCreateRes> => {
    return new Promise ( (resolve,reject) => {
        ApiService.user.post("/product/review", productReview)
        .then(ans => {
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err => {
            console.log(err);
            reject(err.response.data);
        })
    })
}

export default create;