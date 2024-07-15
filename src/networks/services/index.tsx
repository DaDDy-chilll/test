import axios from "axios";

const baseURL = import.meta.env.VITE_BASEURL;

const authInstance = axios.create({
  baseURL,
  headers: {
    common: {
      "Content-Type": "application/json"
    }
  },
});

const validateStatus: (status: number) => boolean = (status) => {
  // "401-Unauthorized Redirect to Login"
  // if(status===401){
  //     localStorage.removeItem("isAdmin");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("loginUser");
  //     location.href = "/login";
  // }        
  return status >= 200 && status < 300;
}

const adminInstance = axios.create({
  baseURL: baseURL + "/admin",
  headers: {
    common: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  },
  validateStatus
});

const publicInstance = axios.create({
  baseURL: baseURL + "/pub",
  headers: {
    common: {
      "Content-Type": "application/json",
    }
  }
});

const userInstance = axios.create({
  baseURL: baseURL + "/user",
  headers: {
    common: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  },
  validateStatus
});

// for reactive token when updating
adminInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

userInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const ApiService = {
  auth: {
    post: authInstance.post,
    get: authInstance.get,
  },
  admin: {
    get: adminInstance.get,
    post: adminInstance.post,
    put: adminInstance.put,
    delete: adminInstance.delete,
  },
  user: {
    get: userInstance.get,
    post: userInstance.post,
    put: userInstance.put,
    delete: userInstance.delete,
  },
  pub: {
    get: publicInstance.get,
    post: publicInstance.post,
    put: publicInstance.put,
    delete: publicInstance.delete,
  }
};

export default ApiService;
