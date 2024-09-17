import { fetchServer } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "@/types/helperTypes";
import { useDispatch } from "react-redux";
import { setToken, removeToken } from "@/store/features/AuthSlice";
import { apiRoutes } from "@/utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import User from "@/navigations/routes";
import { useState } from "react";
import { ErrorType } from "@/types/helperTypes";
import { errorMessage } from "@/constants/errorMessage";


interface errorObjType {
    toast: boolean,
    message: string | null
}

const errorObj: errorObjType = {
    toast: false,
    message: null
}

const useAuth = () => {
    const [error, setError] = useState<errorObjType>(errorObj)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate: onLogin, isPending: isLoginPending } = useMutation({
        mutationFn: (data: LoginProps) => {
            if (!data.email || !data.password) {
                setError({ toast: true, message: errorMessage.all_fields_required })
                return Promise.reject()
            };
            return fetchServer({ endpoint: apiRoutes.LOGIN, method: "POST", body: data });
        },
        onSuccess: (data) => {
            dispatch(setToken(data));
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate(User.DASHBOARD);
        },
        onError: (error: ErrorType) => {
            setError({ toast: false, message: error.message })
        },
    });

    const { mutate: onRegister, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: RegisterProps) => {
            if (!data.email || !data.password || !data.confirmPassword) {
                setError({ toast: true, message: errorMessage.all_fields_required })
                return Promise.reject()
            };
            if (data.password !== data.confirmPassword) {
                setError({ toast: false, message: errorMessage.passwords_match })
                return Promise.reject()
            };
            return fetchServer({ endpoint: apiRoutes.REGISTER, method: "POST", body: data });
        },
        onSuccess: (data) => {
            dispatch(setToken(data));
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate(User.DASHBOARD);
        },
        onError: (error: ErrorType) => {
            setError({ toast: false, message: error.message })
        },
    })

    const onLogout = () => {
        dispatch(removeToken());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setError({ toast: false, message: null })
        navigate(User.LOGIN);
    }


    return { onLogin, isLoginPending, onRegister, isRegisterPending, onLogout, error }
};

export default useAuth;