import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import DeliveryMenu from "@/components/admin/delivery/DeliveryMenu";
import TagIcon from "@mui/icons-material/Tag";
import { Checkbox } from "@material-tailwind/react";
import DeliveryToggle from "@/components/admin/delivery/DeliveryToggle";
import DeliverySearchComponent, { SearchActionType } from "@/components/admin/delivery/DeliverySearchComponent";
import mutations from "@/networks/mutations";
import aws from "@/aws";
import { format } from "date-fns";
import { OrderDeliveryForCustomerRes } from "@/types/order/orderdelivery";
import FloatingActionButton from "@/components/admin/delivery/action_button/FloatingActionButton";
import FloatingActionButtonConfirm from "@/components/admin/delivery/action_button/FloatingActionButtonConfirm";
import DeliveryDialogComponent from "@/components/admin/delivery/DeliveryDialogComponent";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";
import Helper from "@/helpers";

const DeliveryScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [delivered, setDelivered] = useState<boolean>(true);
  const [deliverys, setDeliverys] = useState<Array<OrderDeliveryForCustomerRes>>([]);

  const [checkedDeliverys, setCheckedDeliverys] = useState<Array<OrderDeliveryForCustomerRes>>([]);

  const [OriginalDeliverys, setOriginalDeliverys] = useState<Array<OrderDeliveryForCustomerRes>>([]);
  const [NewDeliverys, setNewDeliverys] = useState<Array<OrderDeliveryForCustomerRes>>([]);

  const [confirmText, setConfirmText] = useState<string>("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  // Floating Action Button
  const [onAction,setOnAction] = useState<boolean>(false);

  const [onNextAction,setOnNextAction] = useState<boolean>(false);

  const [onCheckBoxAction, setOnCheckBoxAction] = useState<boolean>(true);

  // Choice OrderId
  const [selectedOrderIds,setSelectedOrderIds] = useState<Array<number>>([]);

  const [status, setStatus] = useState(false);
  const [cancelStatus, setCancelStatus] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const [orderId, setOrderId] = useState(0);

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "配達",
      action: () => {},
    },
  ];

  const searchAction  = ({customer,product,order_date,addressName,schedule_delivery_date,schedule_pickedup_date} : SearchActionType) => {
    mutations.admin.order.getDelivery({customer,product,order_date,addressName,schedule_delivery_date,schedule_pickedup_date})
      .then((ans) => {
         setDeliverys(ans.data);
         setNewDeliverys(ans.data);
         setOpenSearchDialog(false);
      } ) 
      .catch((error) => {
        console.log(error);
      })
  }

  const changeNextAction = () => {
    // const showDeliverys = deliverys.map((d) => {
    //   if (selectedOrderIds.includes(d.order_id)) {
    //     return d;
    //   } else {
    //     return null; // or any other placeholder value
    //   }
    // });
    // if(showDeliverys.length>0){}
    // // Filter out null values and update the state
    // const filteredDeliverys = showDeliverys.filter(Boolean) as OrderDeliveryForCustomerRes[];
    // setDeliverys(filteredDeliverys);
    // setOnAction(true);
    // setOnCheckBoxAction(false);

    const checkedOrders = deliverys.filter(({order_id})=>selectedOrderIds.includes(order_id));
    setCheckedDeliverys(checkedOrders);
    setOnAction(true);
    setOnCheckBoxAction(false);
  };

  const changeStatusAction = () =>{
      mutations.admin.order.updateMultiple({ order_id_list : selectedOrderIds, order_status : 3 })
      .then((ans)=>{
          OriginalDeliverys.map((d)=>{
              if(selectedOrderIds.includes(d.order_id))
              {
                d.order_status = 3;
                return d;
              }
              else{
                return d;
              }
          }); 
          setNewDeliverys(OriginalDeliverys.filter((delivery) => { return delivery.order_status == 3 }));
          setDeliverys(OriginalDeliverys.filter((delivery) => { return !ans.data.order_id_list.includes(delivery.order_id)}));
          setOnAction(false);
          setSelectedOrderIds([]);
          setOpenConfirmDialog(false);
          setOnCheckBoxAction(true);
          setOnNextAction(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const changeOriginalStatusAction = (orderId : number) =>{
    mutations.admin.order.put(orderId, { order_status: 2})
    .then((ans) =>{
      console.log(ans.data);
      setNewDeliverys(OriginalDeliverys.filter((delivery) => { return (delivery.order_status == 3 && orderId != delivery.order_id)}));
      setOpenConfirmDialog(false);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

interface onCheckActionProps {
  order_id:number,
  check: boolean,
};

  const onCheckAction = ({order_id,check}:onCheckActionProps)=>{
    if(check){
      setSelectedOrderIds([...selectedOrderIds,order_id]);

    }else{
      setSelectedOrderIds(selectedOrderIds.filter(id=>id!==order_id));
    }
    
  }

  const detailAction = (orderDetail : OrderDeliveryForCustomerRes) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.ORDER_DETAIL,
      state: {
        orderDetail
      },
    });
  } 

  const detailProductAction = (productId : number) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.PRODUCT_DETAIL,
      state: {
        productId
      },
    });
  } 

  useEffect(() => {
    if(deliverys.length == 0)
    {
      setOnNextAction(false);
    }
      mutations.admin.order.getDelivery()
        .then((ans) => {
        
         setDeliverys(ans.data);
         setNewDeliverys(ans.data);
         setOriginalDeliverys(ans.data);
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])

  useEffect(() => {
        if(status){
          if(cancelStatus == false && selectedOrderIds.length > 0)
          {
            changeStatusAction();
          }
          else{
            setOnCheckBoxAction(true);
            setSelectedOrderIds([]);
            setCheckedDeliverys([]);
            setDeliverys(OriginalDeliverys.filter((delivery) => { return delivery.order_status == 2 }));
            //setDeliverys(checkedDeliverys.filter((delivery) => { return delivery.order_status == 2 }));
            setCancelStatus(false);
            setOnAction(false);
          }
          setStatus(false);  
        }
        else{
          setOpenConfirmDialog(false);
        }
  }, [status])
  
  useEffect(() => {
    if(deliveryStatus){
      if(orderId != 0){
        changeOriginalStatusAction(orderId);
        OriginalDeliverys.map((d)=>{
          if(orderId == d.order_id)
          {
            d.order_status = 2;
            return d;
          }
        }); 
        setDeliverys(OriginalDeliverys.filter((delivery) => { return delivery.order_status == 2 }));
      }
      setDeliveryStatus(false);
    }
}, [deliveryStatus])

  useEffect(() => {
    if(selectedOrderIds.length > 0){
      setOnNextAction(true);
    }
    else{
      setOnNextAction(false);
    }
  }, [selectedOrderIds])

  const renderTable = (data: OrderDeliveryForCustomerRes[])=>{
    return (
      <CustomPaginationTableWithPageNo
        data={data}
        title={
          <thead className="">
            <tr className="bg-[#F6F7F8]">
              <th
                scope="col"
                className="px-2 py-4 w-[10px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                No
              </th>
              {onCheckBoxAction && <th scope="col"className="px-2 py-4 w-[10px] border-black border-t-[1px] border-b-[1px] border-opacity-20">
                <TagIcon fontSize="small" />
              </th>
              } 
              <th
                scope="col"
                className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                コード
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[300px] border-black  border-t-[1px] border-b-[1px] border-opacity-20"
              >
                商品
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                顧客名
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                注文日
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                配送料
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                配達先
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                出荷指示日時
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                出荷予定日時
              </th>
            </tr>
          </thead>
        }
        renderBody={({
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
        }: OrderDeliveryForCustomerRes, index : number, currentPage : number, itemsPerPage : number) => (
          <tr
            onClick={() => {}}
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm border-black border-b-[1px] border-opacity-20"
          >
            <td scope="row" className="px-6 py-8 align-top">
              {order_status === 2 ? (index + 1) + (currentPage - 1) * itemsPerPage : 0}
            </td>
            {onCheckBoxAction && <td scope="row" className="px-6 py-6 align-top">
              <Checkbox
                  checked={selectedOrderIds.includes(order_id)}
                  crossOrigin={1}
                  className="bg-white checked:bg-[#08C856] checked:border-[#08C856]"
                  onChange={(event)=>onCheckAction({order_id,check: event.currentTarget.checked})}
              />
            </td>
            }
            <td scope="row" className="px-6 py-8 align-top">
              <div className="space-y-4">
                <p  onClick= {() => detailAction({
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
                    order_detail})}
                  key={Math.random()}
                  className="underline underline-offset-2 text-textBlue leading-6">
                  注文ID： <br /> {order_code}
                </p>
                {/* <p className="underline underline-offset-2 text-textBlue leading-6">
                  出荷ID： <br /> {shippingCode}
                </p> */}
              </div>
            </td>
            <td className="px-[8px] py-4 align-top">
            <div className="flex flex-col">
                {
                  order_detail.map((od) => <div className="flex flex-row mb-[10px]">
                    <div className="flex flex-col"> 
                    {
                      od.products?.product_photos.filter((p)=>{
                            return p.main_photo === 1;
                      }).map(({img_url},index)=> {
                        if(index === 0){
                          return <div className="w-[150px]">
                            <img src ={aws.s3.getUrl({key:img_url})}/>
                          </div>
                        }else{
                          return <span></span>
                        }
                      })
                    }
                    </div>
                    <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                      <div onClick= {() => detailProductAction(od.product_id)}
                        key={Math.random()}
                        className="font-bold underline underline-offset-2 text-[#3083FF]">
                        {od.products?.product_name}
                      </div>
                      <div>
                        {od.products?.price}
                      </div>
                      <div>
                        {od.product_qty}
                      </div>
                    </div>
                  </div>
                  )
                }
              </div>
            </td>
            <td className="px-2 py-8 align-top">
              <p>{customer?.user_code}</p>
              <p>{customer?.user_name}</p>
            </td>
            <td className="px-2 py-8 align-top">
              <div className="w-full text-center">{format(new Date(created_at), "yyyy/MM/dd")}</div>
            </td>
            <td className="px-2 py-8 align-top">
              <div className="w-full text-center">{delivery_charges}</div>
            </td>
            <td className="px-2 py-8 align-top">
              <div className="w-full text-center">
                <p>{address?.post_code}</p>
                <p>{address?.name}</p>
                <p>{address?.address_name}</p>
              </div>
            </td>
            <td className="px-2 py-8 align-top">
              <div className="w-full text-center">{schedule_pickup_date}</div>
            </td>
            <td className="px-2 py-8 align-top">
              <div className="w-full text-center">{schedule_delivery_date}</div>
            </td>
          </tr>
        )}
      />
    )
  }

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <DeliveryMenu title="配達" openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <DeliveryToggle toggle={delivered} setToggle={setDelivered}/>
      <SizeBox h={20} />

      {
        delivered ?
        <div>
          {
            checkedDeliverys.length===0 && renderTable( deliverys.filter((delivery) => delivery?.order_status === (2 ? 2 : 3)) )
          }
          {
            checkedDeliverys.length>0 && renderTable( checkedDeliverys )
          }
          {/* {
            checkedDeliverys.length===0?
              renderTable( deliverys.filter((delivery) => delivery?.order_status === (2 ? 2 : 3)) )
              : renderTable( checkedDeliverys )
          } */}
          
          <div className="relative">
            {
              onAction?
              <FloatingActionButtonConfirm 
              onCancel={()=>{ 
                setConfirmText("キャンセルします。");
                setOpenConfirmDialog(true);
                setCancelStatus(true);
                }
              } 
              onClick={()=>{ 
                  setConfirmText("確定します。");
                  setOpenConfirmDialog(true);}
              }/>
              : onNextAction?
              <FloatingActionButton onClick={changeNextAction} title="次へ"/>
              :
              <FloatingActionButton onClick={()=>setOnAction(false)} title="次へ"/>
            }
          </div>
        </div>
        :<div>
             <CustomPaginationTableWithPageNo
            data={NewDeliverys.filter(
              (NewDeliverys) => NewDeliverys?.order_status === (3 ? 3 : 2)
            )}
            title={
              <thead className="">
                <tr className="bg-[#F6F7F8]">
                  <th
                    scope="col"
                    className="px-2 py-4 w-[10px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    コード
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 w-[300px] border-black  border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    商品
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    顧客名
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    注文日
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    配送料
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    配達先
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    出荷指示日時
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                  >
                    出荷予定日時
                  </th>
                    <th
                      scope="col"
                      className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
                    >
                      ステータス
                    </th>
                </tr>
              </thead>
            }
            renderBody={({
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
              order_detail
            }: OrderDeliveryForCustomerRes,index : number, currentPage : number, itemsPerPage : number) => (
              <tr
                onClick={() => {}}
                key={Math.random()}
                className="nav bg-white text-gray-700 text-sm border-black border-b-[1px] border-opacity-20"
              >
                <td scope="row" className="px-6 py-8 align-top">
                {order_status === 3 ? (index + 1) + (currentPage - 1) * itemsPerPage : 0}
                </td>
                <td scope="row" className="px-6 py-8 align-top">
                  <div className="space-y-4">
                    <p  onClick= {() => detailAction({
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
                        order_detail})}
                      key={Math.random()}
                      className="underline underline-offset-2 text-textBlue leading-6">
                      注文ID： <br /> {order_code}
                    </p>
                    {/* <p className="underline underline-offset-2 text-textBlue leading-6">
                      出荷ID： <br /> {shippingCode}
                    </p> */}
                  </div>
                </td>
                <td className="px-[8px] py-4 align-top">
                <div className="flex flex-col">
                    {
                      order_detail.map((od) => <div className="flex flex-row mb-[10px]">
                        <div className="flex flex-col"> 
                        {
                          od.products?.product_photos.filter((p)=>{
                                return p.main_photo === 1;
                          }).map(({img_url},index)=> {
                            if(index === 0){
                              return <div className="w-[150px]">
                                <img src ={aws.s3.getUrl({key:img_url})}/>
                              </div>
                            }else{
                              return <span></span>
                            }
                          })
                        }
                        
                        </div>
                        <div className="flex flex-col justify-center ml-[16px] text-sm space-y-4">
                          <div onClick= {() => detailProductAction(od.product_id)}
                            key={Math.random()}
                            className="font-bold underline underline-offset-2 text-[#3083FF]">
                            {od.products?.product_name}
                          </div>
                          <div>
                            {od.products?.price}
                          </div>
                          <div>
                            {od.product_qty}
                          </div>
                        </div>
                      </div>
                      )
                    }
                  </div>
                </td>
                <td className="px-2 py-8 align-top">
                  <p>{customer?.user_code}</p>
                  <p>{customer?.user_name}</p>
                </td>
                <td className="px-2 py-8 align-top">
                  <div className="w-full text-center">{format(new Date(created_at), "yyyy/MM/dd")}</div>
                </td>
                <td className="px-2 py-8 align-top">
                  <div className="w-full text-center">{delivery_charges}</div>
                </td>
                <td className="px-2 py-8 align-top">
                  <div className="w-full text-center">
                    <p>{address?.post_code}</p>
                    <p>{address?.name}</p>
                    <p>{address?.address_name}</p>
                  </div>
                </td>
                <td className="px-2 py-8 align-top">
                  <div className="w-full text-center">{schedule_pickup_date}</div>
                </td>
                <td className="px-2 py-8 align-top">
                  <div className="w-full text-center">{schedule_delivery_date}</div>
                </td>
                <td className="px-2 py-8 align-top">
                  <div onClick = {()=>{
                    setConfirmText("確認します");
                    setOpenConfirmDialog(true);
                    setOrderId(order_id);
                  }
                   
                    } className="w-full text-center underline underline-offset-2 text-textBlue">未配達に戻す</div>
                </td>
              </tr>
            )}
          />
        </div>
      }
     
      {/* 検索 */}
      <DeliverySearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        searchAction ={searchAction}
      />
      <SizeBox h={100} />

      <DeliveryDialogComponent
        confirmText={confirmText}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}   
        changeStatusAction={changeStatusAction}
        status={status}
        setStatus={setStatus}
        deliveryStatus={deliveryStatus}
        setDeliveryStatus={setDeliveryStatus}
      />
     
    </div>
  );
};

export default DeliveryScreen;
