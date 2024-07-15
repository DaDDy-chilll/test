import DialogBox from "@/components/DialogBox";
import { Button } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";

interface ConfirmProps {
  confirmText: string;
  openDeleteConfirmDialog: boolean;
  setOpenDeleteConfirmDialog: Dispatch<SetStateAction<boolean>>;
  userID: number;
  deleteDataAction:(id:number) => void;
  
}

const SystemAdminConfirmComponent = ({
  confirmText,
  openDeleteConfirmDialog,
  setOpenDeleteConfirmDialog,
  userID,
  deleteDataAction,
 
}: ConfirmProps) => {
  return (
    <DialogBox open={openDeleteConfirmDialog} setOpen={setOpenDeleteConfirmDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[60px] flex flex-row justify-center items-center relative">
          <div
            onClick={() => setOpenDeleteConfirmDialog(false)}
            className="absolute right-[26px] btn text-black"
          >
            <CloseIcon />
          </div>
        </div>
        <div className="px-[50px] py-[20px] flex flex-col items-center">
          <div className="text-center font-bold space-y-2 text-black">
            <p>{confirmText}</p>
            <p>よろしいでしょうか？</p>
          </div>

          <SizeBox h={50} />
          {/* Button */}
          <Button onClick={() => deleteDataAction(userID)} variant="contained" className="w-2/3">
            OK
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(SystemAdminConfirmComponent);
