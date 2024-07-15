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

export type SearchType = {
  search ?: string | undefined;
}

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  searchAction : (SearchType : SearchType) => void;

}

const PointSearchScreen = ({
  openSearchDialog,
  setOpenSearchDialog,
  searchAction,
}: ProductSearchProps) => {
  const [search, setSearch] = useState<string>("");

  const searchBtnAction = () => {
    searchAction({search})
  }

  useEffect( () => {
    // if(openSearchDialog) {
    //   const keydownListener = (event:KeyboardEvent) => {
    //     console.log(event.key, openSearchDialog);
    //     if(event.key == "Enter"){
    //       searchBtnAction();
    //     }
    //   }
    //   window.addEventListener("keydown",keydownListener)
    //   return () => {
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
            label="お客様ID / お客様名"
            variant="outlined"
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

export default memo(PointSearchScreen);
