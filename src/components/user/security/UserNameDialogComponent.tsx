import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { Button, TextField } from "@mui/material";
import { updatePayload } from "@/screens/user/security/SecurityScreen";

interface UserNameDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  updateAction: (payload: updatePayload)=>void;
  editName: string | undefined;
  setEditName: Dispatch<SetStateAction<string | undefined>>;
  nameErr? : string;
  setNameErr: Dispatch<SetStateAction<string>>;

  onClose : ()=>void;
} 

const UserNameDialogComponent = ({
  openDialog,
  setOpenDialog,
  updateAction,
  editName,
  setEditName ,
  nameErr,
  setNameErr,
  onClose
}: UserNameDialogProps) => {
  const onCloseAction = ()=>{
    onClose();
    setOpenDialog(false);
  }

  const updateNameAction =()=>{
    if(editName == ''){
      setNameErr("名前は必須です。")
    }else{
      updateAction({name: editName});
    }
  }
  return (
    <DialogBox open={openDialog} setOpen={onCloseAction}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center pr-6 relative">
          <p className="text-black font-semibold">名前変更</p>
          <div
            onClick={onCloseAction}
            className="absolute top-6 right-6 btn"
          >
            <CloseIcon className="text-black" />
          </div>
        </div>

        <div className="w-full px-6 pb-8 space-y-8">
          <TextField
            value={editName}
            onChange={(event) => {
              setEditName(event.target.value);
            }}
            id="outlined-basic"
            label="名前"
            variant="outlined"
            className="w-full bg-bgcolor"
          />
           {nameErr && <div className="text-red-500">{nameErr}</div>}
          <Button variant="contained" className="w-full" onClick={updateNameAction}>変更</Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(UserNameDialogComponent);
