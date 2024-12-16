import axios from "axios";
import RouteName from "@/navigations/routes";
import { FetchServerType } from "../types/helperTypes";
let result: any;

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

/**
 * This function is used to fetch data from the server based on the provided parameters.
 * @author PSK
 * @param {Object} params - The parameters for the fetch request.
 * @param {string} params.endpoint - The endpoint to fetch data from.
 * @param {string} params.method - The HTTP method to use for the request.
 * @param {Object} [params.body] - The body of the request, if applicable.
 * @param {boolean} [params.file] - Indicates if the request includes a file.
 * @param {string} [params.token] - The authorization token, if applicable.
 * @returns {Promise<any>} The result of the fetch request.
 */
export const fetchServer = async ({
  endpoint,
  method,
  body,
  file,
  token = null,
}: FetchServerType) => {
  const urlEndPoint = endpoint || "";
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
        if (data.status == 400 || status == 400) {
          throw { error: true, message: data.message, status };
        } else if (data.status == 401 || status == 401) {
          localStorage.clear();
          window.location.href = RouteName.LOGIN;
        } else if (data.status == 500 || status == 500) {
          window.location.href = RouteName.SERVER_ERROR;
        } else {
          throw { error: true, message: data.message, status };
        }
      } else if ((error.code = "ERR_NETWORK")) {
        window.location.href = RouteName.NETWORK_ERROR;
      }
    } else {
      throw error;
    }
  }
};
