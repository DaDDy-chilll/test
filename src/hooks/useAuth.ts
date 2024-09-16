import { fetchServer } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "@/types/helperTypes";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/AuthSlice";
import { apiRoutes } from "@/utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import  User  from "@/navigations/routes";


const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate: onLogin, isPending: isLoginPending } = useMutation({
        mutationFn: (data: LoginProps) => {
            if (!data.email || !data.password) return Promise.reject("Email and Password is required");
            return fetchServer({ endpoint: apiRoutes.LOGIN, method: "POST", body: data });
        },
        onSuccess: (data) => {
            dispatch(setToken(data.token));
            localStorage.setItem("token", data.token);
            navigate(User.DASHBOARD);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { mutate: onRegister, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: RegisterProps) => {
            if (!data.name || !data.email || !data.password || !data.confirmPassword) return Promise.reject("All fields are required");
            return fetchServer({ endpoint: apiRoutes.REGISTER, method: "POST", body: data });
        },
        onSuccess: (data) => {
            dispatch(setToken(data.token));
            localStorage.setItem("token", data.token);
            navigate(User.DASHBOARD);
        },
        onError: (error) => {
            console.log(error);
        },
    })




    return { onLogin, isLoginPending, onRegister, isRegisterPending }
};

export default useAuth;