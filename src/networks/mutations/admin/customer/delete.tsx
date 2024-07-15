import ApiService from "@/networks/services";

type CustomerDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

export type CustomerDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

const deleteMaster =(user_id : number):Promise<CustomerDeleteRes>=>{
    return new Promise ((resolve, reject)=>{
        ApiService.admin.delete(`/user/${user_id}`)
        .then((ans)=>{
            resolve(ans.data);
        })
        .catch((err)=>{
            reject(err.response.data);
        })

    })
}
export default deleteMaster;

