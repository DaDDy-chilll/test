import SizeBox from "@/components/SizeBox";
import { Product } from "@/types/product/product";
import { ProductDescription } from "@/types/product/product_explain";
import EditIcon from "@mui/icons-material/Edit";
import { Card } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface DescriptionDetailDialog {
  setOpenDescriptionDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
}
 
const ProductDescriptionDetailComponent = ({
  setOpenDescriptionDetailDialog,
  product,
}: DescriptionDetailDialog) => {
  const description: Array<ProductDescription> = JSON.parse(product.description);
  //console.log("Json description data", product.description && JSON.parse(product.description).length)
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="w-full flex justify-between">
        <p className="text-textBlue text-[20px] font-semibold">商品説明</p>
        <EditIcon
          className="opacity-80 cursor-pointer"
          onClick={() =>
            setOpenDescriptionDetailDialog((prev) => (prev = !prev))
          }
        />
      </div>
      <SizeBox h={30} />
      <div className="flex flex-row">
        <div className="flex-1 space-y-3">          {
            description.map((d) => {
              return (
                <div key={Math.random()} className="relative">
                  <div className=" border-b-[0.5px] border-gray-400 my-[20px]"></div>
                  {d.mainTitle && <div className="text-[30px] font-bold py-[10px]" >{d.mainTitle}</div>}
                  {d.contents.map((c) => {
                    return (
                      <div key={Math.random()} className="py-[20px]">
                        <div className="text-[20px] font-bold py-[8px]">{c.subTitle}</div>
                        <div>
                          {
                            c.sentences.map((s) => {
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
        </div>
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default ProductDescriptionDetailComponent;
