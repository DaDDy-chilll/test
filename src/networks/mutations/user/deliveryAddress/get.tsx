import ApiService from "@/networks/services";
import { DeliveryAddressList } from "@/types/delivery_address/delivery_address_list";

type GetDeliveryAddressRes = {
  status: string;
  message: string;
  code: number;
  data?: Array<DeliveryAddressList>;
  errors?: string;
};
interface getDeliveryAddressListProps {
  status?: 1 | 2;
}
const getDeliveryAddressList = ({status}:getDeliveryAddressListProps): Promise<GetDeliveryAddressRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .get(`/delivery_address` + (status? `?status=${status}`:""))
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getDeliveryAddressList;
