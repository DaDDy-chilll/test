import DialogBox from "@/components/DialogBox";
import { Button, Divider } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { RegularPurchase } from "@/types/regularpurchase/regularPurchase";
import AWS from "@/aws"

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  removeRegularPurchase: boolean;
  setRemoveRegularPurchase: Dispatch<SetStateAction<boolean>>;
  pickItem: RegularPurchase;
  onFinishRemove: () => void;
}

const ProductSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  setRemoveRegularPurchase,
  onFinishRemove,
  pickItem
}: ProductSearchProps) => {
  return (
    <DialogBox open={openSearchDialog} setOpen={setOpenSearchDialog} size="xs">
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            確認
          </div>
          <div
            onClick={() => setOpenSearchDialog(false)}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="flex-shrink-0 w-full">
          <div className="py-4 space-y-2 px-4">
            <p className="text-black text-sm font-semibold">
              {pickItem.user_code} {pickItem.user_name}{" "}
              {pickItem.user_name_kana}
            </p>

            <img
              src={AWS.s3.getUrl({key: pickItem.img_url})}
              alt="Product Pho"
              width={200}
              height={200}
            />
            <p className="text-sm text-textBlue underline underline-offset-2">
              {pickItem.product_code}
            </p>
            <p className="text-sm text-black">
              {pickItem.product_name}
            </p>
            <p className="w-10 h-6 rounded-md bg-[#FFDE4E] text-center">
              {pickItem.subscribe_kikan}
            </p>
            <p className="text-sm text-black">
              最終購入: {pickItem.last_order_created_at}
            </p>
            <p className="text-sm text-black">
              次の配達日: {pickItem.order_created_at}
            </p>
            <p className="text-sm text-black">
              次の配達数量: {pickItem.qty} 個
            </p>
          </div>

          <Divider />

          <div className="text-center pt-6 px-4">
            <div className="space-y-2 pb-6">
              <p className="text-black font-bold text-sm">
                定期購入を外します。
              </p>
              <p className="text-black font-bold text-sm">
                よろしいでしょうか？
              </p>
            </div>
            <Button onClick={() => {
              onFinishRemove;
              setRemoveRegularPurchase(true);}} className="w-full" variant="contained">
              OK
            </Button>
          </div>

          <SizeBox h={20} />
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(ProductSearchComponent);
