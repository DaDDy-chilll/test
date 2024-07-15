import ApiService from "@/networks/services";
import { CityWardTown } from "@/types/citywardtown/CityWardTown";

type cwdCreateRes = {
  status: string;
  message: string;
  code: number;
  data: CityWardTown;
};

export type cwdCreateErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: cwdCreateErr;
};

export type cwdCreateProps = {
  cwdPayload: {
    prefecture_id: number;
    code: string;
    name: string;
    address: string;
  };
};

type cwdCreateErr = {
  prefecture_id: number;
  code: string;
  name: string;
  address: string;
};

const create = ({ cwdPayload }: cwdCreateProps): Promise<cwdCreateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .post("/city-ward-town", cwdPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default create;
