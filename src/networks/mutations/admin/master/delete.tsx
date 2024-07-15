import ApiService from "@/networks/services";

type MasterDeleteReq = {
    master_id: number;
}

type MasterDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type MasterDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deleteMaster = ({master_id}: MasterDeleteReq): Promise<MasterDeleteRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.delete(`/master/${master_id}`)
        .then((ans)=>{
            console.log(ans.data);
            resolve(ans.data);
        })
        .catch((err)=>{
            console.log(err.response.data)
            reject(err.response.data);
        })
    });
}

export default deleteMaster;