import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { Button, TextField } from "@mui/material";
import { updatePayload } from "@/screens/user/security/SecurityScreen";
interface UserPhoneNumberDialogProps {
  editPhone: string | undefined;
  setEditPhone :Dispatch<SetStateAction<string | undefined>>;
  phoneErr: string;
  setPhoneErr :Dispatch<SetStateAction<string >>;
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  updateAction: (payload: updatePayload)=>void;
  onClose : ()=>void;
}

const UserPhoneNumberDialogComponent = ({
  editPhone,
  setEditPhone,
  phoneErr,
  setPhoneErr,
  openDialog,
  setOpenDialog,
  updateAction,
  onClose
}: UserPhoneNumberDialogProps) => {
  const onCloseAction = ()=>{
    onClose();
    setOpenDialog(false);
  }
  const updatePhoneAction =()=>{
    if(editPhone == ''){
      setPhoneErr("番号が必要です。")
    }else{
      updateAction({phone: editPhone});
    }
  }

  
  return (
    <DialogBox open={openDialog} setOpen={onCloseAction}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center pr-6 relative">
          <p className="text-black font-semibold">電話番号変更</p>
          <div
            onClick={onCloseAction}
            className="absolute top-6 right-6 btn"
          >
            <CloseIcon className="text-black" />
          </div>
        </div>

        <div className="w-full px-6 pb-8 space-y-8">
          <TextField
            value={editPhone}
            onChange={(event) => {
              setEditPhone(event.target.value);
            }}
            id="outlined-basic"
            label="電話番号"
            variant="outlined"
            className="w-full bg-bgcolor"
          />
          {phoneErr && <div className="text-red-500">{phoneErr}</div>}
          <Button variant="contained" className="w-full"  onClick={updatePhoneAction}>変更</Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(UserPhoneNumberDialogComponent);
