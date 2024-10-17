import React from "react";
import { LOGO } from "@/assets";
// import LOGO from "@/assets/images/LOGO.svg"
import { Button } from "@/components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RouteName from "@/navigations/routes";
import { useEffect } from "react";
import { jp } from "@/lang/jp";
const textOne = "良いミャンマー人と、";
const textTwo = "優良な日本企業のマッチングサイト";
const textOneDuration = textOne.length * 0.1;

const InitialLanding: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const login = () => navigate(RouteName.LOGIN);
  const signup = () => navigate(RouteName.REGISTER);

  useEffect(() => {
    if (user && token) navigate(RouteName.DASHBOARD);
    else navigate(RouteName.INITIAL_LANDING);
  }, [user, token, navigate]);

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="text-center flex items-center justify-center flex-col">
        <motion.div
          className="flex items-center justify-center w-40"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <LOGO />
          {/* <img src={LOGO} alt="LOGO" className="w-full" /> */}
        </motion.div>
        <h1 className="text-2xl my-10 font-semibold">
          <div className="mb-1">
            {textOne.split("").map((element, index) => (
              <motion.span
                className="whitespace-nowrap overflow-hidden roboto-sans"
                key={index}
                variants={typingOneVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {element}
              </motion.span>
            ))}
          </div>

          <div>
            {textTwo.split("").map((element, index) => (
              <motion.span
                className="whitespace-nowrap overflow-hidden roboto-sans"
                key={index}
                variants={typingTwoVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {element}
              </motion.span>
            ))}
          </div>
        </h1>
        <motion.div
          className="flex items-center justify-between w-full "
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Button variant="destructive" className="w-44" onClick={login}>
            {jp.login}
          </Button>
          <Button variant="outline" className="w-44" onClick={signup}>
            {jp.register}
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

//! Animation
const logoVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const typingOneVariants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.02,
    },
  }),
};

const typingTwoVariants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: textOneDuration + index * 0.1,
      duration: 0.02,
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default InitialLanding;