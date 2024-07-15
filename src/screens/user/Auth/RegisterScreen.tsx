import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import mutations from "@/networks/mutations";
import { registerErrResponse } from "@/networks/mutations/auth/register";
import { TextField } from "@mui/material";
import logo from "@/assets/icons/user/logo2 2.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegisterScreen = ({ }: GlobalProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userNameErr, setUserNameErr] = React.useState<string>("");
  const [emailErr, setEmailErr] = React.useState<string>("");
  const [passwordErr, setPasswordErr] = React.useState<string>("");
  const [comfirmPasswordErr, setComfirmPasswordErr] = React.useState<string>("");
  const [commonErr, setCommonErr] = React.useState<string>("");
  const [isChecked, setIsChecked] = React.useState(true);

  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };
  // const handleNavigate = () => {
  //   if (isChecked) {
  //     console.log("checkkkkkk")
  //     navigate(RouteName.USER.LOGIN);
  //   } else {
  //     setCheckErr("please check");
  //     console.log('Checkbox must be checked to navigate.');

  //   }
  // };
  const registerAction = () => {
    if (newPassword != confirmPassword) {
      setComfirmPasswordErr("新しいパスワードともう一度パスワードが間違っています。");
      setPasswordErr("新しいパスワードともう一度パスワードが間違っています。");
      return;
    }
    if(!isChecked){
      setCommonErr("「個人情報扱いを同意する」をチェエクする");
      return;
    }
    setCommonErr("");
    setUserNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setComfirmPasswordErr("");
    mutations.auth.register({ mail: email, password: newPassword, user_name: userName })
      .then((ans) => {
        console.log(isChecked);
        console.log(ans);
        navigate(RouteName.USER.LOGIN, {
          state: {
            email: ans.data.mail, password: newPassword
          }
        })
      })
      .catch((err: registerErrResponse) => {
        if (err.message) {
          setCommonErr(err.message);
        }
        if (err.errors) {
          if (err.errors.mail) {
            setEmailErr(err.errors.mail);
          }
          if (err.errors.password) {
            setPasswordErr(err.errors.password);
            setComfirmPasswordErr(err.errors.password);
          }
          if (err.errors.user_name) {
            setUserNameErr(err.errors.user_name);
          }

        }
      })
    // if (
    //   userName === "Kyaw Win Thu" &&
    //   email === "admin@gmail.com" &&
    //   newPassword === "admin" &&
    //   confirmPassword === "admin"
    // ) {
    //   localStorage.setItem("isAdmin", "1");
    //   setIsAdmin(true);
    //   // setIsUser(false);
    //   navigate(RouteName.ADMIN.HOME);
    // } else if ( 
    //   userName === "User" &&
    //   email === "user@gmail.com" &&
    //   newPassword === "user" &&
    //   confirmPassword === "user"
    // ) {
    //   localStorage.setItem("isAdmin", "2");
    //   localStorage.setItem("user", "user");
    //   setIsAdmin(false);
    //   // setIsUser(true);
    //   navigate(RouteName.USER.ACCOUNT);
    // }
  };
  React.useEffect(() => {
    // const keydownListener = (e: KeyboardEvent) => {
    //   if (e.key === "Enter") {
    //     registerAction();
    //   }
    // }
    // window.addEventListener("keydown", keydownListener);

    // return () => {
    //   window.removeEventListener("keydown", keydownListener);
    // }
  });

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleMouseDownNewPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div> 
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <div className="flex flex-row justify-center mt-[50px] ">
        <img src={logo}/>
      </div>
      <div>
        <Box sx={style} className="bg-yellow-900 mt-[100px]">
          {/* Title */}
          <div className="flex felx-row justify-center font-bold text-primary text-[30px] mb-[10px]">
            アカウント作成
          </div>
          {commonErr && <div className="text-red-500 pb-1">{commonErr}</div>}
          {/* Email Text Field */}
          <TextField
              onChange={handleUserNameChange}
              value={userName}
              id="filled-basic"
              label="名前"
              variant="filled"
              className="w-full"
            />
            { userNameErr && <div className='text-red-500 text-sm pt-1'>{userNameErr}</div>}
            {/* <InputBoxComponent
              onChange={handleUserNameChange}
              value={userName}
              multiline={2}
              error={userNameErr}
              label="名前"
            /> */}
          <SizeBox h={15} />
          {/* Email Text Field */}
            {/* <InputBoxComponent
              onChange={handleEmailChange}
              value={email}
              multiline={2}
              error={emailErr}
              label="Eメール"
            /> */}
             <TextField
              onChange={handleEmailChange}
              value={email}
              id="filled-basic"
              label="Eメール"
              variant="filled"
              className="w-full"
            />
            { emailErr && <div className='text-red-500 text-sm pt-1'>{emailErr}</div>}
          <SizeBox h={15} />
          {/* New Password Field */}
          <FormControl sx={{ my: 1, width: "100%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              新しいパスワード
            </InputLabel>
            <FilledInput
              onChange={handleNewPasswordChange}
              value={newPassword}
              id="filled-adornment-password"
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {passwordErr && <div className="text-red-500">{passwordErr}</div>}
          {/* Confirm Password Field */}
          <FormControl sx={{ my: 1, width: "100%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              もう一度パスワードを入力してください
            </InputLabel>
            <FilledInput
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              id="filled-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {comfirmPasswordErr && <div className="text-red-500">{comfirmPasswordErr}</div>}
          {/* Forget Password */}
          <div className="flex flex-row items-center text-sm">
            <FormControlLabel
              control={<Checkbox checked={isChecked} />}
              onChange={handleCheckboxChange}
              label={
                <p>
                  <span className="text-textBlue">個人情報</span>扱いを同意する
                </p>
              }
            />
          </div>
          {/* Button */}
          <div className="mt-[10px] mb-[5px]">
            <Button
              onClick={registerAction}
              variant="contained"
              className="bg-primary w-full"
            >
              作成
            </Button>
          </div>
          <div className="h-[1px] w-full bg-[#f2f2f2]"></div>
          <div className="my-[2px] flex flex-row justify-center">
            <button
              onClick={() => navigate(RouteName.USER.LOGIN)}
              className="text-blue-500 underline "
            >
              ログインへ？
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};
export default RegisterScreen;
