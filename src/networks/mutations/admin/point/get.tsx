import ApiService from "@/networks/services";
import { Point } from "@/types/point/point";


type GetPointRes = {
    status:string;
    message:string;
    code:number;
    data:Array<Point>;
}

type GetPointReq = {
    search ?: string;
}

const get = (params?:GetPointReq) : Promise<GetPointRes> => {
    return new Promise((resolve,reject) => {
        ApiService.admin.get("/user/point",{params})
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err => {
            reject(err.response.data);
        })
    })
}
export default get;