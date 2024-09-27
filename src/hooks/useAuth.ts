import { fetchServer } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "@/types/helperTypes";
import { useDispatch } from "react-redux";
import { setToken, removeToken, setVerified } from "@/store";
import { apiRoutes } from "@/utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import User from "@/navigations/routes";
import { useState } from "react";
import { ErrorType } from "@/types/helperTypes";
import { errorMessage } from "@/constants/errorMessage";



const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<ErrorType | null>()
    const { mutate: onLogin, isPending: isLoginPending } = useMutation({
        mutationFn: (data: LoginProps) => {
            return fetchServer({ endpoint: apiRoutes.LOGIN, method: "POST", body: data });
        },
        onSuccess: (data) => {
            setError(null)
            if(data.data){
                dispatch(setToken(data.data));
                navigate(User.DASHBOARD);
            }
        },
        onError: (error: ErrorType) => {
            console.log("error login",error)
            dispatch(removeToken());
            setError(error.message)
        },
    });

    const { mutate: onRegister, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: RegisterProps) => {
            return fetchServer({ endpoint: apiRoutes.REGISTER, method: "POST", body: data });
        },
        onSuccess: (data) => {
            setError(null)
            dispatch(setVerified(true));
            dispatch(setToken(data));
        },
        onError: (error: ErrorType) => {
            dispatch(removeToken());
            console.log("error register",error)
            setError(error.message)
        }
    })

    const onLogout = () => {
        dispatch(removeToken());
        setError(null)
        navigate('/');
    }

    return { onLogin, isLoginPending, onRegister, isRegisterPending, onLogout, error }
};

export default useAuth;