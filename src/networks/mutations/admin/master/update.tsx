import ApiService from "@/networks/services";
import { Master } from "@/types/master/master";

type MasterUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: Master
}

export type MasterUpdateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: MasterUpdateErr;
}

type MasterUpdateErr = {
    master_name?: string;
}

type MasterUpdateIDReq = {
    master_id:number;
}
type MasterUpdateNameReq = {
    master_name: string;
}

const update = ({master_id}:MasterUpdateIDReq,master:MasterUpdateNameReq):Promise<MasterUpdateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.put(`/master/${master_id}`,master)
        .then(ans=>{
           resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response);
        })
    })
}

export default update;