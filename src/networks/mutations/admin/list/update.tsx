import ApiService from "@/networks/services";
import { Admin } from "@/types/admin/admin";

// export type updateAdminData = {
//   user_id: number;
//   update_data?: {
//     user_name: string;
//     user_name_kana: string;
//     mail: string;
//     role: number;
//     phone: string;
//     status: string;
//   }
// };

export type updateAdminData = {
 
    user_name?: string;
    user_name_kana?: string;
    mail?: string;
    role?: number;
    phone?: string;
    status?: number;
  
};

export type GetUpdatedAdminRes = {
  status: string;
  message: string;
  code: number;
  data: Admin;
}

export type getUpdatedAdminErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: any;
};

const updateAdmin = ( user_id :number ,update_data : updateAdminData): Promise<GetUpdatedAdminRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin.put(`/${user_id}`, update_data)
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default updateAdmin;