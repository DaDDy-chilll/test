import ApiService from "@/networks/services";
import { CityWardTown } from "@/types/citywardtown/CityWardTown";

type cwdGetRes = {
    status: string,
    message: string,
    code: number,
    data?: Array<CityWardTown>,
    error?: string
}

const get = (code: string, prefectureId: string, name: string): Promise<cwdGetRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(`/city-ward-town?code=${code}&prefecture_id=${prefectureId}&name=${name}`)
      .then((ans) => {
        console.log(ans.data)
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export default get;
