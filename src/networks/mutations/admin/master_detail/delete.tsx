import ApiService from "@/networks/services";

type MasterDetailDeleteReq = {
    master_detail_id: number;
}

type MasterDetailDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type MasterDetailDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deleteMasterDetail = ({master_detail_id}: MasterDetailDeleteReq): Promise<MasterDetailDeleteRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.admin.delete(`/master/detail/${master_detail_id}`)
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

export default deleteMasterDetail;