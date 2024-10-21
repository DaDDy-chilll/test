import axios from "axios";
import RouteName from "@/navigations/routes";
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
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("urlEndPoint", urlEndPoint);
  try {
    if (method === "GET") {
      const { data } = await api.get(urlEndPoint);
      result = data;
    } else if (method === "POST" && !file && !token) {
      const { data } = await api.post(urlEndPoint, body);
      result = data;
    } else if (method === "POST" && !file) {
      const { data } = await api.post(urlEndPoint, body);
      result = data;
    } else if (method === "POST" && file) {
      const { data } = await api.post(urlEndPoint, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      result = data;
    } else if (method === "PUT" && !file) {
      const { data } = await api.put(urlEndPoint, body);
      result = data;
    } else if (method === "DELETE") {
      const { data } = await api.delete(urlEndPoint);
      result = data;
    }
    return result;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data, status } = error.response;
        // console.log("error-", error.response, data.status, status);
        if (data.status == 400 || status == 400) {
          throw { error: true, message: data.message, status };
        } else if (data.status == 401 || status == 401) {
          localStorage.removeItem("persist:root");
          window.location.href = RouteName.LOGIN;
        } else if (data.status == 500 || status == 500) {
          // console.log("server error----", error.response, data.status, status);
          window.location.href = RouteName.SERVER_ERROR;
        } else {
          throw { error: true, message: data.message, status };
        }
      } else if ((error.code = "ERR_NETWORK")) {
        window.location.href = RouteName.NETWORK_ERROR;
      }
    } else {
      console.log(error);
      throw error;
    }
  }
};
