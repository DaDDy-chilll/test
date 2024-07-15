import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Product } from "@/types/product/product";

interface SubCategory {
  product_sub_category_id: number;
  name: string;
}

interface Category {
  product_category_id: number;
  product_category_name: string;
  product_sub_category: Array<SubCategory>;
}

interface InfoDetailDialog {
  setOpenInfoDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product | undefined;
  categories: Array<Category>;
}

const ProductInfoDetailComponent = ({
  setOpenInfoDetailDialog,
  product
}: InfoDetailDialog) => {
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="w-full flex justify-between">
        <p className="text-textBlue text-[20px] font-semibold">商品情報</p>
        <EditIcon
          className="opacity-80 cursor-pointer"
          onClick={() => setOpenInfoDetailDialog((prev) => (prev = !prev))}
        />
      </div>

      <SizeBox h={30} />
      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">商品名</p>
          <p className=" font-thin text-xs">{product?.product_name}</p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">商品名(カナ)</p>
          <p className=" font-thin text-xs">{product?.product_name_kana}</p>
        </div>
      </div>
      <SizeBox h={36} />
      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">商品タイトル</p>
          <p className=" font-thin text-xs">{product?.title}</p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">ステータス</p>
          <p className=" font-thin text-xs ">
            {product?.status === 1 ? "公開" : "非公開"}
          </p>
        </div>
      </div>
      <SizeBox h={36} />
      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">商品カテゴリ</p>
          <p className=" font-thin text-xs">{product?.product_category_name}</p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">サブカテゴリ</p>
          <p className=" font-thin text-xs">{product?.product_subcategory_name}</p>
        </div>
      </div>
      <SizeBox h={36} />
      <div className="flex flex-row items-start">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">商品コード</p>
          <p className=" font-thin text-xs">{product?.product_code}</p>
        </div>
        <SizeBox w={50} />
        {/* Switch */}
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">備考</p>
          <div>
            <p className=" font-thin text-xs">{product?.bikou}</p>
          </div>
        </div>
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default ProductInfoDetailComponent;
