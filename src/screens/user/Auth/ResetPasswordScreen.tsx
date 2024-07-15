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
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { GlobalProps } from "@/App";

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

const ResetPasswordScreen = ({ }: GlobalProps) => {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState("admin");
  const [confirmPassword, setConfirmPassword] = React.useState("admin");

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const resetPasswordAction = () => {
    if (confirmPassword === newPassword) {
      navigate(RouteName.USER.LOGIN);
    }
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
      <div>
        <Box sx={style} className="bg-yellow-900">
          {/* Title */}
          <div className="flex felx-row justify-center font-bold text-primary text-[30px] mb-[20px]">
            パスワードリセット
          </div>
          {/* New Password Field */}
          <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
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
          {/* Confirm Password Field */}
          <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
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
          {/* Button */}
          <div className="mt-[20px] mb-[30px]">
            <Button
              onClick={resetPasswordAction}
              variant="contained"
              className="bg-primary w-full"
            >
              パスワードリセット
            </Button>
          </div>
          <div className="h-[1px] w-full bg-[#f2f2f2]"></div>
          <div className="my-[20px] flex flex-row justify-center">
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
export default ResetPasswordScreen;
