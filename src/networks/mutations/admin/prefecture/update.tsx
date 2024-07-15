import ApiService from "@/networks/services";
import { Prefecture } from "@/types/prefecture/Prefecture";

type UpdatePrefectureRes = {
  status: string;
  message: string;
  code: number;
  data: Prefecture;
};

export type UpdatePrefectureProps = {
  prefecture_id: number;
  updatePrefecturePayload: {
    name: string;
  };
};

export type UpdatePrefectureErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: UpdatePrefectureErr;
};

type UpdatePrefectureErr = {
  name?: string;
};

const update = ({
  prefecture_id,
  updatePrefecturePayload,
}: UpdatePrefectureProps): Promise<UpdatePrefectureRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`/prefecture/${prefecture_id}`, updatePrefecturePayload)
      .then((ans) => resolve(ans.data))
      .catch((err) => reject(err.response.data));
  });
};

export default update;
