import { fetchServer } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "@/types/helperTypes";
import { useDispatch } from "react-redux";
import { setToken, removeToken,setForgotPassword,setVerified } from "@/store";
import { apiRoutes } from "@/utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { useState } from "react";
import { ErrorType } from "@/types/helperTypes";
import { errorMessage } from "@/constants/errorMessage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { setName } from "@/store";


const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { verified } = useSelector((state: RootState) => state.auth);
    const [error, setError] = useState<ErrorType | null>()
    const { mutate: onLogin, isPending: isLoginPending } = useMutation({
        mutationFn: (data: LoginProps) => {
            return fetchServer({ endpoint: apiRoutes.LOGIN, method: "POST", body: data });
        },
        onSuccess: (data) => {
            setError(null)
            if (data.data) {
                dispatch(setToken(data.data));
                dispatch(setName(data.data.name || data.data.email));
                dispatch(setForgotPassword(false));
                    navigate(RouteName.DASHBOARD);
            }
        },
        onError: (error: ErrorType) => {
            console.log("error login", error)
            dispatch(removeToken());
            setError(error.message)
        },
    });

    const { mutate: onRegister, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: RegisterProps) => {
            return fetchServer({ endpoint: apiRoutes.REGISTER, method: "POST", body: data });
        },
        onSuccess: () => {
            setError(null);
            dispatch(setForgotPassword(false));
            dispatch(setVerified(false));
            navigate(RouteName.VERIFICATION);
        },
        onError: (error: ErrorType) => {
            dispatch(removeToken());
            console.log("error register", error)
            setError(error.message)
        }
    })

    const onLogout = () => {
        dispatch(removeToken());
        dispatch(setName(''))
        setError(null)
        navigate('/');
    }

    return { onLogin, isLoginPending, onRegister, isRegisterPending, onLogout, error }
};

export default useAuth;