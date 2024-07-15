import ApiService from "@/networks/services";
import { CityWardTown } from "@/types/citywardtown/CityWardTown";

type UpdateCwdRes = {
  status: string;
  message: string;
  code: number;
  data: CityWardTown;
};

export type UpdateCwdProps = {
  city_ward_town_id: number;
  cwdPayload: {
    prefecture_id: number;
    code: string;
    name: string;
  };
};

type UpdateCwdErr = {
  prefecture_id: number;
  code: string;
  name: string;
  address: string;
};

export type UpdateCwdErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: UpdateCwdErr;
};

const update = ({
  city_ward_town_id,
  cwdPayload,
}: UpdateCwdProps): Promise<UpdateCwdRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .put(`city-ward-town/${city_ward_town_id}`, cwdPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default update;
