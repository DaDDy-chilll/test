import { configureAuth } from 'react-query-auth';
import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  UseQueryOptions,
  QueryFunction,
  MutationFunction,
  UseMutationOptions,
} from '@tanstack/react-query';
import {
  getUserProfile,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  AuthResponse,
  logout,
} from './api';
import { AssignmentReturnSharp } from '@mui/icons-material';


export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  name: string;
  password: string;
};

const userKey = ['authenticated-user']

async function handleUserResponse(data: AuthResponse) {
  const { jwt, user } = data;
  window.localStorage.setToken(jwt);
  return user;
}

export const userDataResponse =() => useQuery({ queryKey: userKey, queryFn: getUserProfile});

export const loginResponse = ()=> {
    const queryClient = useQueryClient();
    const setUser = React.useCallback(
        (data : unknown) => queryClient.setQueryData(userKey, data),
        [queryClient]
      );
    const data = useMutation({
        mutationFn: loginWithEmailAndPassword,
        onSuccess: (user) => {
            setUser(user);
          
          },
      })
   

       
}

async function loginFn(data: LoginCredentials) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentials) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });
