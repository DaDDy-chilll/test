import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import { updatePayload } from "@/screens/user/security/SecurityScreen";


interface UserMailAddressDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  updateAction: (payload: updatePayload)=>void;
  editMail : string | undefined;
  setEditMail : Dispatch<SetStateAction<string | undefined>>;
  mailErr?: string;
  setMailErr : Dispatch<SetStateAction<string >>;
  onClose: ()=>void;
}

const UserMailAddressDialogComponent = ({
  openDialog,
  setOpenDialog,
  updateAction,
  editMail,
  setEditMail,
  mailErr,
  setMailErr,
  onClose
}: UserMailAddressDialogProps) => {

const onCloseAction = ()=>{
  onClose();
  setOpenDialog(false);
}
const updateMailAction =()=>{
  if(editMail == ''){
    setMailErr("メールは必須です。")
  }else{
    updateAction({mail: editMail});
  }
}
  return (
    <DialogBox open={openDialog} setOpen={onCloseAction} >
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center pr-6 relative">
          <p className="text-black font-semibold">メール変更</p>
          <div
            onClick={onCloseAction}
            className="absolute top-6 right-6 btn"
            >
            <CloseIcon className="text-black" />
          </div>
        </div>

        <div className="w-full px-6 pb-8 space-y-8">
          <TextField
            value={editMail}
            onChange={(event) => {
              setEditMail(event.target.value);
            }}
            id="outlined-basic"
            label="Eメール"
            variant="outlined"
            className="w-full bg-bgcolor"
          />
          {mailErr && <div className="text-red-500">{mailErr}</div>}

          <Button  variant="contained" className="w-full"  onClick={updateMailAction}>変更</Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default UserMailAddressDialogComponent;
