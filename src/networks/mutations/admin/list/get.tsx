import ApiService from "@/networks/services";
import { Admin } from "@/types/admin/admin";

 export type params = {
  search ?: string;
  role ?: string | number;
};

type GetAdminListRes = {
  status: string;
  message: string;
  code: number;
  data: Array<Admin>;
}

export type getAdminListErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: any;
};

const get = (params: params): Promise<GetAdminListRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin.get("", {params})
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default get;