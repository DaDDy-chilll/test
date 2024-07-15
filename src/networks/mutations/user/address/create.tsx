import ApiService from "@/networks/services";
import { Address } from "@/types/address/address";

type AddressCreateRes = {
    status: string;
    message: string;
    code: number;
    data?: Address
    errors?: AddressCreateErr
}

export type AddressCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: AddressCreateErr;
}

type AddressCreateErr = {
    prefecture_id: string;
    city_ward_town_id: string;
    name: string;
    status: string;
    main_address: string;
    address_name: string;
    post_code: string;
}

export type AddressCreateReq = {
    address_id: number;
    prefecture_id: string;
    city_ward_town_id: string;
    name: string;
    status: string;
    main_address: string;
    address_name: string;
    post_code: string;
}

const create = (addressBody: AddressCreateReq): Promise<AddressCreateRes> => {
    return new Promise((resolve, reject) => {
        ApiService.user.post("/address", addressBody)
            .then(ans => {
                console.log("ok...")
                resolve(ans.data);
            })
            .catch(err => {
                console.log("fail...")
                reject(err.response.data);
            })
    })
}

export default create;