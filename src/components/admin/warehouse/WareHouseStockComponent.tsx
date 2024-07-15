import DialogBox from "@/components/DialogBox";
import { Button, Divider } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import Helper from "@/helpers";
import aws from "@/aws";
import InputBoxComponent from "@/components/InputBoxComponent";
import mutations from "@/networks/mutations";
import { warehouse_detail } from "@/types/warehouse/warehouse_detail";

interface WarehouseStockProps {
  openStockDialog: boolean;
  setOpenStockDialog: Dispatch<SetStateAction<boolean>>;
  wareHouseData: warehouse_detail | undefined;
  setWarehouseDetails: Dispatch<SetStateAction<Array<warehouse_detail> | undefined>>;
  onInputProductQtySuccess: ()=>void;
}

const WareHouseStockComponent = ({
  openStockDialog,
  setOpenStockDialog,
  wareHouseData,
  onInputProductQtySuccess
}: WarehouseStockProps) => {

  //inventory value
  const [inventoryQty, setInventoryQty] = useState<number>(0);
  const [inventoryQtyErr, setInventoryQtyErr] = useState<string>("");

  // const closeShiIreAction = () => {
  //     setInventoryQtyErr("");
  //     setInventoryQty(0);
  //     setOpenStockDialog(false);
  // }

  // const keydownListener = (event: KeyboardEvent)=>{
  //   // do action
  //   if(event.key === "Enter") {
  //     inventoryImportAction ( 
  //       wareHouseData ? wareHouseData.warehouse_detail_id : 0,
  //       inventoryQty ? inventoryQty : 0
  //       );
  //   }
  // }
  
  useEffect(() => { 
    if(openStockDialog) {
      // add listener
     // window.addEventListener("keydown",keydownListener);
    } else {
      setInventoryQtyErr("");
      setInventoryQty(0);
    }

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }
  })


  //inventory import
  const inventoryImportAction = (warehouse_detail_id: number, inventoryQty: number) => {
    mutations.admin.inventory.create({
      invPayload: {
        warehouse_detail_id,
        product_qty: inventoryQty
      }
    })
      .then(() => {
        setOpenStockDialog(false); //close dialog
        onInputProductQtySuccess();
        //call initial state
        // mutations.admin.warehouseDetail.get()
        //   .then((ans) => {
        //     setWarehouseDetails(ans.data);
        //   })
        //   .catch((err) => console.log(err));

          setInventoryQtyErr("");
          setInventoryQty(0);
      })
      .catch((err) => {
        setInventoryQtyErr(err.errors.product_qty);
      })
  }
  return (
    <DialogBox size="md" open={openStockDialog} setOpen={setOpenStockDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            仕入れ
          </div>
          <div
            onClick={() =>setOpenStockDialog(false)}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[30px] py-[20px] flex flex-col">
          <div className="flex space-x-5 items-center">
            <img
              src={aws.s3.getUrl({ key: wareHouseData ? wareHouseData.img_url : "" })}
              alt="Product image"
              width={300}
              height={300}
            />

            <div className="text-black space-y-4">
              <p className="font-semibold">{wareHouseData?.product_name}</p>
              <p>{wareHouseData?.title}</p>
              <p>{wareHouseData?.product_code}</p>
              <p>
                {Helper.japaneseNumberFormat({
                  number: Math.round(wareHouseData ? wareHouseData.price : 0),
                })}
              </p>
            </div>
          </div>
          <SizeBox h={50} />
          <div className="flex flex-row pt-10 ml-[5px] mr-[5px]">
            <InputBoxComponent
              onChange={(e) => {
                if(parseInt(e.currentTarget.value)>0){
                  setInventoryQty(parseInt(e.target.value))
                }else{
                  setInventoryQty(0);
                }
              }}
              value={inventoryQty>0? inventoryQty?.toString(): ''}
              multiline={1}
              error={inventoryQtyErr}
              label="仕入れ商品数"
            />
            <SizeBox h={15} />
          </div>
          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={() => inventoryImportAction(
            wareHouseData ? wareHouseData.warehouse_detail_id : 0,
            inventoryQty ? inventoryQty : 0)}
            variant="contained">
            OK
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(WareHouseStockComponent);
