import ApiService from "@/networks/services";
import { Address } from "@/types/address/address";


type GetAddressForOrder = { 
   status : string;
   message : string;
   code : number;
   data : Array<Address>;
}

export type GetAddressForOrderErr = { 
    status : string; 
    message : string;
    code : number;
    errors? : Array<Address>;
}

const getAddress = () : Promise<GetAddressForOrder> => { 
    return new Promise((resolve,reject) => { 
        ApiService.user.get(`/order/test`)
        .then(ans => { 
            resolve(ans.data)
        })
        .catch(err => {
            reject(err.response.data)
        })
    })
}

export default getAddress;