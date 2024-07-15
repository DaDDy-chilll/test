import ApiService from "@/networks/services";
import { Admin } from "@/types/admin/admin";

type params = {
  id: number;
};

type GetAdminUpdatedRes = {
  status: string;
  message: string;
  code: number;
  data: Admin;
}

export type getAdminUpdatedErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: any;
};

const deleteAdmin = (params: params): Promise<GetAdminUpdatedRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin.delete(`/${params.id}`)
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default deleteAdmin;