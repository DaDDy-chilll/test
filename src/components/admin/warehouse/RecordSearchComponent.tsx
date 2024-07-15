import DialogBox from "@/components/DialogBox";
import {
  Autocomplete,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import InputBoxComponent from "@/components/InputBoxComponent";
import mutations from "@/networks/mutations";
import { WarehouseHistory } from "@/networks/mutations/admin/warehouse_transaction/get";

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  setWareHouseHistory: Dispatch<SetStateAction<Array<WarehouseHistory> | undefined>>
  warehouseDetailId: number;
  onSearch: () => void;
}

const RecordSearchComponent = ({
  openSearchDialog,
  setWareHouseHistory,
  setOpenSearchDialog,
  warehouseDetailId,
  onSearch,
}: ProductSearchProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };
  const [search, setSearch] = useState<string>("");
  const [transactionType, setTransactionType] = useState<AutoCompleteData>();
  const [date, setDate] = useState<string>("");
  const [inCharge, setInCharge] = useState<string>("");

  // Data
  const transactionTypeData: Array<AutoCompleteData> = [
    { label: "仕入れ", value: 1 },
    { label: "出荷", value: 2 },
  ];

  // const keydownListener = (event: KeyboardEvent) => {
  //   // do action
  //   if (event.key === "Enter") {
  //     searchTansactionHistoryAction();
  //   }
  // }

  //initial state
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


  const searchTansactionHistoryAction = () => {
    onSearch();
    mutations.admin.warehouseTransaction.get({
      kanrisya_name: inCharge,
      transaction_type: transactionType?.value,
      warehouse_detail_id: warehouseDetailId,
      date: date,
      search: search,
    })
      .then((ans) => {
        console.log(ans.data)
        setWareHouseHistory(ans.data);
        setTransactionType({
          label: '',
          value: 0
        });
        setInCharge("");
        setDate("");
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
      })
  }

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
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={transactionType}
            onChange={(_, value) => {
              value && setTransactionType(value);
            }}
            options={transactionTypeData}
            renderInput={(params) => (
              <TextField {...params} label="仕入れ / 出荷" />
            )}
          />
          <SizeBox h={20} />

          <InputBoxComponent
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            value={search}
            multiline={1}
            label="注文ID / お客様ID / お客様名 "
          />
          <SizeBox h={20} />

          <InputBoxComponent
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
            multiline={1}
            label="日付〜"
          />
          <SizeBox h={20} />

          <InputBoxComponent
            value={inCharge}
            onChange={(event) => {
              setInCharge(event.target.value);
            }}
            multiline={1}
            label="担当名"
          />
          <SizeBox h={28} />

          {/* Button */}
          <Button onClick={searchTansactionHistoryAction} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(RecordSearchComponent);
