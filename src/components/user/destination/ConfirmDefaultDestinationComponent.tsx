import DialogBox from "@/components/DialogBox";
import { Button } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";

interface ConfirmProps {
  openConfirmDialog: boolean;
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

const ConfirmDefaultDestinationComponent = ({
  openConfirmDialog,
  setOpenConfirmDialog,
  onConfirm
}: ConfirmProps) => {
  return (
    <DialogBox open={openConfirmDialog} setOpen={setOpenConfirmDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[60px] flex flex-row justify-center items-center relative">
          <div
            onClick={() => setOpenConfirmDialog(false)}
            className="absolute right-[26px] btn text-black"
          >
            <CloseIcon />
          </div>
        </div>
        <div className="px-[50px] py-[20px] flex flex-col items-center">
          <div className="text-center font-bold space-y-2 text-black">
            <p>配達先をどフォルトにします。</p>
            <p>よろしいでしょうか？</p>
          </div>

          <SizeBox h={50} />
          {/* Button */}
          <Button onClick={onConfirm} variant="contained" className="w-2/3">
            OK
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(ConfirmDefaultDestinationComponent);
