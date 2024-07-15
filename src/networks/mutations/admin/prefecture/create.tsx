import ApiService from "@/networks/services";
import { Prefecture } from "@/types/prefecture/Prefecture";

type CreatePrefectureRes = {
  status: string;
  message: string;
  code: number;
  data: Prefecture;
};

export type CreatePrefectureProps = {
  prefecturePayload: {
    name: string;
  };
};

export type CreatePrefectureErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: CreatePrefectureErr;
};

type CreatePrefectureErr = {
  name?: string;
};

const create = ({
  prefecturePayload,
}: CreatePrefectureProps): Promise<CreatePrefectureRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post("/prefecture", prefecturePayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default create;
