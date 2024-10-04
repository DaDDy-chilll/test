import axios from "axios";
import { FetchServerType } from "../types/helperTypes";

let result: any;

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const fetchServer = async ({
  endpoint,
  method,
  body,
  file,
  token = null,
}: FetchServerType) => {
  const urlEndPoint = endpoint || "";
  console.log("urlEndPoint", api.defaults.baseURL, urlEndPoint);
  try {
    if (method === "GET") {
      const { data } = await api.get(urlEndPoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      result = data;
    } else if (method === "POST" && !file && !token) {
      const { data } = await api.post(urlEndPoint, body);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      result = data;
    } else if (method === "POST" && !file) {
      const { data } = await api.post(urlEndPoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      result = data;
    } else if (method === "POST" && file) {
      const { data } = await api.post(urlEndPoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      result = data;
    }else if (method === "PUT" && !file) {
      const { data } = await api.put(urlEndPoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      result = data;
    } 
    return result;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data,status } = error.response;
        if (data.status == 400) {
            console.log("error-400", data);
          throw { error: true, message: data.message, status };
        } else if (data.status == 401) {
            localStorage.removeItem("token");
            console.log("error-401", data);
          throw { error: true, message: data.message ,status};
        } else {
          throw { error: true, message: data.message, status};
        }
      }
    } else {
      throw error;
    }
  }
};
