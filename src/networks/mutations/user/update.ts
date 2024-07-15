import ApiService from "@/networks/services";

type UpdateUserPasswordRes = {
  status: string;
  message: string;
  code: number;
  data: any;
};

type UpdateUserPasswordProps = {
  userPayload: {
    old_password: string;
    new_password: string;
  };
};

export type UpdateUserPasswordErrRes = {
  code: number;
  status: string;
  message: string;
  errors?: {
    old_password?: string;
    new_password?: string;
  };
};

export const updatePassword = ({
  userPayload,
}: UpdateUserPasswordProps): Promise<UpdateUserPasswordRes> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .post("/password-change", userPayload)
      .then((ans) => {
        resolve(ans.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
