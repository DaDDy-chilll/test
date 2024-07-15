import ApiService from "@/networks/services";
import { userPoint } from "@/types/user/user_point";

export type GetUserPointRes = {
    status: string;
    message: string;
    code: number;
    data: Array<userPoint>;
}


const getUserPoint = {
    get: (search: string): Promise<GetUserPointRes>=>{
        return new Promise((resolve,reject)=>{
            ApiService.admin.get(`/user/point?search=${search}`)
            .then((ans)=>{
                resolve(ans.data);
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }
}

export default getUserPoint;