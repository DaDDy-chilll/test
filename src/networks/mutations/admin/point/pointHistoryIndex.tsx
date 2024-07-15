import ApiService from "@/networks/services";
import { PointHistory } from "@/types/point/pointHistory";

type GetPointHistoryRes = {
  status: string;
  message: string;
  code: number;
  data: Array<PointHistory>;
};

type GetPointHistoryReq = {
  order_code?: string;
  date_from?: string;
  date_to?: string;
};

const pointHistoryIndex = (
  user_id: number,
  params?: GetPointHistoryReq
): Promise<GetPointHistoryRes> => {
  return new Promise((resolve, reject) => {
    ApiService.admin
      .get(`/user/point/history/${user_id}`, { params })
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
export default pointHistoryIndex;
