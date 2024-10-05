import React, { useState, useEffect } from "react";
import { jp } from "@/lang/jp";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import RouteName from "@/navigations/routes";
import { Link } from "react-router-dom";
import logo from "@/assets/icons/logo.svg";
import eyeOpen from "@/assets/icons/eye-open.svg";
import eyeClose from "@/assets/icons/eye-close.svg";
import { motion } from "framer-motion";
import Alert from "@/components/ui/alert";
import usePost from "@/hooks/usePost";
import { QueryKey } from "@/utils/queryKey";
import { apiRoutes } from "@/utils/apiRoutes";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/store";

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();
  const {token} = useSelector((state:RootState)=>state.auth)
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, error, data } = usePost({token});

  const showSuccessAlert = () => (
    <Alert
      type="success"
      title="Password changed successfully"
      description="You will be redirected to the login page"
    />
  );

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newPassword !== confirmNewPassword) {
  //     setError("New passwords do not match");
  //     return;
  //   }
  //   Add logic to handle password change
  //   setSuccess(true);
  //   setTimeout(() => {
  //     navigate(RouteName.LOGIN);
  //   }, 2000);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const confirm_password = formData.get("confirm_password") as string;
    const password = formData.get("password") as string;
    mutate({
      endpoint: apiRoutes.CHANGE_PASSWORD,
      body: {
        confirm_password,
        password,
      },
    });
  };


  useEffect(() => {
    console.log(data,token);
    if (isSuccess) {
      dispatch(setToken({token:null}));
      setTimeout(() => {
        navigate(RouteName.LOGIN);
      }, 2000);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-md">
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
            {jp.resetPassword}
          </h4>
        </motion.div>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="relative">
              <Input
                name="password"
                type={showNewPassword ? "text" : "password"}
                label={jp.newPassword}
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
                className="mt-1 block w-full"
                required={false}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <img
                  src={showNewPassword ? eyeOpen : eyeClose}
                  className="w-5 h-5 opacity-50 hover:opacity-100"
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
          <div className="relative">
            <Input
              name="confirm_password"
              type={showConfirmNewPassword ? "text" : "password"}
              label={jp.confirmPassword}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 block w-full"
              required={false}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              <img
                src={showConfirmNewPassword ? eyeOpen : eyeClose}
                className="w-5 h-5 opacity-50 hover:opacity-100"
                alt="Toggle password visibility"
              />
            </button>
          </div>
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          <div className="flex flex-col sm:flex-row justify-center gap-x-2 pb-2">
            <div className="sm:w-1/3 md:w-1/3 w-full">
              <Link to="/otp">
                <button className="mt-6 px-4 py-2 bg-gray-200 rounded w-full border">
                  {jp.back}
                </button>
              </Link>
            </div>
            <div className="sm:w-2/3 md:w-2/3 w-full">
              <Button className="mt-6 px-4 py-2 rounded w-full" disabled={isPending}>
              {isPending ? <BeatLoader loading={isPending} size={8} color={"#fff"} /> : jp.changePassword}
              </Button>
            </div>
          </div>
        </motion.form>
        {(isSuccess && !error) && showSuccessAlert()}
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

export default ChangePassword;
