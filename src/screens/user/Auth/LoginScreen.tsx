import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { GlobalProps } from "@/App";
import { LoginErrResponse } from "@/networks/mutations/auth/login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginScreen = ({setIsAdmin,mutations,adminInitFromRoot,changeLoginUserAction}:GlobalProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [showPassword, setShowPassword] = React.useState(false);
  const [error,setError] = React.useState("");
  const [email,setEmail] = React.useState((state && state.email) || "admin@gmail.com");
  const [emailErr,setEmailErr] = React.useState("");
  const [password,setPassword] = React.useState( (state && state.password) || "admin");
  const [passwordErr,setPasswordErr] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const loginAction = ()=>{
  //   mutations.auth.login({mail: email, password })
  //   .then((ans)=>{
  //     console.log(ans);
  //   })
  //   .catch((err: LoginErrResponse)=>{
  //     console.log(err);
  //   })
  // }

  const loginAction = ()=>{
    setError("");
    setEmailErr("");
    setPasswordErr("");
    mutations.auth.login({mail: email, password })
    .then((ans)=>{
      localStorage.setItem("token",ans.token);
      changeLoginUserAction(ans.user);
      // Admin Init
      if( parseInt(ans.user.role) < 3){
        adminInitFromRoot();
        localStorage.setItem("isAdmin","1");
        setIsAdmin(true);
        navigate(RouteName.ADMIN.HOME);
      }else{
        // user init here
        localStorage.setItem("isAdmin","0");
        setIsAdmin(false);
        navigate(RouteName.USER.ACCOUNT);
      }
      
      
    })
    .catch((err: LoginErrResponse)=>{
      console.log(err);
      setError(err.message);
      if(err.errors){
        if(err.errors.mail){
          setEmailErr(err.errors.mail);
        }
        if(err.errors.password){
          setPasswordErr(err.errors.password);
        }
      }
    })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  React.useEffect(()=>{
    // const keydownListener = (e: KeyboardEvent)=>{
    //   if(e.key==="Enter"){
    //     loginAction();
    //   }
    // }
    // window.addEventListener("keydown",keydownListener);

    // return ()=>{
    //   window.removeEventListener("keydown",keydownListener);
    // }
  });

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <div
      >
          <Box sx={style} className="bg-yellow-900">
            {/* Title */}
            <div className="flex felx-row justify-center font-bold text-primary text-[30px] mb-[20px]">
              ログイン
            </div>
            { error && <div className='text-red-500 text-center font-bold mb-[20px]'>{error}</div>}
            {/* Email Text Field */}
            <TextField
              onChange={handleEmailChange}
              value={email}
              id="filled-basic"
              label="Eメール"
              variant="filled"
              className="w-full"
            />
            { emailErr && <div className='text-red-500 text-sm'>{emailErr}</div>}
            {/* Password Field */}
            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                onChange={handlePasswordChange}
                value={password}
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            { passwordErr && <div className='text-red-500 text-sm'>{passwordErr}</div>}
            {/* Forget Password */}
            <div className="flex flex-row items-center text-sm justify-between">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="ログイン情報保存"
              />
              <button onClick={() => navigate(RouteName.USER.FORGOT_PASSWORD)} className="text-blue-500 underline ">
                パスワード忘れた方？
              </button>
            </div>
            {/* Button */}
            <div className="mt-[20px] mb-[30px]">
              <Button
                onClick={loginAction}
                variant="contained"
                className="bg-primary w-full"
              >
                ログイン
              </Button>
            </div>
            <div className="h-[1px] w-full bg-[#f2f2f2]"></div>
            <div className="my-[20px] flex flex-row justify-center">
              <button onClick={() => navigate(RouteName.USER.REGISTER)} className="text-blue-500 underline ">
                アカウント登録？
              </button>
            </div>
          </Box>
      </div>
    </div>
  );
};
export default LoginScreen;
