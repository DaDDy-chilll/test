import DialogBox from "@/components/DialogBox";
import { Button } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";

interface ConfirmProps {
  notiText: string | undefined;
  showNoti: boolean;
  setShowNoti: Dispatch<SetStateAction<boolean>>;
  onConfirm?: () => void;
}

const NotiComponent = ({
  notiText,
  showNoti,
  setShowNoti,
  onConfirm,
}: ConfirmProps) => {
  return (
    <DialogBox open={showNoti} setOpen={setShowNoti}>
      <div className="">
        {/* Title */}
        <div className="h-[60px] flex flex-row justify-center items-center relative">
          <div
            onClick={() => setShowNoti(false)}
            className="absolute right-[26px] btn text-black"
          >
            <CloseIcon />
          </div>
        </div>
        <div className="px-[50px] py-[20px] flex flex-col items-center">
          <div className="text-center font-bold space-y-2 text-black">
            <p>{notiText}</p>
          </div>

          <SizeBox h={50} />
          {/* Button */}
          <Button
            onClick={() => {
              onConfirm && onConfirm();
             
            }}
            variant="contained"
            className="w-2/3"
          >
            OK
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(NotiComponent);
