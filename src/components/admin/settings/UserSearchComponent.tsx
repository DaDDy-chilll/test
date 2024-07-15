import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import { params } from "@/networks/mutations/admin/list/get";


interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  onSearch: () => void;
  searchAction: (SearchAdmin : params) => void;
}

const UserSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  searchAction,
}: ProductSearchProps) => {
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<AutoCompleteData>({ label: "Admin", value: 2 });
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // Data
  const roleData: Array<AutoCompleteData> = [
    { label: "Super Admin", value: 1 },
    { label: "Admin", value: 2 },
  ];

  const searchBtnAction = () => {
    searchAction({search, role:role?.value})
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
            label="ID  /  名前  /  名前（カナ）"
            variant="outlined"
          />

          <SizeBox h={20} />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={role}
            onChange={(_, value) => {
              value && setRole(value);
            }}
            options={roleData}
            renderInput={(params) => <TextField {...params} label="権限" />}
          />

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

export default memo(UserSearchComponent);
