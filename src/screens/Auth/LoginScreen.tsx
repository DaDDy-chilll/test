import { FormEvent, useEffect } from "react";
import { Button, Input } from "@/components";
import logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";
import { LoginProps, AuthErrorType } from "@/types/helperTypes";
import useAuth from "@/hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import useHandleError from "@/hooks/useHandleError";
import { jp } from "@/lang/jp";
import { setForgotPassword } from "@/store";
import { Helmet } from "react-helmet-async";

/**
 * LoginScreen component handles the login functionality and UI.
 * @component
 * @returns {JSX.Element} The rendered component.
 * @autor PSK
 */
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onLogin, isLoginPending, error } = useAuth();
  const { authHandleError, emailError, passwordError, resetAuthError } =
    useHandleError();
  const { user, token } = useSelector((state: RootState) => state.auth);

  /**
   * Handles the form submission for login.
   * @param {FormEvent<HTMLFormElement>} e - The form event.
   * @autor PSK
   */
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

  /**
   * useEffect hook to navigate user based on authentication status.
   * @autor PSK
   */
  useEffect(() => {
    if (user && token) {
      if (!localStorage.getItem("isCompletedProfile")) {
        navigate(RouteName.PROFILE_FORM);
      } else {
        navigate(RouteName.DASHBOARD);
      }
    }
  }, [user, token, navigate]);

  /**
   * useEffect hook to handle authentication errors.
   * @autor PSK
   */
  useEffect(() => {
    if (error) authHandleError(error as AuthErrorType);
  }, [error, authHandleError]);

  /**
   * Handles the forgot password functionality.
   * @autor PSK
   */
  const handleForgotPassword = () => {
    dispatch(setForgotPassword(true));
    navigate(RouteName.FORGOT_PASSWORD);
  };

  return (
    <>
      <Helmet>
        <title>{jp.login} - Japan Job</title>
      </Helmet>
      <div className="bg-gray-200">
        <div className="h-screen flex justify-center items-center">
          <div className="w-full sm:max-w-md bg-white rounded-xl p-8">
            <div className="bg-white rounded-xl p-8">
              <header>
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
                  <h2 className="text-center text-2xl font-bold text-black my-10">
                    {jp.login}
                  </h2>
                </motion.div>
              </header>
              <main>
                <motion.form
                  className="space-y-8 w-full"
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
                      error={!!emailError ? emailError : ""}
                    />
                  </div>
                  <Input
                    name="password"
                    type="password"
                    label={jp.password}
                    className="mt-1 block w-full"
                    required={false}
                    error={!!passwordError ? passwordError : ""}
                  />
                  <div className="flex justify-end">
                    <div
                      onClick={handleForgotPassword}
                      className="text-xs text-end  text-gray-500 cursor-pointer"
                    >
                      {jp.forgotPassword}
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Animation variants for the header.
 * @autor PSK
 */
const headerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Animation variants for the form.
 * @autor PSK
 */
const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
};

export default LoginScreen;
