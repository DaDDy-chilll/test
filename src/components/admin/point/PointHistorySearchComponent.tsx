import DialogBox from "@/components/DialogBox";
import { Button, Divider, TextField, InputLabel } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";

export type searchActionType = {
  order_code?: string | undefined;
  date_from?: string | undefined;
  date_to?: string | undefined;
};

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  searchAction: (searchActionType: searchActionType) => void;
}

const PointHistorySearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  searchAction,
}: ProductSearchProps) => {
  const [orderCode, setOrderCode] = useState<string>("");
  const [dateFrom, setdateFrom] = useState<string>("");
  const [dateTo, setdateTo] = useState<string>("");

  const searchActionBtn = () => {
    searchAction({
      order_code: orderCode,
      date_from: dateFrom,
      date_to: dateTo,
    });
  };

  useEffect(() => {
    // if (openSearchDialog) {
    //   const keydownListener = (event: KeyboardEvent) => {
    //     console.log(event.key, openSearchDialog);
    //     if (event.key == "Enter") {
    //       searchActionBtn();
    //     }
    //   };
    //   window.addEventListener("keydown", keydownListener);
    //   return () => {
    //     window.removeEventListener("keydown", keydownListener);
    //   };
    // }
    if(openSearchDialog == false){
      setOrderCode("");
      setdateFrom("");
      setdateTo("");
    }
  });

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
            value={orderCode}
            onChange={(event) => {
              setOrderCode(event.target.value);
            }}
            id="outlined-basic"
            label="注文Code"
            variant="outlined"
          />

          <SizeBox h={15} />

          <div className="flex justify-between items-center space-x-4">
            {/* <TextField
              value={dateFrom}
              onChange={(event) => {
                setdateFrom(event.target.value);
              }}
              id="outlined-basic"
              label="付与日~"
              variant="outlined"
            /> */}
            {/* <TextField
              value={dateTo}
              onChange={(event) => {
                setdateTo(event.target.value);
              }}
              id="outlined-basic"
              label="~付与日"
              variant="outlined"
            /> */}
            <InputLabel htmlFor="outlined-basic-from">付与日</InputLabel>
            <TextField
              type="date"
              value={dateFrom}
              onChange={(event) => {
                setdateFrom(event.target.value);
              }}
              id="outlined-basic-from"
              variant="outlined"
            />
            <InputLabel htmlFor="outlined-basic-to">~</InputLabel>
            <TextField
              type="date"
              value={dateTo}
              onChange={(event) => {
                setdateTo(event.target.value);
              }}
              id="outlined-basic-to"
              variant="outlined"
            />
          </div>

          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={searchActionBtn} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(PointHistorySearchComponent);
