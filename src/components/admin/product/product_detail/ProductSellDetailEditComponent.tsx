import DialogBox from "@/components/DialogBox";
import { Button, Divider } from "@mui/material";
import { Radio } from "@material-tailwind/react";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import Helper from "@/helpers";
import InputBoxComponent from "@/components/InputBoxComponent";

import { Product } from "@/types/product/product";
import { UpdateProductRes, updateProductMode2Props } from "@/networks/mutations/admin/product/update";
import InputBoxPercentComponent from "@/components/InputBoxPercentComponent";

interface ProductInfoProps {
  openSellDetailDialog: boolean;
  setOpenSellDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  updateProductAction: (update: updateProductMode2Props) => Promise<UpdateProductRes>
}

const ProductSellDetailEditComponent = ({
  openSellDetailDialog,
  setOpenSellDetailDialog,
  product,
  setProduct,
  updateProductAction
 
}: ProductInfoProps) => {
  const [purchasePrice, setpurchasePrice] = useState<number>(product.buy_price);
  const [sellPrice, setSellPrice] = useState<number>(product.price);
  const [purchaseTaxRate, setpurchaseTaxRate] = useState<number>(product.buy_tax);
  const [sellTaxRate, setsellTaxRate] = useState<number>(product.tax);
  const [minimumOrderQuantity, setminimumOrderQuantity] = useState<number>(product.min_sell_amt);
  const [maximumOrderQuantity, setmaximumOrderQuantity] = useState<number>(product.max_sell_amt);
  const [discount, setDiscount] = useState<number>(product.discount);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [subscribeDiscount, setSubscribeDiscount] = useState<number>((100-product.subscribe_factor*100));
  const [purchasePriceErr, setpurchasePriceErr] = useState<string>("");
  const [sellPriceErr, setSellPriceErr] = useState<string>("");
  const [purchaseTaxRateErr, setpurchaseTaxRateErr] = useState<string>("");
  const [sellTaxRateErr, setsellTaxRateErr] = useState<string>("");  // note
  const [minimumOrderQuantityErr, setminimumOrderQuantityErr] = useState<string>("");
  const [maximumOrderQuantityErr, setmaximumOrderQuantityErr] = useState<string>("");

  // const keydownListener = (event: KeyboardEvent)=>{
  //   // do action
  //   if(event.key === "Enter") {
  //     updateAction();
  //   }
  // }

  // 定期購入・一回購入
  const [activeSubscribeRadio,setActiveSubscribeRadio] = useState<boolean>(false);

  useEffect(() => {
    // Set the focus when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // if(openSellDetailDialog) {
    //   // add listener
    //   window.addEventListener("keydown",keydownListener)
    // }

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }    
  }, [openSellDetailDialog]);

  const updateAction = () => {
    if(!purchasePrice || !purchasePrice || !minimumOrderQuantity || !maximumOrderQuantity){
      if(purchasePrice == 0){
          setpurchasePriceErr("仕入れ単価（税抜)を入力してください");        
          
        }
        if(sellPrice == 0 ){
          setSellPriceErr("販売単価（税抜）を入力してください");
          
          
        }
        if(minimumOrderQuantity == 0 ) {
          setminimumOrderQuantityErr("最低発注数量）を入力してください");
          
          
        }
        if( maximumOrderQuantity == 0){
          setmaximumOrderQuantityErr("最大発注数量を入力してください");   
          
        } 
    }else{
       updateProductAction({
          product_id: product.product_id,
          price: sellPrice,
          tax: sellTaxRate,
          buy_price: purchasePrice,
          buy_tax: purchaseTaxRate,
          min_sell_amt: minimumOrderQuantity,
          max_sell_amt : maximumOrderQuantity,
          subscribe_factor: 1-(subscribeDiscount/100),
          discount: discount,
          mode : 2
        }      
        ).then((updateProduct)=>{
          setOpenSellDetailDialog(false);   
          setProduct({...product,
            buy_price: updateProduct.data.buy_price,
            buy_tax: updateProduct.data.buy_tax,
            tax: updateProduct.data.tax,
            price: updateProduct.data.price,
            min_sell_amt:updateProduct.data.min_sell_amt,
            max_sell_amt: updateProduct.data.max_sell_amt,
            discount: updateProduct.data.discount,
            subscribe_factor: updateProduct.data.subscribe_factor
        })
        updateDialog(updateProduct);
      }
      )
      .catch((err)=>{
        if(err.errors){
          setpurchasePrice(err.errors?.buy_price);
          setDiscount(err.errors?.discount);
          setSellPrice(err.errors?.price);
          setpurchaseTaxRate(err.errors?.buy_tax);
          setsellTaxRate(err.errors?.tax);;
          setminimumOrderQuantity(err.errors?.min_sell_amt);
          setmaximumOrderQuantity(err.errors?.max_sell_amt);
          setSubscribeDiscount(err.errors?.subscribe_discount);
        }
      });    
      
    }
  };

  const updateDialog = (updateProduct: UpdateProductRes) => {
    setpurchasePrice(updateProduct.data.buy_price); // 1500
    setDiscount(updateProduct.data.discount);
    setSellPrice(updateProduct.data.price);
    setpurchaseTaxRate(updateProduct.data.buy_tax);
    setsellTaxRate(updateProduct.data.tax);
    setminimumOrderQuantity(updateProduct.data.min_sell_amt);
    setmaximumOrderQuantity(updateProduct.data.max_sell_amt);
  }

  const clearAction = () => {
    setpurchasePrice(product.buy_price); // 1500
    setDiscount(product.discount);
    setSellPrice(product.price);
    setpurchaseTaxRate(product.buy_tax);
    setsellTaxRate(product.tax);;
    setminimumOrderQuantity(product.min_sell_amt);
    setmaximumOrderQuantity(product.max_sell_amt);
    setpurchasePriceErr("");
    setSellPriceErr("");
    setpurchaseTaxRateErr("");
    setsellTaxRateErr("");
    setminimumOrderQuantityErr("");
    setmaximumOrderQuantityErr("");
    setActiveSubscribeRadio(false);
  };

  return (
    <DialogBox
      size="lg"
      open={openSellDetailDialog}
      setOpen={setOpenSellDetailDialog}
      clearAction={clearAction}
    >
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            販売情報変更
          </div>
          <div
            onClick={() => {
              clearAction();
              setOpenSellDetailDialog(false);
            }}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[30px] py-[40px] flex flex-col space-y-1">
          <div className="flex flex-row">
            <InputBoxComponent
              max={10}
              label="仕入れ単価（税抜)"
              value={purchasePrice>0? Helper.japaneseNumberFormat({number: purchasePrice}): "￥"}
              error={purchasePriceErr}
              onChange={(event) => {
                if(event.currentTarget.value.includes("￥")){
                  setpurchasePrice(Helper.japaneseNumberFormatRevert({numericString: event.currentTarget.value}));
                }else if(parseInt(event.currentTarget.value)>0){
                  setpurchasePrice(parseInt(event.currentTarget.value));
                }else{
                  setpurchasePrice(0);
                }
              }}
            />
            <SizeBox w={50} />
            <InputBoxComponent
              max={10}
              error={sellPriceErr}
              onChange={(event) => {
                if(event.currentTarget.value.includes("￥")){
                  setSellPrice(Helper.japaneseNumberFormatRevert({numericString: event.currentTarget.value}));
                }else if(parseInt(event.currentTarget.value)>0){
                  setSellPrice(parseInt(event.currentTarget.value));
                }else{
                  setSellPrice(0);
                }
              }}
              label="販売単価（税抜）"
              value={sellPrice>0? Helper.japaneseNumberFormat({number: sellPrice}): "￥"}
            />
          </div>
          <SizeBox h={15} />

          <div className="flex flex-row">
            <InputBoxPercentComponent 
                id="buyTax"
                max={2}
                label="仕入れ単価税率"
                value={purchaseTaxRate>0?purchaseTaxRate.toString():"0"}
                onChange={(event) => {
                  setpurchaseTaxRate(isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value));
                }}
                error={purchaseTaxRateErr}
            />
            <SizeBox w={50} />
            <InputBoxPercentComponent 
                id="sellTax"
                max={2}
                label="販売単価税率"
                value={sellTaxRate>0?sellTaxRate.toString():"0"}
                onChange={(event) => {
                  setsellTaxRate(isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value));
                }}
                error={sellTaxRateErr}
            />
          </div>

          <SizeBox h={15} />

          <div className="flex flex-row">
            <InputBoxComponent
              max={10}
              onChange={() => {}}
              label="仕入れ単価（税込）"
              disabled
              value={(purchasePrice>0 && purchaseTaxRate>0 ) ?Helper.calculatePercentage({
                amount: purchasePrice,
                percent: purchaseTaxRate,
              }).toString():""}
              backgroundColor="#D9D9D9"
            />

            <SizeBox w={50} />

            <InputBoxComponent
              max={10}
              onChange={() => {}}
              label="販売単価（税込）"
              disabled
              backgroundColor="#D9D9D9"
              value={(sellPrice>0 && sellTaxRate>0 ) ? Helper.calculatePercentage({
                amount: sellPrice,
                percent: sellTaxRate,
              }).toString():""}
            />
          </div> 

          <SizeBox h={15} />

          <div className="flex flex-row">
            <InputBoxComponent
             max={10}
              onChange={(event) => parseInt(event.currentTarget.value)>0?setminimumOrderQuantity(parseInt(event.target.value)):setminimumOrderQuantity(0)}
              label="最低発注数量"
              value={minimumOrderQuantity>0?minimumOrderQuantity.toString():""}
              error={minimumOrderQuantityErr}
            />
            <SizeBox w={50} />

            <InputBoxComponent
              max={10}
             onChange={(event) => parseInt(event.currentTarget.value)>0?setmaximumOrderQuantity(parseInt(event.target.value)):setmaximumOrderQuantity(0)}              
             label="最大発注数量"
              value={maximumOrderQuantity>0?maximumOrderQuantity.toString():""}
              error={maximumOrderQuantityErr}
            />
          </div>
          <SizeBox h={20} />

          <div className="flex flex-row">
            <div className="flex-1">
              <div className="flex gap-10">
                <Radio
                  color={"blue"}
                  name="type"
                  label="定期購入"
                  crossOrigin={undefined}
                  onClick={()=>setActiveSubscribeRadio(true)}
                />
                <Radio
                  color="blue"
                  name="type"
                  label="１回購入"
                  defaultChecked
                  crossOrigin={undefined}
                  onClick={()=>setActiveSubscribeRadio(false)}
                />
              </div>
            </div>
            <SizeBox w={50} />
            {
              activeSubscribeRadio?
              <InputBoxPercentComponent 
                id="subscribeDiscount"
                max={2}
                label="定期購入割引率" 
                value={subscribeDiscount>0?subscribeDiscount.toString():"0"}
                onChange={(event) =>   
                  setSubscribeDiscount(isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value))
                } 
              />
              :
              <InputBoxPercentComponent 
                id="discount"
                max={2}
                label="割引率" 
                value={discount>0?discount.toString():"0"}
                onChange={(event) => {
                  setDiscount(isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value));
                }}
              />
            }
          </div>
          <SizeBox h={20} />

          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={updateAction} variant="contained">
            OK
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default ProductSellDetailEditComponent;
