import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Product } from "@/types/product/product";

interface ProductTagProps {
  setOpenTagDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
}

const ProductTagDetailComponent = ({
  setOpenTagDetailDialog,
  product,
}: ProductTagProps) => {
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="w-full flex justify-between">
        <p className="text-textBlue text-[20px] font-semibold">商品タグ</p>
        <EditIcon
          className="opacity-80 cursor-pointer"
          onClick={() => setOpenTagDetailDialog((prev) => (prev = !prev))}
        />
      </div>
      <SizeBox h={30} />

      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">顧客検索用タグ</p>
          <p className=" font-thin text-xs">{product.user_search_tag}</p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">商品検索用タグ</p>
          <p className=" font-thin text-xs">{product.product_search_tag}</p>
        </div>
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default ProductTagDetailComponent;
