import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import login, { LoginResponse } from "@/networks/mutations/auth/login";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/fix/logo.png";
import { motion } from "framer-motion";

const LoginScreen = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<LoginResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      return login({ email, password });
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.user);
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
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
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                label="Password"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full medium font-medium"
              >
                {mutation.isPending ? "Logging in..." : "Login"}
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
