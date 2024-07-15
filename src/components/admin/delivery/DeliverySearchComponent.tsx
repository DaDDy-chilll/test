import DialogBox from "@/components/DialogBox";
import {
  Button,
  Divider,
  TextField,
} from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";

export type SearchActionType = {
  customer ?: string | undefined;
  product ?: string | undefined;
  order_date ?: string | undefined;
  addressName ?: string | undefined;
  schedule_delivery_date ?: string | undefined;
  schedule_pickedup_date ?: string | undefined;
}

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  searchAction : (SearchActionType : SearchActionType) => void;
}

const DeliverySearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  searchAction,
}: ProductSearchProps) => {

  const [customer, setCustomer] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [order_date, setOrderDate] = useState<string>("");
  const [addressName, setAddressName] = useState<string>("");
  const [schedule_delivery_date, setScheduleDeliveryDate] = useState<string>("");
  const [schedule_pickedup_date, setSchedulePickedupDate] = useState<string>("");

  const searchBtnAction = () => {
    searchAction({customer,product,order_date,addressName,schedule_delivery_date,schedule_pickedup_date})
  }

  useEffect(()=>{
    // if(openSearchDialog)
    // {
    //     const keydownListener = (event: KeyboardEvent)=>{
    //         // do action
    //         if(event.key === "Enter"){ 
    //             searchBtnAction();
    //         }
    //       }
    //       // add listener
    //       window.addEventListener("keydown",keydownListener)
      
    //       return ()=>{
    //         // remove listener
    //         console.log("remove");
    //         window.removeEventListener("keydown",keydownListener);
    //       }
    // }
  })

  return (
    <DialogBox open={openSearchDialog} setOpen={setOpenSearchDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
          検索
          </div>
          <div
            onClick={() => setOpenSearchDialog(false)}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[50px] py-[20px] flex flex-col">
          <TextField
            value={customer}
            onChange={(event) => {
              setCustomer(event.target.value);
            }}
            id="outlined-basic"
            label="お客様コード / お客様名"
            variant="outlined"
          />
          <SizeBox h={20} />

          <TextField
            value={product}
            onChange={(event) => {
              setProduct(event.target.value);
            }}
            id="outlined-basic"
            label="商品名・コード / 注文コード / 配達コード"
            variant="outlined"
          />
          <SizeBox h={20} />

          <TextField
            value={order_date}
            onChange={(event) => {
              setOrderDate(event.target.value);
            }}
            id="outlined-basic"
            label="注文日"
            variant="outlined"
          />
          <SizeBox h={20} />

          <TextField
            value={addressName}
            onChange={(event) => {
              setAddressName(event.target.value);
            }}
            id="outlined-basic"
            label="配達先"
            variant="outlined"
          />
          <SizeBox h={20} />

          <div className="flex justify-between space-x-4">
            <TextField
              value={schedule_pickedup_date}
              onChange={(event) => {
                setSchedulePickedupDate(event.target.value);
              }}
              id="outlined-basic"
              label="出荷指示日時"
              variant="outlined"
            />
            <TextField
              value={schedule_delivery_date}
              onChange={(event) => {
                setScheduleDeliveryDate(event.target.value);
              }}
              id="outlined-basic"
              label="出荷予定日時"
              variant="outlined"
            />
          </div>

          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={searchBtnAction} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(DeliverySearchComponent);
