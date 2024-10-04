import { AuthErrorType } from "@/types/helperTypes";
import { useState } from "react";
const useHandleError = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const authHandleError = (error: AuthErrorType | null) => {
    console.log("hook", error);
    if (error && error?.validation) {
      error.validation.forEach((err: any) => {
        if (err?.email) {
          setEmailError(err?.email?.jp ?? null);
        }
        if (err?.password) {
          setPasswordError(err?.password?.jp ?? null);
        }
        if (err?.confirm_password) {
          setConfirmPasswordError(err?.confirm_password?.jp ?? null);
        }
      });
    } else {
      if (error?.email) {
        setEmailError(error?.email?.jp ?? null);
      }
      if (error?.password) {
        setPasswordError(error?.password?.jp ?? null);
      }
      if (error?.confirm_password) {
        setConfirmPasswordError(error?.confirm_password?.jp ?? null);
      }
    }
  };
  return {
    authHandleError,
    emailError,
    passwordError,
    confirmPasswordError,
    resetAuthError: () => {
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
    },
  };
};

export default useHandleError;
