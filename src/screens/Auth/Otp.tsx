import React, { useState, useRef, ChangeEvent,useEffect } from "react";
import { jp } from "@/lang/jp";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Routenames from "@/navigations/routes";
import { setToken } from "@/store";
import { useDispatch } from "react-redux"
import usePost from "@/hooks/usePost";
import { QueryKey } from "@/utils/queryKey";
import { apiRoutes } from "@/utils/apiRoutes";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const Otp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { mutate, isPending, isSuccess, error,data } = usePost({});



  

  const handleChange = (
    element: ChangeEvent<HTMLInputElement>,
    index: number
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

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };


  const onSubmit = () => {
    mutate({
      endpoint: apiRoutes.VERIFY_OTP,
      body: { email: user?.email,otp: otp.join("") },
    });
  };


  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken({token:data?.data?.token,email:null}));
      navigate(Routenames.CHANGE_PASSWORD);
    }
  }, [isSuccess,data]);

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
          <div className="flex flex-wrap justify-center gap-y-2 mb-10">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(input) => (inputRefs.current[index] = input)}
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 border-2 rounded bg-white text-center text-xl font-bold focus:outline-none focus:border-blue-500 mx-1"
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-x-2 mr-0 sm:mx-[45px] md:mx-[45px] mb-8">
            <div className="sm:w-1/3 md:w-1/3 w-full">
              <Link to="/forgot_password">
                <button className="mt-6 px-4 py-2 bg-gray-200 rounded w-full border">
                  {jp.back}
                </button>
              </Link>
            </div>
            <div className="sm:w-2/3 md:w-2/3 w-full">
              <Button className="mt-6 px-4 py-2 rounded w-full" onClick={onSubmit} disabled={isPending}>
                {isPending ? <BeatLoader loading={isPending} size={8} color={"#fff"} /> : jp.verify}
              </Button>
            </div>
          </div>
        </motion.div>
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

export default Otp;
