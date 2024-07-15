import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useState, memo } from "react";

export type SearchActionType = {
    order_code ?: string | undefined;
    product ?: string | undefined;
    customer ?: string | undefined;
    order_date ?: string | undefined;
    payment_method ?: string | undefined;
    payment_date ?: string | undefined;
    address ?: string | undefined;
    schedule_delivery_date ?: string | undefined;
    schedule_pickedup_date ?: string | undefined;
    status ?: number | undefined;
  }

interface ProductSearchProps {
    openSearchDialog: boolean;
    setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
    searchAction : (SearchActionType : SearchActionType) => void;
}

const OrderSearchComponent = ({openSearchDialog,setOpenSearchDialog,searchAction}: ProductSearchProps)=>{

    type AutoCompleteData = {
        label: string;
        value: number;
    }

    const [order_code, setOrderCode] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [order_date, setOrderDate] = useState<string>("");
    const [payment_method, setPaymentMethod] = useState<string>("");
    const [payment_date, setPaymentDate] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [schedule_delivery_date, setScheduleDeliveryDate] = useState<string>("");
    const [schedule_pickedup_date, setSchedulePickedupDate] = useState<string>("");
    const [status, setStatus] = useState<AutoCompleteData>();

    // Data
    const subCategoryData: Array<AutoCompleteData> = [
        {label: "頼み", value: 1},
        {label: "受け入れ", value: 2},
        {label: "配達を割り当て", value: 3},
        {label: "配送", value: 4},
        {label: "配達された", value: 5}]

    const searchBtnAction = () => {
        searchAction({order_code,product,customer,order_date,payment_method,payment_date,address,schedule_delivery_date,schedule_pickedup_date,status:status?.value})
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
      
    return <DialogBox open={openSearchDialog} setOpen={setOpenSearchDialog}>
        <div className="">
            {/* Title */}
            <div className="h-[50px] flex flex-row justify-center items-center relative">
                <div className="text-[#3083FF] text-[20px] text-center font-semibold">検索</div>
                <div onClick={()=>setOpenSearchDialog(false)} className="absolute right-[15px] btn"><CloseIcon/></div>
            </div>
            <Divider/>
            <div className="px-[50px] py-[16px] flex flex-col">
                <TextField 
                value={order_code} 
                onChange={(event)=>{setOrderCode(event.target.value)}} 
                id="outlined-basic" 
                label="注文コード" 
                variant="outlined" />
                <SizeBox h={15}/>
                <TextField 
                value={product} 
                onChange={(event)=>{setProduct(event.target.value)}} 
                id="outlined-basic" 
                label="商品名 / タイトル / キーワード"
                 variant="outlined" />
                <SizeBox h={15}/>
                <TextField 
                value={customer} 
                onChange={(event)=>{setCustomer(event.target.value)}} 
                id="outlined-basic" 
                label="お客様コード / お客様名" 
                variant="outlined" />
                <SizeBox h={15}/>
                <TextField 
                value={order_date} 
                onChange={(event)=>{setOrderDate(event.target.value)}} 
                id="outlined-basic" 
                label="注文日" 
                variant="outlined" />
                <SizeBox h={15}/>
                <div className="flex">
                    <TextField value={payment_method} onChange={(event)=>{setPaymentMethod(event.target.value)}} id="outlined-basic" label="決済方法" variant="outlined" />
                    <SizeBox w={20}/>
                    <TextField value={payment_date} onChange={(event)=>{setPaymentDate(event.target.value)}} id="outlined-basic" label="決済日" variant="outlined" />
                </div>
                <SizeBox h={15}/>
                <TextField value={address} onChange={(event)=>{setAddress(event.target.value)}} id="outlined-basic" label="住所" variant="outlined" />
                <SizeBox h={15}/>
                <div className="flex">
                    <TextField value={schedule_delivery_date} onChange={(event)=>{setScheduleDeliveryDate(event.target.value)}} id="outlined-basic" label="出荷指示日" variant="outlined" />
                    <SizeBox w={20}/>
                    <TextField value={schedule_pickedup_date} onChange={(event)=>{setSchedulePickedupDate(event.target.value)}} id="outlined-basic" label="出荷予定日" variant="outlined" />
                </div>
                <SizeBox h={15}/>
                {/* サブカテゴリ */}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={status}
                    onChange={(_,value)=>{value && setStatus(value)}}
                    options={subCategoryData}
                    renderInput={(params) => <TextField {...params} label="ステータス" />}
                />
                <SizeBox h={15}/>
                {/* Button */}
                <Button onClick={searchBtnAction} variant="contained">検索</Button>
            </div>
        </div>
    </DialogBox>
}

export default memo(OrderSearchComponent);