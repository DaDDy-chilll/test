import ApiService from "@/networks/services";
import { Prefecture } from "@/types/prefecture/Prefecture";
type GetProductRes = {
  status: string;
  message: string;
  code: number;
  data?: Array<Prefecture>;
  errors?: string;
};
const get = (): Promise<GetProductRes> => {
  return new Promise((resolve, reject) => {
    ApiService.pub
      .get(`/prefecture`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default get;