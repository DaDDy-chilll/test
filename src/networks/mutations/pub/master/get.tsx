import ApiService from "@/networks/services";
import { MasterDetail } from "@/types/master_detail/master_detail";

type GetMasterDetailRes = {
  status: string;
  message: string;
  code: number;
  data: Array<MasterDetail>;
};

const get = (): Promise<GetMasterDetailRes> => {
  return new Promise((resolve, reject) => {
    ApiService.pub
      .get(`/master/public`)
      .then((ans) => {
        // console.log(ans.data);
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default get;
