import ApiService from "@/networks/services";
import { User } from "@/types/user/user";

export interface registerRequest {
    user_name?:string;
    mail: string;
    password: string;
}

export interface registerResponse {
    code: number;
    message: string;
    token: string;
    data: User;
}

export type registerErrResponse = {
    code: number;
    errors?: registerError;
    message: string;
    status: string;
}

type registerError = {
    user_name?:string;
    mail?: string;
    password?: string;
}

const register = (registerRequest: registerRequest): Promise<registerResponse>=>{
    return new Promise((resolve,reject)=>{
        ApiService.auth.post("/pub/register",registerRequest)
        .then(({data}: {data:registerResponse})=>{
            resolve(data);
        })
        .catch((err)=>{
            const res: registerErrResponse = {
                code: err.response.data.code,
                errors: err.response.data.data,
                message: err.response.data.message,
                status: err.response.data.status,
            }
            reject(res);
        })
    })
}

export default register;