import ApiService from "@/networks/services";
import { MasterDetail } from "@/types/master_detail/master_detail";

type MasterDetailUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: MasterDetail
}

export type MasterDetailUpdateErrRes = {
    code: number;
    status: string;
    message: string;
    errors?: MasterDetailUpdateErr;
}

type MasterDetailUpdateErr = {
    master_name?: string;
}

type MasterDetailUpdateIDReq = {
    master_detail_id: number;
}
type MasterDetailUpdateNameReq = {
    master_id: number;
    name: string;
    value: number;
}

const update = ({ master_detail_id }: MasterDetailUpdateIDReq, masterDetail: MasterDetailUpdateNameReq): Promise<MasterDetailUpdateRes> => {
    return new Promise((resolve, reject) => {
        ApiService.admin.put(`/master/detail/${master_detail_id}`, masterDetail)
            .then(ans => {
                resolve(ans.data);
            })
            .catch(err => {
                reject(err.response.data);
            })
    })
}

export default update;