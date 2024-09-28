import logo from "@/assets/icons/logo.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import { jp } from "@/lang/jp";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
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
            {jp.forgotPassword}
          </h4>
        </motion.div>
        <motion.form
          className="space-y-8 w-full"
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
            />
          </div>
          <Button type="submit" className="w-full p-2 rounded-md">
            {jp.resetPassword}
          </Button>

          <h1 className="text-sm text-gray-900 mt-4 pb-6">
            {jp.goBackTo}{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:text-blue-600"
            >
              {jp.login}
            </Link>{" "}
            {jp.page}
          </h1>
        </motion.form>
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

export default ForgotPassword;
