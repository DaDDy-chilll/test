import ApiService from "@/networks/services";

export type CustomerLoginAndSecurityListRes = {
    status: string;
    message: string;
    code: number;
    data?: CustomerLoginAndSecurityDto;
    errors?: {
        mail?: string;
        password?: string;
    };
};

export type CustomerLoginAndSecurityDto = {
    name: string;
    mail: string;
    token: string;
    phone: string;
}
  
const get = (): Promise<CustomerLoginAndSecurityListRes>=> {
    return new Promise((resolve)=>{
        ApiService.user.get("/login-security")
        .then(ans=>{
            //console.log(ans.data);
            resolve(ans.data);
        })
        .catch(()=>{
            console.log("err")
        })
    })
}
export default get;
