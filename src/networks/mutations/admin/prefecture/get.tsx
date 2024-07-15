import ApiService from "@/networks/services";
import { Prefecture } from "@/types/prefecture/Prefecture";

type GetPrefectureListRes = {
  status: string;
  message: string;
  code: number;
  data: Array<Prefecture>;
};

export type getPrefectureErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: string;
};
const getPrefectureLists = (): Promise<GetPrefectureListRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get("/prefecture")
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default getPrefectureLists;
