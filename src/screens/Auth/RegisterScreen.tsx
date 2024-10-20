// import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect } from "react";

import { Button, Input } from "@/components";
import logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { RegisterProps, AuthErrorType } from "@/types/helperTypes";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { jp } from "@/lang/jp";
import useHandleError from "@/hooks/useHandleError";
import { Helmet } from "react-helmet-async";
const RegisterScreen = () => {
  const { onRegister, isRegisterPending, error } = useAuth();
  const {
    emailError,
    passwordError,
    confirmPasswordError,
    authHandleError,
    resetAuthError,
  } = useHandleError();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) navigate(RouteName.DASHBOARD);
  }, [user, token, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAuthError();
    const formData = new FormData(e.currentTarget);
    const registerProps: RegisterProps = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirmPassword") as string,
    };
    onRegister(registerProps);
  };

  useEffect(() => {
    if (error) authHandleError(error as AuthErrorType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <Helmet>
        <title>{jp.register} - Japan Job</title>
      </Helmet>
      <main className="bg-gray-200">
        <div className="h-screen flex justify-center items-center">
          <div className="w-full sm:max-w-md bg-white rounded-xl p-8">
            <div className="bg-white rounded-xl p-8">
              <div className="flex justify-start">
                <div className="w-12">
                  <img src={logo} className="w-full" alt="Japan job logo" />
                </div>
                <h1 className="font-medium relative left-2 top-2.5">
                  JAPAN JOB
                </h1>
              </div>
              <motion.div
                className="text-center"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="main-title text-lg text-black my-10">
                  {jp.register}
                </h1>
              </motion.div>
              <motion.form
                className="space-y-10 w-full"
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <Input
                    name="email"
                    type="email"
                    label={jp.email}
                    className="mt-1 block w-full"
                    required={false}
                    error={emailError ?? ""}
                  />
                </div>
                <div>
                  <Input
                    name="password"
                    type="password"
                    label={jp.password}
                    className="mt-1 block w-full"
                    required={false}
                    error={passwordError ?? ""}
                  />
                </div>
                <div>
                  <Input
                    name="confirmPassword"
                    type="password"
                    label={jp.confirmPassword}
                    className="mt-1 block w-full"
                    required={false}
                    error={confirmPasswordError ?? ""}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={false}
                    className="w-full medium font-medium"
                  >
                    {isRegisterPending ? (
                      <BeatLoader
                        loading={isRegisterPending}
                        size={8}
                        color={"#fff"}
                      />
                    ) : (
                      jp.register
                    )}
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const headerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
};
export default RegisterScreen;
