import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Cart, Product } from "@/models/dataModel";
import { productList } from "@/const/admin/product/product_list";
import Helper from "@/helpers";
import { Dispatch, SetStateAction } from "react";
type CartDetailProps = {
  setTab: Dispatch<SetStateAction<number>>;
  carts: Array<Cart>;
  increaseProductQty: (productId: number) => void;
  decreaseProductQty: (productId: number) => void;
};
const CartDetailComponent = ({
  carts,
  setTab,
  increaseProductQty,
  decreaseProductQty,
}: CartDetailProps) => {
  const calcTaxAndTotal = () => {
    let total = 0;
    let tax = 0;
    carts.map(({ productId, qty }: Cart) => {
      const { sellPrice }: Product = productList.filter(
        (p: Product) => p.productId === productId
      )[0];

      total += sellPrice * qty;
      tax += sellPrice * qty * 0.1;
      total += sellPrice * qty * 0.1;
    });
    return { total, tax };
  };

  return (
    <div>
      <div className="text-[13px] font-bold mb-[20px]">
        カードにある商品（2個）
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <table className="w-[100%] table-auto border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="w-[50%] text-left font-bold border-[0.5px] border-[#000] border-opacity-30 p-[20px]">
                  商品
                </th>
                <th className="w-[20%] text-left font-bold border-[0.5px] border-[#000] border-opacity-30 p-[20px]">
                  価格
                </th>
                <th className="w-[20%] text-left font-bold border-[0.5px] border-[#000] border-opacity-30 p-[20px]">
                  数
                </th>
                <th className="w-[10%] text-left font-bold border-[0.5px] border-[#000] border-opacity-30 p-[20px]">
                  合計価格
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map(({ productId, qty }: Cart) => {
                const [product]: Array<Product> = productList.filter(
                  ({ productId: p }) => p === productId
                );
                return (
                  <tr key={Math.random()}>
                    <td className="border-[0.5px] border-[#000] border-opacity-30 p-[20px]">
                      <div className="flex flex-row items-center">
                        <div
                          className="flex-[97px] mr-[15px]"
                          style={{
                            background:
                              "radial-gradient(79.02% 79.01% at 50% 50%, rgba(40, 93, 189, 0.82) 0%, rgba(40, 93, 189, 0.57) 0%, rgba(40, 93, 189, 0.00) 100%)",
                          }}
                        >
                          <img
                            src={product.productPhoto[0]}
                            alt="商品画像"
                            className="w-[130px] p-[6px] mx-auto"
                          />
                        </div>
                        <div className="flex-[290px] text-[13px]">
                          <div className="font-bold mb-[5px]">
                            {product.productName}
                          </div>
                          <div className="font-normal">
                            {product.productTitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-[#000] border-opacity-30 pr-[20px] text-right">
                      {Helper.japaneseNumberFormat({
                        number: product.sellPrice,
                      })}
                    </td>
                    <td className="border-[0.5px] border-[#000] border-opacity-30 p-[20px]">
                      <div className="w-[100px] border-[0.5px] border-[#000] rounded-[3px] border-opacity-[0.3] text-center">
                        <span
                          onClick={() => decreaseProductQty(productId)}
                          className="inline-block border-r-[0.5px] border-[#000] border-opacity-[0.3] px-[3px] py-[15px]"
                        >
                          <RemoveIcon style={{ width: 25, height: 10 }} />
                        </span>
                        <span className="inline-block border-r-[0.5px] border-[#000] border-opacity-[0.3]  px-[12px] py-[15px]">
                          {qty}
                        </span>
                        <span
                          onClick={() => increaseProductQty(productId)}
                          className="inline-block px-[3px] py-[15px]"
                        >
                          <AddIcon style={{ width: 25, height: 10 }} />
                        </span>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-[#000] border-opacity-30 pr-[10px] text-right">
                      {Helper.japaneseNumberFormat({
                        number: qty * product.sellPrice,
                      })}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td
                  className="border-[0.5px] border-[#000] border-opacity-30 p-[20px]"
                  colSpan={3}
                >
                  税金（10%）
                </td>
                <td className="border-[0.5px] border-[#000] border-opacity-30 pr-[10px] text-right">
                  {Helper.japaneseNumberFormat({
                    number: calcTaxAndTotal().tax,
                  })}
                </td>
              </tr>
              <tr>
                <td
                  className="border-[0.5px] border-[#000] border-opacity-30 p-[20px]"
                  colSpan={3}
                >
                  小計（税込）
                </td>
                <td className="border-[0.5px] border-[#000] border-opacity-30 p-[10px] text-[20px] text-right">
                  {Helper.japaneseNumberFormat({
                    number: calcTaxAndTotal().total,
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ml-[30px] text-[14px] font-normal min-w-[230px]">
          <div className="px-[15px] py-[30px] rounded-[5px] bg-[#285DBD] bg-opacity-[6%]">
            <div className="">お届け日（希望の方）</div>
            <SizeBox h={10} />
            <div className="">
              <input
                type="text"
                name=""
                id=""
                className="w-full border-[1px] border-[#D9D9D9] rounded-[5px] bg-[#fff] h-[40px] px-[5px]"
              />
            </div>
            <SizeBox h={30} />
            <div className="">お届け時間</div>
            <SizeBox h={10} />
            <div className="">
              <input
                type="text"
                name=""
                id=""
                className="w-full border-[1px] border-[#D9D9D9] rounded-[5px] bg-[#fff] h-[40px] px-[5px]"
              />
            </div>
            <SizeBox h={30} />
            <Button
              onClick={() => setTab(2)}
              className="w-full h-[40px]"
              variant="contained"
              size="large"
              style={{ backgroundColor: "#285DBD" }}
            >
              支払いへ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetailComponent;
