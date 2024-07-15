import DialogBox from "@/components/DialogBox";
import {
  Button,
  Divider,
  TextField,
} from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
  product: string;
  setProduct: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

const PurchasesSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  user,
  setUser,
  product,
  setProduct,
  onSearch,
}: ProductSearchProps) => {

  return (
    <DialogBox open={openSearchDialog} setOpen={setOpenSearchDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            商品検索
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
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
            }}
            id="outlined-basic"
            label="お客様ID  /  お客様名"
            variant="outlined"
          />
          <SizeBox h={15} />
          <TextField
            value={product}
            onChange={(event) => {
              setProduct(event.target.value);
            }}
            id="outlined-basic"
            label="商品ID  /  商品名"
            variant="outlined"
          />
          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={onSearch} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default PurchasesSearchComponent;
