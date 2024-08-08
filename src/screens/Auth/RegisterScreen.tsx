import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import registerUser, { RegisterResponse } from "@/networks/mutations/auth/register";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/fix/logo.png";
import RedirectComponent from "@/components/Auth/RedirectComponent";

const RegisterScreen = () => {
  const mutation = useMutation<RegisterResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const companyName = formData.get("companyName") as string;
      const companyType = formData.get("companyType") as string;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      return registerUser({ email, password, companyName, companyType });
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      // Handle successful registration (e.g., redirect to login or show a success message)
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-foreground">
      <div className="flex w-3/5 h-3/4 shadow-md rounded-3xl overflow-hidden">
        <RedirectComponent
          title="Lorem ipsum dolor sit amet consectetur. Molestie amet molestie."
          description="Lorem ipsum dolor sit amet consectetur. Tincidunt adipiscing turpis viverra feugiat pellentesque hac egestas lacus turpis. Amet adipiscing non nulla ut. Vulputate maecenas nunc"
          logIn
        />
        <div className="w-full h-full px-20 flex flex-col justify-center items-center bg-white relative">
          <div className="absolute left-7 top-10 flex items-center gap-3">
            <div className="w-12">
              <img src={logo} className="w-full" alt="Japan job logo" />
            </div>
            <h1 className="font-medium">JAPAN JOB</h1>
          </div>
          <div className="text-center">
            <h1 className="main-title text-lg text-black mb-20">Register</h1>
          </div>
          <form className="space-y-10 w-full" onSubmit={handleSubmit}>
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
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Input
                name="companyName"
                type="text"
                label="Company Name"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Input
                name="companyType"
                type="text"
                label="Company Type"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full medium font-medium"
              >
                {mutation.isPending ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
