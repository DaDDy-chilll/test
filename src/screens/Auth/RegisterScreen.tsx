// import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
// import registerUser, { RegisterResponse } from "@/networks/mutations/auth/register";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/fix/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const RegisterScreen = () => {
const navigate = useNavigate()

  // const mutation = useMutation<RegisterResponse, Error, FormData>({
  //   mutationFn: async (formData) => {
  //     const email = formData.get("email") as string;
  //     const password = formData.get("password") as string;
  //     const confirmPassword = formData.get("confirmPassword") as string;

  //     if (password !== confirmPassword) {
  //       throw new Error("Passwords do not match");
  //     }

  //     return registerUser({ email, password });
  //   },
  //   onSuccess: (data) => {
  //     console.log("Registration successful:", data);
  //     // Handle successful registration (e.g., redirect to login or show a success message)
  //   },
  //   onError: (error) => {
  //     console.error("Registration failed:", error);
  //   },
  // });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/form")
    // const formData = new FormData(e.currentTarget);
    // mutation.mutate(formData);
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
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={false}
                className="w-full medium font-medium"
              >
                {false ? "Registering..." : "Register"}
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
