import ApiService from "@/networks/services";
import { MasterDetail } from "@/types/master_detail/master_detail";

type GetMasterDetailRes = {
    status: string;
    message: string;
    code: number;
    data: Array<MasterDetail>;
}

type MasterReq = {
    master_id?: number;
    name?: string;
}

const get = ({master_id, name}: MasterReq): Promise<GetMasterDetailRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.get(`/master/detail?master_id=${master_id}&name=${name}`)
        .then(ans=>{
            // console.log(ans.data);
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}
export default get;