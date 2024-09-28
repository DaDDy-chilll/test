import { FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";
import { LoginProps, AuthErrorType } from "@/types/helperTypes";
import useAuth from "@/hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { NavLink, useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useHandleError from "@/hooks/useHandleError";
import { jp } from "@/lang/jp";
const LoginScreen = () => {
  const { onLogin, isLoginPending, error } = useAuth();
  const { authHandleError, emailError, passwordError, resetAuthError } =
    useHandleError();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAuthError();
    const formData = new FormData(e.currentTarget);
    const loginProps: LoginProps = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    onLogin(loginProps);
  };

  useEffect(() => {
    if (user && token) navigate(RouteName.DASHBOARD);
  }, [user, token]);

  useEffect(() => {
    if (error) authHandleError(error as AuthErrorType);

  }, [error]);

  return (
    <div className="bg-gray-200">
      <div className="h-screen flex justify-center items-center">
        <div className="w-full sm:max-w-md bg-white rounded-xl p-8">
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center gap-3">
              <div className="w-12">
                <img src={logo} className="w-full" alt="Japan job logo" />
              </div>
              <h1 className="font-medium">JAPAN JOB</h1>
            </div>
            <motion.div
              className="text-center"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              <h4 className="text-center text-2xl font-bold text-black my-10">{jp.login}</h4>
            </motion.div>
            <motion.form
              className="space-y-8 w-full"
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <div >
                <Input
                  name="email"
                  type="email"
                  label={jp.email}
                  className="mt-1 block w-full"
                  required={false}
                  error={!!emailError ? emailError : ""}
                />
              </div>
              <div >
                <Input
                  name="password"
                  type="password"
                  label={jp.password} 
                  className="mt-1 block w-full"
                  required={false}
                  error={!!passwordError ? passwordError : ""}
                />
                <div className="flex justify-end">
                  <NavLink
                    to={RouteName.FORGOT_PASSWORD}
                    className="text-xs text-end  text-gray-500"
                  >
                    {jp.forgotPassword}
                  </NavLink>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={false}
                  className="w-full medium font-medium"
                >
                  {isLoginPending ? (
                    <BeatLoader
                      loading={isLoginPending}
                      size={8}
                      color={"#fff"}
                    />
                  ) : (
                    jp.login
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
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

export default LoginScreen;
