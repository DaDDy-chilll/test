import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types/product/product";
import Helper from "@/helpers";


interface ProductSellProps {
  setOpenSellDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
}
 
const ProductSellInfoDetailComponent = ({
  setOpenSellDetailDialog,
  product,
}: ProductSellProps) => {
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="w-full flex justify-between">
        <p className="text-textBlue text-[20px] font-semibold">販売情報</p>
        <EditIcon
          className="opacity-80 cursor-pointer"
          onClick={() => setOpenSellDetailDialog((prev) => (prev = !prev))}
        />
      </div>
      <SizeBox h={30} />

      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">仕入単価（税抜）</p>
          <p className=" font-thin text-sm">¥{product?.buy_price}</p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">販売単価（税抜）(カナ)</p>
          <p className=" font-thin text-sm">¥{product?.price}</p>
        </div>
      </div>
      <SizeBox h={36} />

      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">仕入れ単価税率</p>
          <p className=" font-thin text-sm">{product?.buy_tax}%</p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">販売単価税率</p>
          <p className=" font-thin text-sm">{product?.tax}%</p>
        </div>
      </div>
      <SizeBox h={36} />

      <div className="flex flex-row">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">仕入単価（税込）</p>
          <p className=" font-thin text-sm">
            ¥
            {Helper.calculatePercentage({
              amount: +product.buy_price,
              percent: +product.buy_tax,
            })}
          </p>
        </div>
        <SizeBox w={50} />
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">販売単価（税込）</p>
          <p className=" font-thin text-sm">
            ¥
            {Helper.calculatePercentage({
              amount: +product.price,
              percent: +product.tax,
            })}
          </p>
        </div>
      </div>
      <SizeBox h={36} />

      <div className="flex flex-row items-start">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">最低発注数量</p>
          <p className=" font-thin text-sm">{product.min_sell_amt} 個</p>
        </div>
        <SizeBox w={50} />
        {/* Switch */}
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">最高発注数量</p>
          <p className=" font-thin text-sm">{product.max_sell_amt} 個</p>
        </div>
      </div>
      <SizeBox h={36} />

      <div className="flex flex-row items-start">
        <div className="flex-1 space-y-3">
          <p className="font-semibold text-sm">購入スタイル</p>
          <p className=" font-thin text-sm">
            定期購入 （{(100-product.subscribe_factor*100)}%）, １回購入（{product.discount}%）
          </p>
        </div>
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default ProductSellInfoDetailComponent;
