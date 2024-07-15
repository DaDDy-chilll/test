import ApiService from "@/networks/services";
import { Address } from "@/types/address/address";

type AddressUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: Address
    errors?: AddressUpdateErr
}

export type AddressUpdateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: AddressUpdateErr;
}

type AddressUpdateErr = {
    prefecture_id: string;
    city_ward_town_id: string;
    name: string;
    status: string;
    main_address: string;
    address_name: string;
    post_code: string;
}

export type AddressUpdateReq = {
    prefecture_id: string;
    city_ward_town_id: string;
    name: string;
    status: string;
    main_address: string;
    address_name: string;
    post_code: string;
}

const put = (address_id: number, addressBody: AddressUpdateReq): Promise<AddressUpdateRes> => {
    return new Promise((resolve, reject) => {
        ApiService.user.post(`/address/${address_id}`, addressBody)
            .then(ans => {
                resolve(ans.data);
            })
            .catch(err => {
                reject(err.response.data);
            })
    })
}

export default put;