import aws from "@/aws";
import Helper from "@/helpers";
import { OrderCancelRes } from "@/types/order/order-decline/order_decline";
import { format } from "date-fns";
import { useState } from "react";
import { Customer, Detail } from "../OrderScreen";
import { Divider } from "@mui/material";
import CustomerInfoDialogComponent from "@/components/user/order/CustomerInfoDialogComponent";
import SizeBox from "@/components/SizeBox";

interface OrderCancelHistoryProps {
  declines: Array<OrderCancelRes>;
  declineTotal: (declines: OrderCancelRes[]) => {
    total: number;
    totalTax: number;
    detail: Detail[];
    getDetail: (id: number) => Detail;
  };
}

const OrderCancelHistory = ({
  declineTotal,
  declines,
}: OrderCancelHistoryProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>({
    user_name: "",
    post_code: "",
    addressName: "",
    phone: "",
  });

  return (
    <>
      <div>
        {declines.map(
          (
            { type, status, order, order_detail, created_at }: OrderCancelRes,
            index
          ) => {
            return (
              <>
                <div className="w-full space-y-8">
                  <div className="w-full rounded-md bg-white border-black border-[1px] border-opacity-20 overflow-hidden">
                    <div className="flex justify-between items-center px-10 py-6 border-black border-b-[1px] border-opacity-20 bg-[#E2EDFF] text-sm">
                      <p>
                        注文日：
                        {order?.created_at &&
                          format(new Date(order.created_at), "yyyy/MM/dd")}
                      </p>
                      <p>
                        総額：
                        {Helper.japaneseNumberFormat({
                          number: Math.round(declineTotal(declines).total),
                        })}
                      </p>
                      <p>
                        配達：
                        <span
                          onClick={() => {
                            setCustomer({
                              user_name: order?.name,
                              post_code: order?.post_code,
                              addressName: order?.address,
                              phone: order?.phone,
                            });
                            setOpenDialog(true);
                          }}
                          className="text-textBlue underline underline-offset-2 cursor-pointer"
                        >
                          {order?.name}
                        </span>
                      </p>
                      <p>注文ID：{order?.order_code}</p>
                    </div>
                   
                    <div className="space-y-6 py-4 px-6">
                      <div className="w-3/4 space-y-6">
                        <p className="text-[#FF0303CC]">
                          {format(new Date(created_at), "yyyy/MM/dd")}
                          {type === 1 ? "(キャンセル)" : "(返品)"}
                          {status === 1
                            ? "(申請中)"
                            : status === 2
                            ? "(済)"
                            : "(失敗)"}
                        </p>

                        <div className="space-y-4 pb-10">
                          
                          <div className="flex flex-col space-y-6">
                            {order_detail.map((od) => {
                              return (
                                <div className="flex space-x-5">
                                  {od.products && od.products.image_url && (
                                    <img
                                      src={aws.s3.getUrl({
                                        key: od.products?.image_url,
                                      })}
                                      alt="product photos"
                                      width={200}
                                      height={200}
                                    />
                                  )}
                                  <div className="space-y-4 text-sm">
                                    <p className="text-textBlue">
                                      {od.products?.product_name}
                                    </p>
                                    <p>
                                      {od.products?.title} X {od.product_qty} 本
                                    </p>
                                    <p>
                                      {Helper.japaneseNumberFormat({
                                        number: declineTotal(
                                          declines
                                        ).getDetail(od.order_detail_id)
                                          .includeTax,
                                      })}
                                      （税込）
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {index + 1 !== declines.length && <Divider />}
                       

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SizeBox h={10} />
              </>
            );
          }
        )}
      </div>

      <CustomerInfoDialogComponent
        openDialog={openDialog}
        customer={customer}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};
export default OrderCancelHistory;
