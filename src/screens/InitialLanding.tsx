import React from "react";
import { LOGO } from "@/assets";
import { Button } from "@/components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RouteName from "@/navigations/routes";
import { useEffect } from "react";
import { jp } from "@/lang/jp";
import { Helmet } from "react-helmet-async";

const textOne = "良いミャンマー人と、";
const textTwo = "優良な日本企業のマッチングサイト";
const textOneDuration = textOne.length * 0.1;

/**
 * InitialLanding component
 * @component
 * @returns {JSX.Element} The InitialLanding component
 * @author PSK
 */
const InitialLanding: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  /**
   * Navigate to login page
   * @author PSK
   */
  const login = () => navigate(RouteName.LOGIN);

  /**
   * Navigate to signup page
   * @author PSK
   */
  const signup = () => navigate(RouteName.REGISTER);

  /**
   * Redirect to dashboard if user is authenticated
   * @author PSK
   * @param {Object} user - The authenticated user
   * @param {string} token - The authentication token
   */
  useEffect(() => {
    if (user && token) navigate(RouteName.DASHBOARD);
  }, [user, token, navigate]);

  return (
    <>
      <Helmet>
        <title>Japan Job</title>
      </Helmet>
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
    </>
  );
};

/**
 * Animation variants for logo
 * @author PSK
 */
const logoVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Animation variants for typing effect of textOne
 * @author PSK
 * @param {number} index - The index of the character
 * @returns {Object} Animation properties
 */
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

/**
 * Animation variants for typing effect of textTwo
 * @author PSK
 * @param {number} index - The index of the character
 * @returns {Object} Animation properties
 */
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

/**
 * Animation variants for buttons
 * @author PSK
 */
const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default InitialLanding;
