import DialogBox from "@/components/DialogBox";
import InputBoxComponent from "@/components/InputBoxComponent";
import SizeBox from "@/components/SizeBox";
import { UpdateProductMode4Props, UpdateProductRes } from "@/networks/mutations/admin/product/update";
import { Product } from "@/types/product/product";
import { ProductDescription } from "@/types/product/product_explain";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InsertDescriptionComponent from "../create_product/product_description/InsertDescriptionComponent";

interface ProductInfoProps {
  openDescriptionDetailDialog: boolean;
  setOpenDescriptionDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  updateProductAction: ({ product_id, productPayload, }: UpdateProductMode4Props) => Promise<UpdateProductRes>
}

const ProductDescriptionDetailEditComponent = ({
  openDescriptionDetailDialog,
  setOpenDescriptionDetailDialog,
  product,
  setProduct,
  updateProductAction
}: ProductInfoProps) => {
  const [productDescript, setProductDescript] = useState<Array<ProductDescription>>(JSON.parse(product.description));
  const [productDescriptErr, setProductDescriptErr] = useState<string>("");
  const [sector,setSector] = useState<number>(-1);

  const deleteDescription = (index: number)=>{
    const updated = productDescript.filter(({},x)=>x!==index);
    setProductDescript(updated);
  }

  const editDescription = (index: number)=>{
    // move scroll y edit
    setSector(index);
  }
  console.log("des"+productDescript.map(({mainTitle})=>mainTitle));
  // const keydownListener = (event: KeyboardEvent)=>{
  //   // do action
  //   if(event.key === "Enter") {
  //     updateAction();
  //   }
  // }

  const updateAction = () => {
    updateProductAction({product_id: product.product_id,
      productPayload: {
        description: JSON.stringify(productDescript),
        mode: 4,
      }}
      ).then((updatedProduct)=>{
      setOpenDescriptionDetailDialog(false);
      setProduct({...product, description: updatedProduct.data.description})
      setProductDescript(JSON.parse(updatedProduct.data.description));
    })
    .catch((err)=>{
      if(err.errors){
        setProductDescriptErr(err.errors.description)
      }
    })
   
  };

  const clearAction = () => {
    setProductDescript(JSON.parse(product.description));
    setProductDescriptErr("");
  };

  useEffect(()=>{
    // if(openDescriptionDetailDialog) {
    //   // add listener
    //   window.addEventListener("keydown",keydownListener)
    // }

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }
  },[openDescriptionDetailDialog,productDescript])
  return (
    <DialogBox
      size="lg"
      open={openDescriptionDetailDialog}
      setOpen={setOpenDescriptionDetailDialog}
      clearAction={clearAction}
    >
      lkjlksflkmlk
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row items-center relative px-8">
          <div className="text-[#3083FF] text-[20px] font-semibold">
            商品タグ変更၁၁၁၁
          </div>
          <div
            onClick={() => {
              clearAction();
              setOpenDescriptionDetailDialog(false);
            }}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        {
          productDescript.map(({mainTitle,contents}) => {
            return (
              <div key={Math.random()} className="relative px-[10px]">
                <div className=" border-b-[0.5px] border-gray-400 my-[20px]"></div>
                {mainTitle && <div className="text-[30px] font-bold py-[10px]" >{mainTitle}</div>}
                {contents.map(({subTitle,sentences}) => {
                  return (
                    <div key={Math.random()} className="py-[20px]">
                      <div className="text-[20px] font-bold py-[8px]">{subTitle}</div>
                      <div>
                        {
                          sentences.map((s) => {
                            return <div key={Math.random()} className={` text-[16px] leading-loose`}>
                              {s}
                            </div>
                          })
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
        }
        <InsertDescriptionComponent
          description={productDescript}
          setDescription={setProductDescript}
          sector={sector}
          setSector={setSector}
        />
        <div className="px-[30px] pt-[10px] pb-[40px] flex flex-col space-y-1">
          <InputBoxComponent
            error={productDescriptErr}
            onChange={(event) => setProductDescript(JSON.parse(event.target.value))}
            label=""
            multiline={10}
            value={productDescript.toString()}
          />

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

export default ProductDescriptionDetailEditComponent;
