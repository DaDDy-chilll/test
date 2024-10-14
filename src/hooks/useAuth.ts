import { fetchServer } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "@/types/helperTypes";
import { useDispatch } from "react-redux";
import { setToken, removeToken, setForgotPassword, setVerified } from "@/store";
import { apiRoutes } from "@/utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { useState } from "react";
import { ErrorType } from "@/types/helperTypes";

import { setName } from "@/store";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorType | null>();
  const { mutate: onLogin, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginProps) => {
      return fetchServer({
        endpoint: apiRoutes.LOGIN,
        method: "POST",
        body: data,
      });
    },
    onSuccess: (data) => {
      setError(null);
      if (data.data) {
        dispatch(setToken(data.data));
        if (data.data.name) {
          dispatch(setVerified(true));
          dispatch(setName(data.data.name));
        } else {
          dispatch(setVerified(false));
        }
        dispatch(setForgotPassword(false));
        navigate(RouteName.DASHBOARD);
      }
    },
    onError: (error: ErrorType) => {
      dispatch(removeToken());
      setError(error.message);
    },
  });

  const { mutate: onRegister, isPending: isRegisterPending } = useMutation({
    mutationFn: (data: RegisterProps) => {
      return fetchServer({
        endpoint: apiRoutes.REGISTER,
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      setError(null);
      dispatch(setForgotPassword(false));
      dispatch(setVerified(false));
      navigate(RouteName.VERIFICATION);
    },
    onError: (error: ErrorType) => {
      dispatch(removeToken());
      setError(error.message);
    },
  });

  const onLogout = () => {
    localStorage.removeItem("isCompletedProfile");
    dispatch(removeToken());
    dispatch(setName(""));
    setError(null);
    navigate("/");
  };

  return {
    onLogin,
    isLoginPending,
    onRegister,
    isRegisterPending,
    onLogout,
    error,
  };
};

export default useAuth;
