import ApiService from "@/networks/services";

type AddressDeleteRes = {
    status: string;
    message: string;
    code: number;
    data: any;
    errors?: AddressDeleteErr
}

export type AddressDeleteErrRes = {
    status: string;
    message: string;
    code: number;
    data: any;
}

type AddressDeleteErr = {
    address_id: number;
}

const deleteMaster = (address_id: number): Promise<AddressDeleteRes>=> {
    return new Promise((resolve,reject)=>{
        ApiService.user.delete(`/address/${address_id}`)
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