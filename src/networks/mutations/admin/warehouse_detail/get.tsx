import ApiService from "@/networks/services";
import { warehouse_detail } from "@/types/warehouse/warehouse_detail";
export type getWarehouseDetailFilterType  ={
      search?:string;
	  category?:string;
	  subCategory?:string;
} 
type WarehouseDetailRes = {
    status: string;
    message: string;
    code: number;
    data: Array<warehouse_detail>;
}
const get = (params?:getWarehouseDetailFilterType):Promise<WarehouseDetailRes>=>{
   return new Promise((resolve,reject)=>{
    ApiService.admin.get("/warehouse/detail",{params})
    .then((ans)=>{
        resolve(ans.data);
    })
    .catch((err)=>{
        reject(err.response.data);
    })

   })
}
export default get;