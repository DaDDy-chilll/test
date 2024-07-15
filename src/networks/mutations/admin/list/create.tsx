import ApiService from "@/networks/services";
import { Admin } from "@/types/admin/admin";

export type createAdminData = {
    user_name: string;
    user_name_kana: string;
    mail: string;
    role: number;
    phone: string;
};

export type GetCreatedAdminRes = {
  status: string;
  message: string;
  code: number;
  data: Array<Admin>;
}

export type getCreatedAdminErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: Error;
};

type Error = {
  mail: string;
  phone: string;
  user_name: string;
  user_name_kana: string;
}

const createAdmin = (create_data : createAdminData): Promise<GetCreatedAdminRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin.post("", create_data)
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default createAdmin;