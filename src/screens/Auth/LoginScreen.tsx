import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import login, { LoginResponse } from "@/networks/mutations/auth/login";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import logo from "@/assets/fix/logo.png";
import RedirectComponent from "@/components/Auth/RedirectComponent";

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
    <div className="flex h-screen items-center justify-center bg-foreground">
      <div className="flex w-3/5 h-3/4 shadow-md rounded-3xl overflow-hidden">
        <div className="w-full h-full px-20 space-y-8 flex flex-col justify-center items-center bg-white relative">
          <div className="absolute left-7 top-10 flex items-center gap-3">
            <div className="w-12">
              <img src={logo} className="w-full" alt="Japan job logo" />
            </div>
            <h1 className="font-medium">JAPAN JOB</h1>
          </div>
          <div className="text-center">
            <h1 className="main-title text-lg text-black mb-20">Login</h1>
          </div>
          <form className="space-y-12 w-full" onSubmit={handleSubmit}>
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
          </form>
        </div>
        <RedirectComponent title="Lorem ipsum dolor sit amet consectetur. Molestie amet molestie." description="Lorem ipsum dolor sit amet consectetur. Tincidunt adipiscing turpis viverra feugiat pellentesque hac egestas lacus turpis. Amet adipiscing non nulla ut. Vulputate maecenas nunc" register />
      </div>
    </div>
  );
};

export default LoginScreen;
