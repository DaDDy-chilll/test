import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";

export type SearchActionType = {
  search?:string | undefined;
  address?:string | undefined;
  status?:number | undefined;
}

interface ProductSearchProps {
  openSearchDialog: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  searchAction : (SearchActionType : SearchActionType) => void;
}

const CustomerSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  search,
  setSearch,
  address,
  setAddress,
  searchAction,
}: ProductSearchProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };
//  const [search, setSearch] = useState<string>("");
//   const [address, setAddress] = useState<string>(""); 
  const [status, setStatus] = useState<AutoCompleteData>({ label: "Active", value: 1 });

  // Data
  const statusData: Array<AutoCompleteData> = [
    { label: "Active", value: 1 },
    { label: "Suspended", value: 0 },
  ];

  const searchBtnAction = () => {
    searchAction({search,address,status:status?.value})
  }

  useEffect(()=>{
    // if(openSearchDialog){
    //   const keydownListener = (event: KeyboardEvent)=>{
    //     // do action
    //     console.log(event.key,openSearchDialog);
    //     if(event.key === "Enter"){ 
    //         searchBtnAction();
    //     }
    //   }
    //   // add listener
    //   window.addEventListener("keydown",keydownListener)
  
    //   return ()=>{
    //     // remove listener
    //     console.log("remove");
    //     window.removeEventListener("keydown",keydownListener);
    //   }
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
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            id="outlined-basic"
            label="お客様コード / お客様名"
            variant="outlined"
          />
          <SizeBox h={15} />

          <TextField
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            id="outlined-basic"
            label="住所"
            variant="outlined"
          />
          <SizeBox h={15} />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={status}
            onChange={(_, value) => {
              value && setStatus(value);
            }}
            options={statusData}
            renderInput={(params) => (
              <TextField {...params} label="ステータス" />
            )}
          />
          <SizeBox h={15} />

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

export default memo(CustomerSearchComponent);
