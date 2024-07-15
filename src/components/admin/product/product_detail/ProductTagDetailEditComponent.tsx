import DialogBox from "@/components/DialogBox";
import { Button, Divider } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "@/types/product/product";
import InputBoxComponent from "@/components/InputBoxComponent";
import { UpdateProductMode3Props, UpdateProductRes } from "@/networks/mutations/admin/product/update";

interface ProductInfoProps {
  openTagDetailDialog: boolean;
  setOpenTagDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  updateProductAction: ({ product_id, productPayload, }: UpdateProductMode3Props) => Promise<UpdateProductRes>
}

const ProductTagDetailEditComponent = ({
  openTagDetailDialog,
  setOpenTagDetailDialog,
    product,
    setProduct,
    updateProductAction
}: ProductInfoProps) => {
  const [prodSearchTag, setProdsearchTag] = useState<string>(
    product.product_search_tag
  );
  const [userSearchTag, setUserSearchTag] = useState<string>(
    product.user_search_tag
  );
  const [prodSearchTagErr, setProdsearchTagErr] = useState<string>("");
  const [userSearchTagErr, setUserSearchTagErr] = useState<string>("");

  // const keydownListener = (event: KeyboardEvent)=>{
  //   // do action
  //   if(event.key === "Enter") {
  //     updateAction();
  //   }
  // }

  const updateAction = () => {
    updateProductAction({product_id: product.product_id,
      productPayload: {
        product_search_tag:prodSearchTag,  
        user_search_tag:userSearchTag,      
        mode: 3,
      }}
      ).then((updatedProudct)=>{
        setOpenTagDetailDialog(false);
        setProduct({...product,product_search_tag:updatedProudct.data.product_search_tag,user_search_tag:updatedProudct.data.user_search_tag })
    })
    .catch((err)=>{
      if(err.errors){
        setProdsearchTagErr(err.errors?.product_search_tag);
        setUserSearchTagErr(err.errors?.user_search_tag);
      }
    })
  };

  const clearAction = () => {
    setProdsearchTag(product.product_search_tag);
    setUserSearchTag(product.user_search_tag);
    setProdsearchTagErr("")
    setUserSearchTagErr("");
  };

  useEffect(()=>{
    // if(openTagDetailDialog) {
    //   // add listener
    //   window.addEventListener("keydown",keydownListener)
    // }

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }   
  },[openTagDetailDialog])

  return (
    <DialogBox
      size="lg"
      open={openTagDetailDialog}
      setOpen={setOpenTagDetailDialog}
      clearAction={clearAction}
    >
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            商品タグ変更
          </div>
          <div
            onClick={() => {
              clearAction();
              setOpenTagDetailDialog(false);
            }}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[30px] py-[40px] flex flex-col space-y-1">
          <InputBoxComponent
            error={userSearchTagErr}
            onChange={(event) => setUserSearchTag(event.target.value)}
            value={userSearchTag}
            multiline={5}
            label={"顧客検索用タグ"}
          />

          <SizeBox h={15} />
          <InputBoxComponent
            error={prodSearchTagErr}
            onChange={(event) => setProdsearchTag(event.target.value)}
            value={prodSearchTag}
            multiline={5}
            label={"商品検索タグ"}
          />

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

export default ProductTagDetailEditComponent;
