import ApiService from "@/networks/services";
import { Master } from "@/types/master/master";

type GetMasterRes = {
    status: string;
    message: string;
    code: number;
    data: Array<Master>;
}

const get = (): Promise<GetMasterRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get("/master")
        .then(ans=>{
            // console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}

export default get;