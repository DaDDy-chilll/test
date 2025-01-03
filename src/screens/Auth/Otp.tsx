/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { jp } from "@/lang/jp";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Routenames from "@/navigations/routes";
import { setToken } from "@/store";
import { useDispatch } from "react-redux";
import usePost from "@/hooks/usePost";
import { apiRoutes } from "@/utils/apiRoutes";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useHandleError from "@/hooks/useHandleError";
import { AuthErrorType } from "@/types/helperTypes";

/**
 * Otp component for handling OTP input and verification
 * @component
 * @returns {JSX.Element} The rendered component
 * @autor PSK
 */
const Otp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { mutate, isPending, isSuccess, error, data } = usePost({});
  const { resetAuthError, otpError, authHandleError } = useHandleError();

  /**
   * Handles change event for OTP input fields
   * @param {ChangeEvent<HTMLInputElement>} element - The change event object
   * @param {number} index - The index of the input field
   * @returns {boolean} False if the input is not a number
   * @autor PSK
   */
  const handleChange = (
    element: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (isNaN(Number(element.target.value))) return false;

    setOtp([
      ...otp.map((d, idx) => (idx === index ? element.target.value : d)),
    ]);

    // Focus next input
    if (element.target.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handles backspace event for OTP input fields
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event object
   * @param {number} index - The index of the input field
   * @autor PSK
   */
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Submits the OTP for verification
   * @autor PSK
   */
  const onSubmit = () => {
    resetAuthError();
    mutate({
      endpoint: apiRoutes.VERIFY_OTP,
      body: { email: user?.email, otp: otp.join("") },
    });
  };

  /**
   * useEffect hook to handle success state
   * @autor PSK
   */
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken({ token: data?.data?.token, email: null }));
      setTimeout(() => {
        navigate(Routenames.CHANGE_PASSWORD);
      }, 500);
    }
  }, [isSuccess, data]);

  /**
   * useEffect hook to handle error state
   * @autor PSK
   */
  useEffect(() => {
    if (error) {
      authHandleError(error?.message as AuthErrorType);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full sm:max-w-md bg-white p-4 rounded-lg">
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
          <h4 className="text-center text-2xl font-bold text-black my-10">
            {jp.enterOtp}
          </h4>
        </motion.div>
        <motion.div variants={formVariants} initial="hidden" animate="visible">
          <div className="flex flex-wrap justify-center gap-y-2 mb-5">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(input) => (inputRefs.current[index] = input)}
                value={data}
                onFocus={() => resetAuthError()}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className={`w-12 h-12 border-2 rounded bg-white text-center text-xl font-bold focus:outline-none focus:border-blue-500 mx-1 ${
                  otpError ? "border-primaryColor" : ""
                } ${isSuccess ? "border-green-500" : ""}`}
              />
            ))}
          </div>
          {otpError && (
            <div className="flex items-center justify-center">
              <p className="text-red-500 text-sm">{otpError}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-x-2 mr-0 sm:mx-[45px] md:mx-[45px] mb-8">
            <div className="sm:w-1/3 md:w-1/3 w-full">
              <Link to="/forgot_password">
                <button className="mt-6 px-4 py-2 bg-gray-200 rounded w-full border">
                  {jp.back}
                </button>
              </Link>
            </div>
            <div className="sm:w-2/3 md:w-2/3 w-full">
              <Button
                className="mt-6 px-4 py-2 rounded w-full"
                onClick={onSubmit}
                disabled={isPending}
              >
                {isPending ? (
                  <BeatLoader loading={isPending} size={8} color={"#fff"} />
                ) : isSuccess ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  jp.verify
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Animation variants for header
 * @autor PSK
 */
const headerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Animation variants for form
 * @autor PSK
 */
const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
};

export default Otp;
