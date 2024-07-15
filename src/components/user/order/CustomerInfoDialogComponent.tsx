import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { Customer } from "@/screens/user/order/OrderScreen";

interface CustomerInfoDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  customer: Customer;
}

const CustomerInfoDialogComponent = ({
  openDialog,
  setOpenDialog,
  customer
}: CustomerInfoDialogProps) => {
  return (
    <DialogBox size="xs" open={openDialog} setOpen={setOpenDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[60px] flex flex-row justify-end items-center pr-6">
          <div
            onClick={() => setOpenDialog(false)}
            className="btn"
          >
            <CloseIcon className="text-black" />
          </div>
        </div>

        <div className="space-y-4 pl-16 pb-10 text-black">
            <p className="font-semibold">{customer.user_name}</p>
            <p className="text-sm">{customer.post_code}</p>
            <p className="text-sm">{customer.name}</p>
            <p className="text-sm">{customer.addressName}</p>
            <p className="text-sm">電話：{customer.phone}</p>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(CustomerInfoDialogComponent);
