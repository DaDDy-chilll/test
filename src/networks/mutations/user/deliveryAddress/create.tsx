import ApiService from "@/networks/services";
import { DeliveryAddressList } from "@/types/delivery_address/delivery_address_list";

type GetDeliveryAddressRes = {
  status: string;
  message: string;
  code: number;
  data?: DeliveryAddressList;
  errors?: string;
};

type params = {
  family_name: string;
  name: string;
  post_code: string;
  prefecture_id: number | undefined;
  city_ward_town_id: number | undefined;
  address_name: string;
  phone: string;
  main_address: number;
  status: number;
}

const createDeliveryAddress = (req_body : params): Promise<GetDeliveryAddressRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .post(`/delivery_address`, req_body)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default createDeliveryAddress;