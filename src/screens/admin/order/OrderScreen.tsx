import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import CommonMenuComponent from "@/components/admin/common/CommonMenuComponent";
import OrderSearchComponent, {
  SearchActionType,
} from "@/components/admin/order/OrderSearchComponent";
import mutations from "@/networks/mutations";
import { OrderForCustomerRes } from "@/types/order/order";
import { format } from "date-fns";
import aws from "@/aws";
import Helper from "@/helpers";
import OrderToggle from "@/components/admin/order/OrderToogle";
import OrderDialogComponent from "@/components/admin/order/OrderDialogComponent";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";

export type OrderTotal = {
  order_id: number;
  total: number;
  tax: number;
};

const OrderScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [delivered, setDelivered] = useState<boolean>(true);
  const [orders, setOrders] = useState<Array<OrderForCustomerRes>>([]);
  const [requestorders, setRequestOrders] = useState<
    Array<OrderForCustomerRes>
  >([]);
  const [ordersTotal, setOrdersTotal] = useState<Array<OrderTotal>>([]);
  const [status, setStatus] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const [confirmText, setConfirmText] = useState<string>("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "商品一覧",
      action: () => {},
    },
  ];

  const searchAction = ({
    order_code,
    product,
    customer,
    order_date,
    payment_method,
    payment_date,
    address,
    schedule_delivery_date,
    schedule_pickedup_date,
    status,
  }: SearchActionType) => {
    mutations.admin.order
      .get({
        order_code,
        product,
        customer,
        order_date,
        payment_method,
        payment_date,
        address,
        schedule_delivery_date,
        schedule_pickedup_date,
        status,
      })
      .then((ans) => {
        console.log(ans.data);
        setOrders(ans.data);
        setRequestOrders(ans.data);
        setOpenSearchDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const detailAction = (orderDetail: OrderForCustomerRes) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.ORDER_DETAIL,
      state: {
        orderDetail,
      },
    });
  };

  const detailProductAction = (productId: number) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.PRODUCT_DETAIL,
      state: {
        productId,
      },
    });
  };

  const changeAcceptAction = (orderId: number) => {
    mutations.admin.order
      .orderInfoApproval(orderId, { order_status: 2 })
      .then((ans) => {
        console.log(ans.data);
        setOrders(
          requestorders.filter((reqorders) => {
            return reqorders.order_status != 1;
          })
        );
        setOpenConfirmDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (orders.length == 0) {
      mutations.admin.order
        .get()

        .then((ans) => {
          console.log(ans.data);

          const totals: OrderTotal[] = [];
          let totalamount = 0,
            tax = 0;
          ans.data.map((order) => {
            order.order_detail.map((orderdetail) => {
              totalamount =
                order.order_detail.length *
                orderdetail.price *
                (1 + orderdetail.tax / 100) *
                orderdetail.product_qty *
                orderdetail.subscribe_factor;
              tax = orderdetail.tax;
            });
            totals.push({
              order_id: order.order_id,
              total: totalamount,
              tax: tax,
            });
          });
          setOrdersTotal(totals);
          setOrders(ans.data);
          setRequestOrders(ans.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (status) {
      if (orderId != 0) {
        changeAcceptAction(orderId);
        requestorders.map((d) => {
          if (orderId == d.order_id) {
            d.order_status = 2;
            return d;
          }
        });
        setOrders(
          requestorders.filter((delivery) => {
            return delivery.order_status == 2;
          })
        );
      }
      setStatus(false);
    }
  }, [status]);

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <CommonMenuComponent title="注文一覧" openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <OrderToggle toggle={delivered} setToggle={setDelivered} />
      <SizeBox h={20} />

      {delivered ? (
        <div>
          <CustomPaginationTableWithPageNo
            data={requestorders.filter(
              (requestorders) => requestorders?.order_status === (1 ? 1 : 2)
            )}
            title={
              <thead className="">
                <tr className="bg-[#F6F7F8]">
                  <th
                    scope="col"
                    className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black  border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    注文コード
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 w-[300px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    商品
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    顧客名
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    注文日
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    合計金額（税込）
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    配送料
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    アクション
                  </th>
                </tr>
              </thead>
            }
            renderBody={(
              {
                customer,
                address,
                order_id,
                order_code,
                order_status,
                delivery_charges,
                schedule_pickup_date,
                schedule_pickup_time_id,
                schedule_delivery_date,
                schedule_delivery_time_id,
                created_at,
                updated_at,
                order_detail,
              }: OrderForCustomerRes,
              index: number,
              currentPage: number,
              itemsPerPage: number
            ) => (
              <tr className="nav bg-white text-gray-700 text-sm">
                <td
                  scope="row"
                  className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
                >
                  <div className="w-full text-center">
                    {order_status === 1
                      ? index + 1 + (currentPage - 1) * itemsPerPage
                      : 0}
                  </div>
                </td>
                <td
                  onClick={() =>
                    detailAction({
                      customer,
                      address,
                      order_id,
                      order_code,
                      order_status,
                      delivery_charges,
                      schedule_pickup_date,
                      schedule_pickup_time_id,
                      schedule_delivery_date,
                      schedule_delivery_time_id,
                      created_at,
                      updated_at,
                      order_detail,
                    })
                  }
                  key={Math.random()}
                  scope="row"
                  className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
                >
                  {order_code}
                </td>
                <td className="px-[8px] py-4 border-black border-b-[1px] border-opacity-20">
                  <div className="flex flex-col">
                    {order_detail.map((od) => (
                      <div className="flex flex-row mb-[10px]">
                        <div className="flex flex-col">
                          {od.products?.product_photos
                            .filter((p) => {
                              return p.main_photo === 1;
                            })
                            .map(({ img_url }, index) => {
                              if (index === 0) {
                                return (
                                  <div
                                    key={Math.random()}
                                    className="w-[150px]"
                                  >
                                    <img
                                      src={aws.s3.getUrl({ key: img_url })}
                                    />
                                  </div>
                                );
                              } else {
                                return <span key={Math.random()}></span>;
                              }
                            })}
                        </div>
                        <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                          <div
                            onClick={() => detailProductAction(od.product_id)}
                            key={Math.random()}
                            className="font-bold underline underline-offset-2 text-[#3083FF]"
                          >
                            {od.products?.product_name}
                          </div>
                          <div>{od.products?.price}</div>
                          <div>{od.product_qty}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
                >
                  <p>{customer?.user_code}</p>
                  <p>{customer?.user_name}</p>
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  {format(new Date(created_at), "yyyy/MM/dd")}
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  <div className="flex flex-row ">
                    {ordersTotal.map((order_t) => {
                      let totalamount, ordertax;
                      order_detail.map((order_d) => {
                        if (order_d.order_id === order_t.order_id) {
                          totalamount = Helper.japaneseNumberFormat({
                            number: Math.round(order_t.total),
                          });
                          ordertax = "(" + order_t.tax + "%" + ")";
                        }
                      });
                      return (
                        <div>
                          {totalamount} {ordertax}
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  {delivery_charges}
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  <div
                    onClick={() => {
                      setConfirmText("受け取ります");
                      setOpenConfirmDialog(true);
                      setOrderId(order_id);
                    }}
                    className="w-full text-center underline underline-offset-2 text-textBlue"
                  >
                    注文受け入れ
                  </div>
                </td>
              </tr>
            )}
          />
        </div>
      ) : (
        <div>
          <CustomPaginationTableWithPageNo
            data={orders.filter((orders) => orders?.order_status != 1)}
            title={
              <thead className="">
                <tr className="bg-[#F6F7F8]">
                  <th
                    scope="col"
                    className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black  border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    注文コード
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 w-[300px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    商品
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    顧客名
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    注文日
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    合計金額（税込）
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    配送料
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 whitespace-nowrap"
                  >
                    決済サービス
                  </th>
                </tr>
              </thead>
            }
            renderBody={(
              {
                customer,
                address,
                order_id,
                order_code,
                order_status,
                delivery_charges,
                schedule_pickup_date,
                schedule_pickup_time_id,
                schedule_delivery_date,
                schedule_delivery_time_id,
                created_at,
                updated_at,
                order_detail,
              }: OrderForCustomerRes,
              index: number,
              currentPage: number,
              itemsPerPage: number
            ) => (
              <tr className="nav bg-white text-gray-700 text-sm">
                <td
                  scope="row"
                  className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
                >
                  <div className="w-full text-center">
                    {order_status != 1
                      ? index + 1 + (currentPage - 1) * itemsPerPage
                      : 0}
                  </div>
                </td>
                <td
                  onClick={() =>
                    detailAction({
                      customer,
                      address,
                      order_id,
                      order_code,
                      order_status,
                      delivery_charges,
                      schedule_pickup_date,
                      schedule_pickup_time_id,
                      schedule_delivery_date,
                      schedule_delivery_time_id,
                      created_at,
                      updated_at,
                      order_detail,
                    })
                  }
                  key={Math.random()}
                  scope="row"
                  className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
                >
                  {order_code}
                </td>
                <td className="px-[8px] py-4 border-black border-b-[1px] border-opacity-20">
                  <div className="flex flex-col">
                    {order_detail.map((od) => (
                      <div className="flex flex-row mb-[10px]">
                        <div className="flex flex-col">
                          {od.products?.product_photos
                            .filter((p) => {
                              return p.main_photo === 1;
                            })
                            .map(({ img_url }, index) => {
                              if (index === 0) {
                                return (
                                  <div
                                    key={Math.random()}
                                    className="w-[150px]"
                                  >
                                    <img
                                      src={aws.s3.getUrl({ key: img_url })}
                                    />
                                  </div>
                                );
                              } else {
                                return <span key={Math.random()}></span>;
                              }
                            })}
                        </div>
                        <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                          <div
                            onClick={() => detailProductAction(od.product_id)}
                            key={Math.random()}
                            className="font-bold underline underline-offset-2 text-[#3083FF]"
                          >
                            {od.products?.product_name}
                          </div>
                          <div>{od.products?.price}</div>
                          <div>{od.product_qty}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
                >
                  <p>{customer?.user_code}</p>
                  <p>{customer?.user_name}</p>
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  {format(new Date(created_at), "yyyy/MM/dd")}
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  <div className="flex flex-row ">
                    {ordersTotal.map((order_t) => {
                      let totalamount, ordertax;
                      order_detail.map((order_d) => {
                        if (order_d.order_id === order_t.order_id) {
                          totalamount = Helper.japaneseNumberFormat({
                            number: Math.round(order_t.total),
                          });
                          ordertax = "(" + order_t.tax + "%" + ")";
                        }
                      });
                      return (
                        <div>
                          {totalamount} {ordertax}
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  {delivery_charges}
                </td>
                <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                  {"-"}
                </td>
              </tr>
            )}
          />
        </div>
      )}

      {/* 検索 */}
      <OrderSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        searchAction={searchAction}
      />

      <OrderDialogComponent
        confirmText={confirmText}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        status={status}
        setStatus={setStatus}
      />
      <SizeBox h={100} />
    </div>
  );
};

export default OrderScreen;
