import { AddressResponse } from "./address_response";

export type CustomerResponse = {
    user_id: number,
    user_code: string,
    mail: string,
    user_name: string,
    user_name_kana: string,
    date_of_birth: string,
    phone: string,
    status: number,
    role: string,
    point: number,
    created_at: string,
    updated_at: string
    address_list:Array<AddressResponse>;
}