import ApiService from "@/networks/services";
import { User } from "@/types/user/user";

export interface LoginRequest {
    mail: string;
    password: string;
}

export interface LoginResponse {
    code: number;
    message: string;
    token: string;
    user: User;
} 

export type LoginErrResponse = {
    code: number;
    errors?: loginError;
    message: string;
    status: string;
}

type loginError = {
    mail?: string;
    password?: string;
}

const login = (loginRequest: LoginRequest): Promise<LoginResponse>=>{
    return new Promise((resolve,reject)=>{
        ApiService.auth.post("/login",loginRequest)
        .then(({data}: {data:LoginResponse})=>{
            resolve(data);
        })
        .catch((err)=>{
            const res: LoginErrResponse = {
                code: err.response.data.code,
                errors: err.response.data.errors,
                message: err.response.data.message,
                status: err.response.data.status,
            }
            reject(res);
        })
    })
}

export default login;