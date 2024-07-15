import DialogBox from "@/components/DialogBox";
import { Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import { InventoryExport } from "@/types/inventory_export/inventory_export";
import mutations from "@/networks/mutations";

interface ShippingSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  warehouseDetailId: number;
  setInventoryExport: Dispatch<SetStateAction<Array<InventoryExport> | undefined>>;
  onSearch: () => void;
}

const ShippingSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  warehouseDetailId,
  setInventoryExport,
  onSearch,
}: ShippingSearchProps) => {
  const [search, setSearch] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [scheduleDeliveryDate, setScheduleDeliveryDate] = useState<string>("");

  // const keydownListener = (event: KeyboardEvent) => {
  //   // do action
  //   if (event.key === "Enter") {
  //     searchShippingAction();
  //   }
  // }

  //inital state of searching
  useEffect(() => {
    // if (openSearchDialog) {
    //   // add listener
    //   window.addEventListener("keydown", keydownListener)
    // }

    // return () => {
    //   // remove listener
    //   window.removeEventListener("keydown", keydownListener);
    // }
  })

  const searchShippingAction = () => {
    onSearch();
    mutations.admin.inventoryExport.get({
      warehouse_detail_id: warehouseDetailId,
      search: search,
      date_from: dateFrom,
      schedule_delivery_date: scheduleDeliveryDate
    })
      .then((ans) => {
        setInventoryExport(ans.data);
        setDateFrom("");
        setScheduleDeliveryDate("");
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <DialogBox size="sm" open={openSearchDialog} setOpen={setOpenSearchDialog}>
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
        <div className="px-[30px] py-[20px] flex flex-col">
          <TextField
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            id="outlined-basic"
            label="注文ID / お客様ID / お客様名 "
            variant="outlined"
          />
          <SizeBox h={20} />

          <TextField
            value={dateFrom}
            onChange={(event) => {
              setDateFrom(event.target.value);
            }}
            id="outlined-basic"
            label="注文日〜"
            variant="outlined"
          />

          <SizeBox h={20} />
          <TextField
            value={scheduleDeliveryDate}
            onChange={(event) => {
              setScheduleDeliveryDate(event.target.value);
            }}
            id="outlined-basic"
            label="出荷指示日〜"
            variant="outlined"
          />

          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={searchShippingAction} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(ShippingSearchComponent);
