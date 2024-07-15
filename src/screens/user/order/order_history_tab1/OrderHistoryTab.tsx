import { OrderDetailForCustomerRes, OrderForCustomerRes } from "@/types/order/order";
import Helper from "@/helpers";
import { format } from "date-fns";
import { Dispatch,SetStateAction } from "react";
import { Customer, Detail } from "../OrderScreen";
import { Divider } from "@mui/material";
import aws from "@/aws";
import SizeBox from "@/components/SizeBox";

interface OrderHistoryTabProps {
    orders: Array<OrderForCustomerRes>;
    setCustomer: Dispatch<SetStateAction<Customer>>;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    grandTotal: (orderDetails: OrderDetailForCustomerRes[]) => {
        total: number;
        totalTax: number;
        detail: Detail[];
        getDetail: (id: number) => Detail;
    };
    detailAction: (deliveryDetail: OrderForCustomerRes) => void;
    ReturnProductsAction: (orderInfoDetail: OrderForCustomerRes) => void;
    CancelProductsAction: (orderInfoDetail: OrderForCustomerRes) => void;
    orderDetailAction: (orderDetail: OrderForCustomerRes) => void;
}

const OrderHistoryTab = ({
    orders,
    setOpenDialog,
    grandTotal,
    setCustomer,
    detailAction,
    ReturnProductsAction,
    CancelProductsAction,
    orderDetailAction
}:OrderHistoryTabProps)=>{
    return (
        <div>
        {orders.map(
        ({
          customer,
          address ,
          order_id , 
          order_code,  
          order_status,  
          delivery_charges,  
          schedule_pickup_date ,
          schedule_pickup_time_id , 
          schedule_delivery_date  ,
          schedule_delivery_time_id  ,
          created_at ,  
          updated_at,  
          order_detail,
        }: OrderForCustomerRes) => {
        return (
          <div>
            {
              <div>
                {order_status === 1 && (
                    <div className="w-full space-y-8">
                    <div className="w-full rounded-md bg-white border-black border-[1px] border-opacity-20 overflow-hidden">
                      <div className="flex justify-between items-center px-10 py-6 border-black border-b-[1px] border-opacity-20 bg-[#E2EDFF] text-sm">
                        <p>注文日： {format(new Date(created_at), "yyyy/MM/dd")} </p> 
                        <p>総額：
                         {
                           Helper.japaneseNumberFormat({number: Math.round((grandTotal(order_detail).total))})
                         }
                        </p>
                        <p>
                          配達：
                          <span
                            onClick={() => {
                              setCustomer({
                                user_name: customer?.user_name,
                                post_code: address?.post_code, 
                                name: address?.name, 
                                addressName: address?.address_name, 
                                phone: customer?.phone
                              });
                              setOpenDialog(true);
                            }
                            }
                            className="text-primaryColor underline underline-offset-2 cursor-pointer"
                          >
                            {customer?.user_name}
                          </span>
                        </p>
                        <p>注文ID：{order_code}</p>
                        <p
                          onClick={() => orderDetailAction({
                           customer,
                           address ,
                           order_id , 
                           order_code,  
                           order_status,  
                           delivery_charges,  
                           schedule_pickup_date ,
                           schedule_pickup_time_id , 
                           schedule_delivery_date  ,
                           schedule_delivery_time_id  ,
                           created_at ,  
                           updated_at,  
                           order_detail,
                         })}
                          className="text-primaryColor underline underline-offset-2 cursor-pointer"
                        >
                          注文詳細
                        </p>
                        <p className="text-primaryColor underline underline-offset-2">
                          領収書
                        </p>
                      </div>
                      <div className="flex space-x-6 py-4 px-6">
                        <div className="w-3/4 space-y-6">
                          <p className="text-primaryColor">注文完了</p>
                            <div>
                              <div className="space-y-4 pb-10">

                              {
                                  order_detail.map((od,index) => <div className="flex flex-row mb-[10px]">
                                    <>
                                    <div className="flex flex-col"> 
                                    {
                                      od.products?.product_photos.filter((p)=>{
                                            return p.main_photo === 1;
                                      }).map(({img_url},index)=> index === 0 ? <img src ={aws.s3.getUrl({key:img_url})}  width="200px"
                                      height="200px"/> : <span></span>)
                                    }
                                    </div>
                                    <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                                      <div className="font-bold underline underline-offset-2 text-primaryColor">
                                        {od.products?.product_name}
                                      </div>
                                      <div>
                                       {od.products?.title} X {od.product_qty} 本
                                      </div>
                                      <div>
                                          {
                                           Helper.japaneseNumberFormat({
                                             number: grandTotal(order_detail).getDetail(od.order_detail_id).includeTax
                                           })}（税込）
                                           {
                                             od.subscribe_factor < 1 ? "(定期購入)" : " "
                                           }
                                      </div>
                                    </div>
                                    {index + 1 !== orders.length && <Divider />}
                                    </>
                                  </div>                               
                                  )}
                              </div>
                            </div>
                        </div>
                        <div className="w-1/4 space-y-4 pt-6">
                          <div
                            onClick={() => 
                                detailAction({
                                  customer,
                                  address ,
                                  order_id , 
                                  order_code,  
                                  order_status,  
                                  delivery_charges,  
                                  schedule_pickup_date ,
                                  schedule_pickup_time_id , 
                                  schedule_delivery_date  ,
                                  schedule_delivery_time_id  ,
                                  created_at ,  
                                  updated_at,  
                                  order_detail,
                                })
                              }
                            className="w-full py-2 rounded-md flex justify-center items-center bg-white border-black border-[1px] border-opacity-20 cursor-pointer text-sm"
                          >
                            <p>配達情報</p>
                          </div>
                          <div
                            onClick={() =>  
                             order_status > 3
                             ? ReturnProductsAction({
                                 customer,
                                  address ,
                                  order_id , 
                                  order_code,  
                                  order_status,  
                                  delivery_charges,  
                                  schedule_pickup_date ,
                                  schedule_pickup_time_id , 
                                  schedule_delivery_date  ,
                                  schedule_delivery_time_id  ,
                                  created_at ,  
                                  updated_at,  
                                  order_detail,
                             })
                             :
                             <div></div>
                           }
                              className={`w-full py-2 rounded-md flex justify-center items-center ${
                               order_status > 3 ? 'bg-white cursor-pointer' :'bg-gray-300 cursor-not-allowed'
                             } border-black border-[1px] border-opacity-20 text-sm`}>
                            <p>返品</p>
                          </div>
                           
                          <div
                            onClick={() => 
                             order_status < 4
                             ? CancelProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                           className={`w-full py-2 rounded-md flex justify-center items-center ${
                             order_status < 4 ? 'bg-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
                           } border-black border-[1px] border-opacity-20 text-sm`}
                          >
                            <p>キャンセル</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {order_status === 2 && (
                    <div className="w-full space-y-8">
                    <div className="w-full rounded-md bg-white border-black border-[1px] border-opacity-20 overflow-hidden">
                      <div className="flex justify-between items-center px-10 py-6 border-black border-b-[1px] border-opacity-20 bg-[#E2EDFF] text-sm">
                        <p>注文日： {format(new Date(created_at), "yyyy/MM/dd")} </p> 
                        <p>総額： {
                           Helper.japaneseNumberFormat({number: Math.round((grandTotal(order_detail).total))})
                         }
                        </p>
                        <p>
                          配達：
                          <span
                            onClick={() => {
                              setCustomer({
                                user_name: customer?.user_name,
                                post_code: address?.post_code, 
                                name: address?.name, 
                                addressName: address?.address_name, 
                                phone: customer?.phone
                              });
                              setOpenDialog(true);
                            }
                            }
                            className="text-primaryColor underline underline-offset-2 cursor-pointer"
                          >
                            {customer?.user_name}
                          </span>
                        </p>
                        <p>注文ID：{order_code}</p>
                        <p
                           onClick={() => orderDetailAction({
                             customer,
                             address ,
                             order_id , 
                             order_code,  
                             order_status,  
                             delivery_charges,  
                             schedule_pickup_date ,
                             schedule_pickup_time_id , 
                             schedule_delivery_date  ,
                             schedule_delivery_time_id  ,
                             created_at ,  
                             updated_at,  
                             order_detail,
                           })}
                          className="text-primaryColor underline underline-offset-2 cursor-pointer"
                        >
                          注文詳細
                        </p>
                        <p className="text-primaryColor underline underline-offset-2">
                          領収書
                        </p>
                      </div>
                      <div className="flex space-x-6 py-4 px-6">
                        <div className="w-3/4 space-y-6">
                          <p className="text-[#08C856]">{schedule_delivery_date}（配達準備）</p>
                            <div>
                              <div className="space-y-4 pb-10">

                              {
                                  order_detail.map((od,index) => <div className="flex flex-row mb-[10px]">
                                    <>
                                    <div className="flex flex-col"> 
                                    {
                                      od.products?.product_photos.filter((p)=>{
                                            return p.main_photo === 1;
                                      }).map(({img_url},index)=> index === 0 ? <img src ={aws.s3.getUrl({key:img_url})}  width="200px"
                                      height="200px"/> : <span></span>)
                                    }
                                    </div>
                                    <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                                      <div className="font-bold underline underline-offset-2 text-[#3083FF]">
                                        {od.products?.product_name}
                                      </div>
                                      <div>
                                       {od.products?.title} X {od.product_qty} 本
                                      </div>
                                      <div>
                                      {Helper.japaneseNumberFormat({
                                             number: grandTotal(order_detail).getDetail(od.order_detail_id).includeTax
                                           })}（税込）
                                       {
                                         od.subscribe_factor < 1 ? "(定期購入)" : " "
                                       }
                                      </div>
                                    </div>
                                    {index + 1 !== orders.length && <Divider />}
                                    </>
                                  </div>                               
                                  )}
                              </div>
                            </div>
                        </div>
                        <div className="w-1/4 space-y-4 pt-6">
                          <div
                            onClick={() => 
                              detailAction({
                                customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                              })
                            }
                            className="w-full py-2 rounded-md flex justify-center items-center bg-white border-black border-[1px] border-opacity-20 cursor-pointer text-sm"
                          >
                            <p>配達情報</p>
                          </div>
                          <div
                            onClick={() =>  
                             order_status > 3
                             ? ReturnProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                              className={`w-full py-2 rounded-md flex justify-center items-center ${
                               order_status > 3 ? 'bg-white cursor-pointer' :'bg-gray-300 cursor-not-allowed'
                             } border-black border-[1px] border-opacity-20 text-sm`}>
                            <p>返品</p>
                          </div>
                           
                          <div
                            onClick={() => 
                             order_status < 4
                             ?  CancelProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                           className={`w-full py-2 rounded-md flex justify-center items-center ${
                             order_status < 4 ? 'bg-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
                           } border-black border-[1px] border-opacity-20 text-sm`}
                          >
                            <p>キャンセル</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                )}

                {order_status === 3 &&(
                    <div className="w-full space-y-8">
                    <div className="w-full rounded-md bg-white border-black border-[1px] border-opacity-20 overflow-hidden">
                      <div className="flex justify-between items-center px-10 py-6 border-black border-b-[1px] border-opacity-20 bg-[#E2EDFF] text-sm">
                        <p>注文日： {format(new Date(created_at), "yyyy/MM/dd")} </p> 
                        <p>総額： {
                           Helper.japaneseNumberFormat({number: Math.round((grandTotal(order_detail).total))})
                         }
                        </p>
                        <p>
                          配達：
                          <span
                            onClick={() => {
                              setCustomer({
                                user_name: customer?.user_name,
                                post_code: address?.post_code, 
                                name: address?.name, 
                                addressName: address?.address_name, 
                                phone: customer?.phone
                              });
                              setOpenDialog(true);
                            }
                            }
                            className="text-primaryColor underline underline-offset-2 cursor-pointer"
                          >
                            {customer?.user_name}
                          </span>
                        </p>
                        <p>注文ID：{order_code}</p>
                        <p
                           onClick={() => orderDetailAction({
                             customer,
                             address ,
                             order_id , 
                             order_code,  
                             order_status,  
                             delivery_charges,  
                             schedule_pickup_date ,
                             schedule_pickup_time_id , 
                             schedule_delivery_date  ,
                             schedule_delivery_time_id  ,
                             created_at ,  
                             updated_at,  
                             order_detail,
                           })}
                          className="text-primaryColor underline underline-offset-2 cursor-pointer"
                        >
                          注文詳細
                        </p>
                        <p className="text-primaryColor underline underline-offset-2">
                          領収書
                        </p>
                      </div>
                      <div className="flex space-x-6 py-4 px-6">
                        <div className="w-3/4 space-y-6">
                          <p className="text-[#08C856]">配達中</p>
                            <div>
                              <div className="space-y-4 pb-10">

                              {
                                  order_detail.map((od,index) => <div className="flex flex-row mb-[10px]">
                                    <>
                                    <div className="flex flex-col"> 
                                    {
                                      od.products?.product_photos.filter((p)=>{
                                            return p.main_photo === 1;
                                      }).map(({img_url},index)=> index === 0 ? <img src ={aws.s3.getUrl({key:img_url})}  width="200px"
                                      height="200px"/> : <span></span>)
                                    }
                                    </div>
                                    <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                                      <div className="font-bold underline underline-offset-2 text-[#3083FF]">
                                        {od.products?.product_name}
                                      </div>
                                      <div>
                                       {od.products?.title} X {od.product_qty} 本
                                      </div>
                                      <div>
                                      {Helper.japaneseNumberFormat({
                                             number: grandTotal(order_detail).getDetail(od.order_detail_id).includeTax
                                       })}（税込）
                                       {
                                         od.subscribe_factor < 1 ? "(定期購入)" : " "
                                       }
                                      </div>
                                    </div>
                                    {index + 1 !== orders.length && <Divider />}
                                    </>
                                  </div>                               
                                  )}
                              </div>
                            </div>
                        </div>
                        <div className="w-1/4 space-y-4 pt-6">
                          <div
                              onClick={() => 
                                detailAction({
                                  customer,
                                  address ,
                                  order_id , 
                                  order_code,  
                                  order_status,  
                                  delivery_charges,  
                                  schedule_pickup_date ,
                                  schedule_pickup_time_id , 
                                  schedule_delivery_date  ,
                                  schedule_delivery_time_id  ,
                                  created_at ,  
                                  updated_at,  
                                  order_detail,
                                })
                              }
                            className="w-full py-2 rounded-md flex justify-center items-center bg-white border-black border-[1px] border-opacity-20 cursor-pointer text-sm"
                          >
                            <p>配達情報</p>
                          </div>
                          <div
                            onClick={() =>  
                             order_status > 3
                             ?  ReturnProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                              className={`w-full py-2 rounded-md flex justify-center items-center ${
                               order_status > 3 ? 'bg-white cursor-pointer' :'bg-gray-300 cursor-not-allowed'
                             } border-black border-[1px] border-opacity-20 text-sm`}>
                            <p>返品</p>
                          </div>
                           
                          <div
                            onClick={() => 
                             order_status < 4
                             ?  CancelProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                           className={`w-full py-2 rounded-md flex justify-center items-center ${
                             order_status < 4 ? 'bg-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
                           } border-black border-[1px] border-opacity-20 text-sm`}
                          >
                            <p>キャンセル</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                )}

                {order_status === 4 &&(
                  <div className="w-full space-y-8">
                  <div className="w-full rounded-md bg-white border-black border-[1px] border-opacity-20 overflow-hidden">
                    <div className="flex justify-between items-center px-10 py-6 border-black border-b-[1px] border-opacity-20 bg-[#E2EDFF] text-sm">
                      <p>注文日： {format(new Date(created_at), "yyyy/MM/dd")} </p> 
                      <p>総額： {
                           Helper.japaneseNumberFormat({number: Math.round((grandTotal(order_detail).total))})
                         }
                      </p>
                      <p>
                        配達：
                        <span
                        onClick={() => {
                          setCustomer({
                            user_name: customer?.user_name,
                            post_code: address?.post_code, 
                            name: address?.name, 
                            addressName: address?.address_name, 
                            phone: customer?.phone
                          });
                          setOpenDialog(true);
                        }
                        }
                          className="text-primaryColor underline underline-offset-2 cursor-pointer"
                        >
                          {customer?.user_name}
                        </span>
                      </p>
                      <p>注文ID：{order_code}</p>
                      <p
                        onClick={() => orderDetailAction({
                         customer,
                         address ,
                         order_id , 
                         order_code,  
                         order_status,  
                         delivery_charges,  
                         schedule_pickup_date ,
                         schedule_pickup_time_id , 
                         schedule_delivery_date  ,
                         schedule_delivery_time_id  ,
                         created_at ,  
                         updated_at,  
                         order_detail,
                       })}
                        className="text-primaryColor underline underline-offset-2 cursor-pointer"
                      >
                        注文詳細
                      </p>
                      <p className="text-primaryColor underline underline-offset-2">
                        領収書
                      </p>
                    </div>
                    <div className="flex space-x-6 py-4 px-6">
                      <div className="w-3/4 space-y-6">
                        <p className="text-[#08C856]">配達</p>
                          <div>
                            <div className="space-y-4 pb-10">

                            {
                                order_detail.map((od,index) => <div className="flex flex-row mb-[10px]">
                                  <>
                                  <div className="flex flex-col"> 
                                  {
                                    od.products?.product_photos.filter((p)=>{
                                          return p.main_photo === 1;
                                    }).map(({img_url},index)=> index === 0 ? <img src ={aws.s3.getUrl({key:img_url})}  width="200px"
                                    height="200px"/> : <span></span>)
                                  }
                                  </div>
                                  <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                                    <div className="font-bold underline underline-offset-2 text-[#3083FF]">
                                      {od.products?.product_name} 
                                    </div>
                                    <div>
                                      {od.products?.title} X {od.product_qty} 本
                                    </div>
                                    <div>
                                    { Helper.japaneseNumberFormat({
                                             number: grandTotal(order_detail).getDetail(od.order_detail_id).includeTax
                                           })}（税込）
                                     {
                                       od.subscribe_factor < 1 ? "(定期購入)" : " "
                                     }
                                    </div>
                                  </div>
                                  {index + 1 !== orders.length && <Divider />}
                                  </>
                                </div>                               
                                )}
                            </div>
                          </div>
                      </div>
                      <div className="w-1/4 space-y-4 pt-6">
                        <div
                          onClick={() => 
                            detailAction({
                              customer,
                              address ,
                              order_id , 
                              order_code,  
                              order_status,  
                              delivery_charges,  
                              schedule_pickup_date ,
                              schedule_pickup_time_id , 
                              schedule_delivery_date  ,
                              schedule_delivery_time_id  ,
                              created_at ,  
                              updated_at,  
                              order_detail,
                            })
                          }
                          className="w-full py-2 rounded-md flex justify-center items-center bg-white border-black border-[1px] border-opacity-20 cursor-pointer text-sm"
                        >
                          <p>配達情報</p>
                        </div>
                        <div
                            onClick={() =>  
                             order_status > 3
                             ?  ReturnProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                              className={`w-full py-2 rounded-md flex justify-center items-center ${
                               order_status > 3 ? 'bg-white cursor-pointer' :'bg-gray-300 cursor-not-allowed'
                             } border-black border-[1px] border-opacity-20 text-sm`}>
                            <p>返品</p>
                          </div>
                           
                          <div
                            onClick={() => 
                             order_status < 4
                             ?  CancelProductsAction({
                               customer,
                                address ,
                                order_id , 
                                order_code,  
                                order_status,  
                                delivery_charges,  
                                schedule_pickup_date ,
                                schedule_pickup_time_id , 
                                schedule_delivery_date  ,
                                schedule_delivery_time_id  ,
                                created_at ,  
                                updated_at,  
                                order_detail,
                           })
                             :
                             <div></div>
                           }
                           className={`w-full py-2 rounded-md flex justify-center items-center ${
                             order_status < 4 ? 'bg-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
                           } border-black border-[1px] border-opacity-20 text-sm`}
                          >
                            <p>キャンセル</p>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}                           
              </div>
            }
             <SizeBox h={10} />
          </div>
          
        );
        }
      )}
    </div>

     )
}

export default OrderHistoryTab;