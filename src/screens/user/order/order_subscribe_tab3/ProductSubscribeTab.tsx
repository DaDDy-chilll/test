import SizeBox from "@/components/SizeBox";
import { ProductSubscribe } from "@/types/productsubscribe/productSubscribeRes";
import Helper from "@/helpers";
import { format } from "date-fns";
import aws from "@/aws";
import { Divider } from "@mui/material";
import { Detail, SubDetail } from "../OrderScreen";
import SubscribeCart from "./SubscribeCart";

interface SubscribeCartProps {
  subscribes: Array<ProductSubscribe>;
  historys: Array<ProductSubscribe>;
  subScribeTotal: (subscribes: ProductSubscribe[]) => {
    total: number;
    totalTax: number;
    subdetail: SubDetail[];
    getDetail: (id: number) => SubDetail;
  };
  subScribeHistoryTotal: (history: ProductSubscribe[]) => {
    total: number;
    totalTax: number;
    detail: Detail[];
    getDetail: (id: number) => Detail;
  };
  removeAction: (removeProductSubId: number) => void;
}

const ProductSubscribeTab = ({
  subscribes,
  subScribeTotal,
  historys,
  subScribeHistoryTotal,
  removeAction,
}: SubscribeCartProps) => {
  return (
    <>
      <div className="-mt-[18px] space-y-8">
        <div className="grid grid-cols-3 gap-[20px]">
          {subscribes.map((productSubscribe: ProductSubscribe) => {
            return (
              <SubscribeCart
                productSubscribe={productSubscribe}
                subScribeTotal={subScribeTotal}
                subscribes={subscribes}
                removeAction={removeAction}
              />
            );
          })}
        </div>

        <div className="w-full space-y-8">
          <div className="w-full rounded-md bg-white border-black border-[1px] border-opacity-20 overflow-hidden">
            <div className="flex justify-between items-center px-10 py-6 border-black border-b-[1px] border-opacity-20 bg-[#E2EDFF] text-sm">
              <p className="font-semibold">注文履歴</p>
            </div>

            <div className="space-y-6 py-4 px-6">
              {historys.map(
                (
                  {
                    product_qty,
                    product_name,
                    title,
                    order_detail_id,
                    img_url,
                    schedule_delivery_date,
                  }: ProductSubscribe,
                  index
                ) => {
                  return (
                    <>
                      <div className="flex space-x-10">
                        <div className="space-y-4 pt-2">
                          <p className="text-xl font-semibold">
                            {format(
                              new Date(schedule_delivery_date),
                              "yyyy/MM/dd"
                            )}
                          </p>
                          <p className="text-sm cursor-pointer">
                            次の配達数量：{product_qty} 個
                          </p>
                        </div>
                        <div className="flex space-x-6 items-center">
                          <img
                            src={aws.s3.getUrl({ key: img_url ? img_url : "" })}
                            alt="product photos"
                            width={200}
                            height={200}
                          />
                          <div className="space-y-4 text-sm">
                            <p className="text-primaryColor">{product_name}</p>
                            <p>{title}</p>
                            <p>
                              {Helper.japaneseNumberFormat({
                                number:
                                  subScribeHistoryTotal(historys).getDetail(
                                    order_detail_id
                                  ).includeTax,
                              })}
                              （税込）
                            </p>
                          </div>
                        </div>
                      </div>
                      {index + 1 !== historys.length ? (
                        <Divider />
                      ) : (
                        <SizeBox h={20} />
                      )}
                    </>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSubscribeTab;
