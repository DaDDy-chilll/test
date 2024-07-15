import DialogBox from "@/components/DialogBox";
import {
  Autocomplete,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect} from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";

export type ReviewSearchActionType = {
  customer?:string | undefined;
  product?:string | undefined;
  date?:string | undefined;
  title?:string | undefined;
  review?:string | undefined;
  shoninsha_id?:number | undefined;
  rating?:number | undefined;
  approver_name?:string | undefined;
}

interface ProductReviewSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  onSearch: (ReviewSearchActionType:ReviewSearchActionType) => void;
}

const ReviewSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  onSearch,
}: ProductReviewSearchProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };
  const [customer, setCustomer] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [reviewDate, setReviewDate] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewContent, setReviewContent] = useState<string>("");
  const [approver, setApprover] = useState<string>("");

  const [approverId, setApproverId] = useState<AutoCompleteData>();
  const [rating, setRating] = useState<AutoCompleteData>();

  // Data
  const statusData: Array<AutoCompleteData> = [
    { label: "未承認", value: 0 },
    { label: "承認済", value: 1 },
  ];
  const rankData: Array<AutoCompleteData> = [
    { label: "1 Stars", value: 1 },
    { label: "2 Stars", value: 2 },
    { label: "3 Stars", value: 3 },
    { label: "4 Stars", value: 4 },
    { label: "5 Stars", value: 5 },
  ];

  const searchProductReviewAction = ()=>{
    onSearch({customer,product,date: reviewDate ,title:reviewTitle,review:reviewContent,shoninsha_id:approverId?.value,rating:rating?.value,approver_name:approver})
  }

 useEffect(() => {
    // if(openSearchDialog){
    //   const keydownListener = (event : KeyboardEvent) => {
    //     if(event.key == "Enter")
    //     {
    //       searchProductReviewAction();
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
          <div className="flex justify-between w-full space-x-4">
            <TextField
              value={customer}
              onChange={(event) => {
                setCustomer(event.target.value);
              }}
              id="outlined-basic"
              label="お客様コード / お客様名"
              variant="outlined"
              className="flex-1"
            />

            <TextField
              value={product}
              onChange={(event) => {
                setProduct(event.target.value);
              }}
              id="outlined-basic"
              label="商品コード / 商品名"
              variant="outlined"
              className="flex-1"
            />
          </div>

          <SizeBox h={15} />

          <TextField
            value={reviewDate}
            onChange={(event) => {
              setReviewDate(event.target.value);
            }}
            id="outlined-basic"
            label="レビュー日"
            variant="outlined"
          />
          <SizeBox h={15} />

          <TextField
            value={reviewTitle}
            onChange={(event) => {
              setReviewTitle(event.target.value);
            }}
            id="outlined-basic"
            label="レビュータイトル"
            variant="outlined"
          />
          <SizeBox h={15} />

          <TextField
            value={reviewContent}
            onChange={(event) => {
              setReviewContent(event.target.value);
            }}
            id="outlined-basic"
            label="レビュー内容"
            variant="outlined"
          />
          <SizeBox h={15} />

          <div className="flex justify-between w-full space-x-4">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={approverId}
              onChange={(_, value) => {
                value && setApproverId(value);
              }}
              options={statusData}
              renderInput={(params) => (
                <TextField {...params} label="ステータス" />
              )}
              className="flex-1"
            />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={rating}
              onChange={(_, value) => {
                value && setRating(value);                
              }}
              options={rankData}
              renderInput={(params) => <TextField {...params} label="ランク" />}
              className="flex-1"
            />
          </div>

          <SizeBox h={15} />

          <TextField
            value={approver}
            onChange={(event) => {
              setApprover(event.target.value);
            }}
            id="outlined-basic"
            label="承認者"
            variant="outlined"
            className="flex-1"
          />

          <SizeBox h={28} />
          {/* Button */}
           <Button onClick={searchProductReviewAction} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(ReviewSearchComponent);
