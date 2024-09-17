export type FetchServerType =  {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  file?: boolean | null;
  endpoint?: string;
  token?: string | null;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ErrorType = {
  error: boolean;
  message: string ;
  status: number ;
}