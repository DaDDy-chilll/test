import { Dispatch, SetStateAction } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import Helper from "@/helpers";
import aws from "@/aws";

interface ShippingMenuProps {
  openDialog: Dispatch<SetStateAction<boolean>>;
  productList:any;
}
const ShippingMenu = ({ 
  openDialog,
  productList
 }: ShippingMenuProps) => {
  return (
    <div className="flex flex-row justify-between bg-white mx-[25px] px-[28px] py-6 rounded-md">
      <div className="flex space-x-5 items-center">
        <img
          src={aws.s3.getUrl({ key: productList.img_url})}
          alt="Product image"
          width={300}
          height={300}
        />

        <div className="text-black space-y-4">
          <p className="font-semibold">{productList.product_name}</p>
          <p>{productList.title}</p>
          <p>{productList.product_code}</p>
          <p>
            {Helper.japaneseNumberFormat({
              number: Math.round(productList.price),
            })}
          </p>
        </div>
      </div>

        <div onClick={() => openDialog(true)}>
          <TuneIcon fontSize="large" className="opacity-80 nav text-[#285dbd]" />
        </div>
    </div>
  );
};

export default ShippingMenu;
