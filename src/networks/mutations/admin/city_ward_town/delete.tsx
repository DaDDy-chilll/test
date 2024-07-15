import ApiService from "@/networks/services";

type DeleteCwdRes = {
  status: string;
  message: string;
  code: number;
};

export type DeleteCwdProps = {
  city_ward_town_id: number;
};

export type DeleteCwdErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    city_ward_town_id?: string;
  };
};

const deleteCwdById = ({
  city_ward_town_id,
}: DeleteCwdProps): Promise<DeleteCwdRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .delete(`/city-ward-town/${city_ward_town_id}`)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default deleteCwdById;
