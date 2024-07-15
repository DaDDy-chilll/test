import ApiService from "@/networks/services";
import { MasterDetail } from "@/types/master_detail/master_detail";

type MasterDetailCreateRes = {
    status: string;
    message: string;
    code: number;
    data: MasterDetail
}

export type MasterDetailCreateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: MasterDetailCreateErr;
}

type MasterDetailCreateErr = {
    name?: string;
}

type MasterDetailCreateReq = {
    master_id:number;
    name: string;
    value: number;
}

const create = (master_detail:MasterDetailCreateReq):Promise<MasterDetailCreateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post("/master/detail",master_detail)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default create;