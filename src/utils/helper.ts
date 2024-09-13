import axios from "axios";
import { FetchServerType } from "../types/helperTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
let result: any;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const token = useSelector((state: RootState) => state.auth.token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const fetchServer  = async ( {url, method, body, file, endpoint}:FetchServerType ) => {
    const {token} = useSelector((state: RootState) => state.auth);
    let urlEndPoint = endpoint + url;
    try {
     
    if(method === "GET") {
        const {data} = await api.get(urlEndPoint,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        result = data;
    }else if(method === "POST" && !file) {
        const {data} = await api.post(urlEndPoint, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
            result = data;
    }else if(method === "POST" && file) {
        const {data} = await api.post(urlEndPoint, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        result = data;
    }
    return result;
    } catch (error:any) {
        if(error.response?.status === 401) {
            localStorage.removeItem("token");
            return {error:true,message:error.response?.data?.message,status:error.response?.status}
        }
    }
};