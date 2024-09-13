export type FetchServerType =  {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  file?: boolean;
  endpoint?: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};