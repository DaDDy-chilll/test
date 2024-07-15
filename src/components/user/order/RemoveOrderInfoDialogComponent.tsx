import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { Divider } from "@mui/material";
import Helper from "@/helpers";
import SizeBox from "@/components/SizeBox";
import aws from "@/aws";



interface CustomerInfoDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setRemoveOpenDialog: Dispatch<SetStateAction<boolean>>;
  removeAction:(subId: number)=> void;
  qty: number | undefined;
  scheduleDeliDate: string | undefined;
  img_url: string;
  product_name:string;
  total:number;
  removeSubId:  number | undefined;
}

const RemoveOrderInfoDialogComponent = ({
  openDialog,
  setOpenDialog,
  setRemoveOpenDialog,
  removeSubId,
  removeAction,
  qty,
  img_url,
  scheduleDeliDate,
  product_name,
  total,
}: CustomerInfoDialogProps) => {



  return (
    <DialogBox size="xs" open={openDialog} setOpen={setOpenDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[60px] flex flex-row justify-center items-center relative">
          <p className="text-sm text-black font-semibold">配達日の変更</p>
          <div onClick={() => setOpenDialog(false)} className="btn">
            <CloseIcon className="absolute top-4 right-4 text-black" />
          </div>
        </div>

        <Divider />

        <div className="space-y-4 pb-6">
          <div className="flex space-x-6 items-center pt-6 pb-4 px-6">
            <img
              src={aws.s3.getUrl({key:img_url ? img_url : ""})}
              alt="Product photo"
              width={180}
              height={180}
            />

            <div className="text-black space-y-3 text-sm">
              <p>{product_name}</p>
              <p className="font-semibold text-xl">
                {Helper.japaneseNumberFormat({
                  number: total,
                })}
                <span className=" font-thin text-xs">（税込）</span>
              </p>
            </div>
          </div>

          <div className="text-sm space-y-3 text-black px-6">
            <p>次の配達日：{scheduleDeliDate}</p>
            <p>次の配達数量：{qty}個</p>
          </div>
          <SizeBox />
          <Divider />
          <SizeBox />

          <div className="px-6 flex items-center space-x-4">
            <button 
              onClick={()=>removeAction(removeSubId? removeSubId : 0)}
              className="w-1/2 text-white bg-[#FF030380] py-2 rounded-md">
              次回から外す
            </button>
            <button 
            onClick={()=>
              setRemoveOpenDialog(false)}
            className="w-1/2 text-white bg-primary py-2 rounded-md">
              次回の依頼する
            </button>
          </div>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(RemoveOrderInfoDialogComponent);
