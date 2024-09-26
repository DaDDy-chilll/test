import { fetchServer } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "@/types/helperTypes";
import { useDispatch } from "react-redux";
import { setToken, removeToken, setVerified } from "@/store";
import { apiRoutes } from "@/utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import User from "@/navigations/routes";
import { useState,useRef } from "react";
import { ErrorType } from "@/types/helperTypes";
import { errorMessage } from "@/constants/errorMessage";


// interface errorObjType {
//     toast: boolean,
//     message: string | null
// }



const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<ErrorType | null>()
    const { mutate: onLogin, isPending: isLoginPending } = useMutation({
        mutationFn: (data: LoginProps) => {
            // if (!data.email || !data.password) {
            //     setError({ error: true, message: errorMessage.all_fields_required })
            //     return Promise.reject()
            // }
            return fetchServer({ endpoint: apiRoutes.LOGIN, method: "POST", body: data });
        },
        onSuccess: (data) => {
            setError(null)
            dispatch(setToken(data.data));
            navigate(User.DASHBOARD);
        },
        onError: (error: ErrorType) => {
            console.log("error auth",error)
            dispatch(removeToken());
            setError(error.message)
        },
    });

    const { mutate: onRegister, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: RegisterProps) => {
            if (!data.email || !data.password || !data.confirmPassword) {
                setError({ error: true, message: errorMessage.all_fields_required })
                return Promise.reject()
            }
            if (data.password !== data.confirmPassword) {
                setError({ error: true, message: errorMessage.passwords_match })
                return Promise.reject()
            }
            return fetchServer({ endpoint: apiRoutes.REGISTER, method: "POST", body: data });
        },
        onSuccess: (data) => {
            setError(null)
            dispatch(setVerified(true));
            dispatch(setToken(data));
        },
        onError: (error: ErrorType) => {
            dispatch(removeToken());
            setError({ error: true, message: error.message })
        }



    })

    const onLogout = () => {
        dispatch(removeToken());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("verified");
        setError(null)
        navigate(User.LOGIN);
    }

   console.log("error11111",error)
    return { onLogin, isLoginPending, onRegister, isRegisterPending, onLogout, error }
};

export default useAuth;