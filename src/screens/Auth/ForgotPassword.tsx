import logo from "@/assets/icons/logo.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import { jp } from "@/lang/jp";
import { Button } from "@/components/ui/button";
import usePost from "@/hooks/usePost";
import { QueryKey } from "@/utils/queryKey";
import { apiRoutes } from "@/utils/apiRoutes";
import { BeatLoader } from "react-spinners";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Routenames from "@/navigations/routes";
import { setToken } from "@/store";
import { useDispatch } from "react-redux"
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, error } = usePost({});

  const onSubmit = () => {
    mutate({
      endpoint: apiRoutes.FORGOT_PASSWORD,
      body: { email },
    });
  };
  useEffect(() => {
    if (isSuccess) {
   
      dispatch(setToken({ token: null, email  }));
      navigate(Routenames.OTP);
    }
  }, [isSuccess]);

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
        <motion.div
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            onClick={onSubmit}
            className="w-full p-2 rounded-md"
            disabled={isPending}
          >
            {isPending ? (
              <BeatLoader loading={isPending} size={8} color={"#fff"} />
            ) : (
              jp.resetPassword
            )}
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

export default ForgotPassword;
