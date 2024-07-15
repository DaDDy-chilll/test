import ApiService from "@/networks/services";
//import { CustomerLoginAndSecurity } from "@/types/loginandsecurity/loginandsecurity";
import { updatePayload } from "@/screens/user/security/SecurityScreen";
export type CustomerLoginAndSecurityUpdateRes = {
  status: string;
  message: string;
  code: number;
  data?: updatePayload;
  errors?: updatePayload;
};

const update = (
  payload: updatePayload
): Promise<CustomerLoginAndSecurityUpdateRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .put(`/login-security`, payload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
       reject(err.response.data);
      });
  });
};

export default update;
