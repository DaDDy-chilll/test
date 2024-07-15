import ApiService from "@/networks/services";

type PasswordUpdateRes = {
    status: string;
    message: string;
    code: number;
    data: PasswordUpdateErrRes;
}

export type PasswordUpdateErrRes ={
    code: number;
    status: string;
    message: string;
    errors?: PasswordUpdateErr;
}

type PasswordUpdateErr ={
    old_password: string;
    new_password: string;
}


type PasswordUpdateReq ={
    old_password: string;
    new_password: string;
}


const changepassword=(changepassword: PasswordUpdateReq):Promise<PasswordUpdateRes>=>{
    return new Promise((resolve,reject)=>{
        ApiService.admin.post(`/user/password-change`,changepassword)
        .then(ans=>{
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default changepassword;