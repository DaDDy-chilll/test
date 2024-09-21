// import { useMutation } from "@tanstack/react-query";
import { FormEvent,useEffect } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { RegisterProps } from "@/types/helperTypes";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes"; 
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const RegisterScreen = () => {
const {onRegister,isRegisterPending,error} = useAuth();
const { user, token } = useSelector((state: RootState) => state.auth);
const navigate = useNavigate();

useEffect(() => {
  if(user && token){
    navigate(RouteName.DASHBOARD);
  }
},[user,token])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registerProps: RegisterProps = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    onRegister(registerProps);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex  w-1/3 h-5/6 shadow-md">
        <div className="w-full h-full px-20 flex flex-col justify-center items-center bg-white relative">
          <div className="absolute left-7 top-10 flex items-center gap-3">
            <div className="w-12">
              <img src={logo} className="w-full" alt="Japan job logo" />
            </div>
            <h1 className="font-medium">JAPAN JOB</h1>
          </div>
          <motion.div className="text-center" variants={headerVariants} initial='hidden' animate='visible'>
            <h1 className="main-title text-lg text-black my-10">Register</h1>
          </motion.div>
          <motion.form className="space-y-10 w-full" onSubmit={handleSubmit} variants={formVariants} initial='hidden' animate='visible'>
            <div>
              <Input
                name="email"
                type="email"
                label="Email"
                className="mt-1 block w-full"
                required={false}
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                label="Password"
                className="mt-1 block w-full"
                required={false}
              />
            </div>
            <div>
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className="mt-1 block w-full"
                required={false}
                error={!error.toast && error.message || ''}
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={false}
                className="w-full medium font-medium"
              >
                {isRegisterPending ? <BeatLoader loading={isRegisterPending} size={8} color={"#fff"} />: "Register"}
              </Button>
            </div>
          </motion.form>
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
  hidden:{opacity:0},
  visible:{opacity:1,transition:{delay:.2}}
}
export default RegisterScreen;
