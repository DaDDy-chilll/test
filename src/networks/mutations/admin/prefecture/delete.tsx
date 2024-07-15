import ApiService from "@/networks/services";

type DeletePrefectureRes = {
  status: string;
  message: string;
  code: number;
};

type PrefectureDeleteReq = {
  prefecture_id: number;
};

export type PrefectureDeleteErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: PrefectureDeleteReq;
};

const deletePrefecture = ({
  prefecture_id,
}: PrefectureDeleteReq): Promise<DeletePrefectureRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete(`/prefecture/${prefecture_id}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default deletePrefecture;
