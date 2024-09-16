import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/fix/logo.png";
import { motion } from "framer-motion";
import { LoginProps } from "@/types/helperTypes";
import useAuth  from "@/hooks/useAuth";
const LoginScreen = () => {
  const { onLogin, isLoginPending } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginProps: LoginProps = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };
    onLogin(loginProps);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex w-1/3 h-5/6 shadow-md ">
        <div className="w-full h-full px-20 space-y-8 flex flex-col justify-center items-center bg-white relative">
          <div className="absolute left-7 top-10 flex items-center gap-3">
            <div className="w-12">
              <img src={logo} className="w-full" alt="Japan job logo" />
            </div>
            <h1 className="font-medium">JAPAN JOB</h1>
          </div>
          <motion.div className="text-center" variants={headerVariants} initial='hidden' animate="visible">
            <h1 className="main-title text-lg text-black mb-10">Login</h1>
          </motion.div>
          <motion.form className="space-y-12 w-full" onSubmit={handleSubmit} variants={formVariants} initial='hidden' animate='visible'>
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
              <Button
                type="submit"
                disabled={isLoginPending}
                className="w-full medium font-medium"
              >
                {isLoginPending ? "Logging in..." : "Login"}
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

export default LoginScreen;
