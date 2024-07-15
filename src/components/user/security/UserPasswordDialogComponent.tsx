import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updatePayload } from "@/screens/user/security/SecurityScreen";

interface UserPasswordDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  passwordErr: string;
  oldPassword: string;
  newPassword: string;
  newConfirmPassword: string;
  setPasswordErr: Dispatch<SetStateAction<string>>;
  setOldPassword: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setNewConfirmPassword: Dispatch<SetStateAction<string>>;
  updateAction: (payload: updatePayload)=>void;
  onClose: ()=>void;
}

const UserPasswordDialogComponent = ({
  openDialog,
  setOpenDialog,
  passwordErr,
  setPasswordErr,
  oldPassword,
  newPassword,
  newConfirmPassword,
  setOldPassword,
  setNewPassword,
  setNewConfirmPassword,
  updateAction,
  onClose
}: UserPasswordDialogProps) => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =useState<boolean>(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

    const handleMouseDownOldPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const changePasswordAction = ()=>{
    if(newPassword?.length === 0){
      setPasswordErr("新パスワードが必要です！");
    }else if(newPassword !== newConfirmPassword){
      setPasswordErr("新パスワードと新確認パスワードを同じように入力してください！");
    }else if(oldPassword?.length ===0){
      setPasswordErr("古いパスワードを入力してください！");
    }else{
      updateAction({old_password: oldPassword, new_password: newPassword});
    }
  }

  const onCloseAction = ()=>{
    onClose();
    setOpenDialog(false);
  }

  return (
    <DialogBox open={openDialog} setOpen={onCloseAction}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center pr-6 relative">
          <p className="text-black font-semibold">パスワード変更</p>
          <div
            onClick={onCloseAction}
            className="absolute top-6 right-6 btn"
          >
            <CloseIcon className="text-black" />
          </div>
        </div>

        <div className="w-full px-6 pb-8 space-y-8">
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              以前のパスワード
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showOldPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownOldPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              label="パスワード"
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              新しいパスワード
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="パスワード"
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              確認パスワード
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              label="確認パスワード"
            />
          </FormControl>
          <div className="text-red-500">{passwordErr}</div>
          <Button onClick={changePasswordAction} variant="contained" className="w-full">
            変更
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default UserPasswordDialogComponent;
