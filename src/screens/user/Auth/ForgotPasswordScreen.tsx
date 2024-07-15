import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

const ForgotPasswordScreen = ({}: GlobalProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("admin@gmail.com");

  const confirmEmailAction = () => {
    if (email === "admin@gmail.com" || email === "user@gmail.com") {
      navigate(RouteName.USER.RESET_PASSWORD);
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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
          {/* Email Text Field */}
          <TextField
            onChange={handleEmailChange}
            value={email}
            id="filled-basic"
            label="Eメール"
            variant="filled"
            className="w-full"
          />
          {/* Button */}
          <div className="mt-[20px] mb-[30px]">
            <Button
              onClick={confirmEmailAction}
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
export default ForgotPasswordScreen;
