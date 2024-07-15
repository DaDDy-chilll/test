import ApiService from "@/networks/services";
import { PointHistory } from "@/types/point/pointHistory";

type GetPointHistoryRes = {
    status:string;
    message:string;
    code:number;
    data:Array<PointHistory>;
}

type GetPointHistoryReq ={
    order_id ?:number;
    date ?:string;
}

const pointHistoryGet = (params?:GetPointHistoryReq) : Promise<GetPointHistoryRes> => {
        return new Promise((resolve, reject)=> {
            ApiService.admin.get("/user/point/history",{params})
            .then(ans => {
                resolve(ans.data);
            })
            .catch(err => {
                reject(err.response.data)
            })
        })
}
export default pointHistoryGet;