import ApiService from "@/networks/services";
import { Master } from "@/types/master/master";

type MasterCreateRes = {
    status: string;
    message: string;
    code: number;
    data: Master
}

export type MasterCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: MasterCreateErr;
}

type MasterCreateErr = {
    master_name?: string;
}

type MasterCreateReq = {
    master_name: string;
}

const create = (master:MasterCreateReq):Promise<MasterCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post("/master",master)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;