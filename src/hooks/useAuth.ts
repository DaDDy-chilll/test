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
import { useQueryClient } from "@tanstack/react-query";

import { setName } from "@/store";

/**
 * Custom hook for authentication related operations.
 * @returns {object} - Contains functions and states for authentication.
 * @author PSK
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<ErrorType | null>();

  /**
   * Mutation for handling login.
   * @param {LoginProps} data - The login data.
   * @returns {void}
   * @author PSK
   */
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

  /**
   * Mutation for handling registration.
   * @param {RegisterProps} data - The registration data.
   * @returns {void}
   * @author PSK
   */
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

  /**
   * Function to handle logout.
   * @returns {void}
   * @author PSK
   */
  const onLogout = () => {
    localStorage.removeItem("isCompletedProfile");
    dispatch(removeToken());
    dispatch(setName(""));
    setError(null);
    queryClient.clear();
    navigate(RouteName.INITIAL_LANDING);
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
