import { GlobalProps } from "@/App";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Helper from "@/helpers";
import {useNavigate } from "react-router-dom";
import CustomerInfoDialogComponent from "@/components/user/order/CustomerInfoDialogComponent";
import { OrderDetailForCustomerRes, OrderForCustomerRes } from "@/types/order/order";
import mutations from "@/networks/mutations";
import { ProductSubscribe } from "@/types/productsubscribe/productSubscribeRes";
import { OrderCancelRes } from "@/types/order/order-decline/order_decline";
import OrderHistoryTab from "./order_history_tab1/OrderHistoryTab";
import SubscribeCart from "./order_subscribe_tab3/ProductSubscribeTab";
import OrderProductHistory from "./order_product_history_tab2/OrderProductHistory";
import OrderCancelHistory from "./order_cancel_history_tab4/OrderCancelHistory";
import UserLayout from "../UserLayout";

export type Customer ={
  user_name?: string;
  post_code?: string;
  name?: string;
  addressName?: string;
  phone?: string;
}

export type SearchActionType = {
  product ?: string | undefined;
  order_date ?: string | undefined;
}

export type Repurchase = {
  product_id ?: number;
  prdouct_name ?: string;
  title ?: string;
  qty ?: number;
  price ?: number;
  photoUrl ?: string;
}

export type OrderTotal = {
  order_id: number;
  total : number;
}

export type Detail = {
  orderDetailId: number;
  price: number;
  tax: number;
  includeTax: number;
};

export type SubDetail = {
  subProductId: number;
  price: number;
  tax: number;
  includeTax: number;
};


const OrderScreen = ({loginUser, changeLoginUserAction}: GlobalProps) => {
  const [activeMenu, setActiveMenu] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const [openChangeDialog, setOpenChangeDialog] = useState<boolean>(false);

  const [orders, setOrders] = useState<Array<OrderForCustomerRes>>([]);
  //const [total, setTotal] = useState<number>(0);
  //const [ordersTotal, setOrdersTotal] = useState<Array<OrderTotal>>([]);
  const [customer, setCustomer]= useState<Customer>({
    user_name: "", post_code: "", name: "", addressName: "", phone: ""
  });
  
  const [product, setProduct] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");

  const [repurchases, setRepurchases] = useState<Array<Repurchase>>([]);
  const [subscribes, setSubscribes]= useState<Array<ProductSubscribe>>([]);
  const [historys, setHistorys] = useState<Array<ProductSubscribe>>([]);
  const [declines, setDeclines] = useState<Array<OrderCancelRes>>([]);
  // const [removeSub, setRemoveSub] = useState<number>();


  const repurchase: Repurchase[] = [];
  const uniqueProductIds = new Set();


  const navigate = useNavigate();

  const subNavItems: Array<subNavItemsProp> = [
    {
      Title: HomeIcon,
      route: Routes.USER.TOP_PAGE,
    },
    {
      Title: "マイページ",
      route: Routes.USER.ACCOUNT,
    },
    {
      Title: "ご注文リスト",
      route: null,
    },
  ];

  const menus = [
    {
      text: "注文履歴",
      action: () => setActiveMenu(1),
    },
    {
      text: "再購入",
      action: () => setActiveMenu(2),
    },
    {
      text: "定期購入",
      action: () => setActiveMenu(3),
    },
    {
      text: "キャンセルした注文",
      action: () => setActiveMenu(4),
    },
  ];

  const searchBtnAction  = ({product,order_date} : SearchActionType) => {
    mutations.user.order.get({product,order_date})
      .then((ans) => {
         console.log(ans.data); 
         setOrders(ans.data);
      } ) 
      .catch((error) => {
        console.log(error);
      })
  }

  const searchAction = () => {
    searchBtnAction({product: product, order_date: orderDate});
  }

  const detailAction = (deliveryDetail : OrderForCustomerRes) => {
    Helper.navigate({
      navigate,
      path:Routes.USER.DELIVERY_STATUS,
      state: {
        deliveryDetail
      },
    });
  } 

  const ReturnProductsAction = (orderInfoDetail : OrderForCustomerRes) => {
    Helper.navigate({
      navigate,
      path:Routes.USER.RETURN_PRODUCTS,
      state: {
        orderInfoDetail
      },
    });
  } 

  const CancelProductsAction = (orderInfoDetail : OrderForCustomerRes) => {
    Helper.navigate({
      navigate,
      path:Routes.USER.CANCEL_PRODUCTS,
      state: {
        orderInfoDetail
      },
    });
  }

  const orderDetailAction = (orderDetail : OrderForCustomerRes) => {
    Helper.navigate({
      navigate,
      path: Routes.USER.ORDER_DETAIL,
      state: {
        orderDetail
      },
    });
  } 

  const getSubscribes = () =>{
    mutations.user.productSubscribe.get()
      .then((ans)=>{
        setSubscribes(ans.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  const getSubscribeHistory = () =>{
    mutations.user.productSubscribe.getSubscribeHistory()
      .then((ans)=>{
        setHistorys(ans.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  const getOrderDecline = () =>{
    mutations.user.order.getOrderCancel()
      .then((ans)=>{
        console.log(ans);
        setDeclines(ans.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  const removeAction = (removeProductSubId : number)=>{
    console.log(removeProductSubId);
    mutations.user.productSubscribe.removeProductSubscribe(removeProductSubId)

      .then((ans)=>{
        console.log(ans.data);
        const updated = subscribes.filter(({product_subscribe_id})=>{
            return(removeProductSubId != product_subscribe_id)
        })
        setSubscribes(updated);
      })
      .catch((error)=>{
        console.log(error);
      })
  }


  useEffect(() => {
    searchAction();
  }, [product, orderDate]);


  useEffect(()=>{
    orders.map((order)=>{
      order.order_detail.map((order_details)=>{
        order_details.products?.product_photos.filter((p)=>{
          return p.main_photo === 1;
    }).map(({img_url})=>{ 
        if (!uniqueProductIds.has(order_details.product_id)) {
          repurchase.push({
                  "product_id": order_details.product_id,
                  "prdouct_name":order_details.products?.product_name,
                  "title": order_details.products?.title,   
                  "qty" : order_details.product_qty,         
                  "price": grandTotal(order.order_detail).getDetail(order_details.order_detail_id).includeTax,
                  "photoUrl": img_url
           });
          
          uniqueProductIds.add(order_details.product_id);
        }
        return null;                       
      });
    });
   return null;
  })
  setRepurchases([...repurchase]);  
  },[orders]);


  useEffect(() => {
    if (orders.length == 0) {
      mutations.user.order.get()
        .then((ans) => {
          console.log(ans.data);
          setOrders(ans.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
     if (subscribes.length == 0) {
     getSubscribes();
    }
    if (historys.length == 0) {
      getSubscribeHistory();
     }
     if (declines.length == 0) {
      getOrderDecline();
     }
  }, []);

  const grandTotal = (orderDetails: OrderDetailForCustomerRes[]) => {
      let total = 0;
      let totalTax = 0;
      let detail: Array<Detail> = [];
      orderDetails.map((orderDetail) => {
        const qty = orderDetail.product_qty;
        const { tax, price, subscribe_factor, discount } = orderDetail;
        if (subscribe_factor < 1) {
          const unitPrice = Math.floor(qty * price * subscribe_factor);
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [
            ...detail,
            {
              orderDetailId: orderDetail.order_detail_id,
              price: unitPrice,
              tax: unitTax,
              includeTax: unitPrice + unitTax,
            },
          ];
        } else {
          const unitPrice = Math.floor(qty * price * (1 - discount / 100));
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [
            ...detail,
            {
              orderDetailId: orderDetail.order_detail_id,
              price: unitPrice,
              tax: unitTax,
              includeTax: unitPrice + unitTax,
            },
          ];
        }
      });
      return { total, totalTax, detail, getDetail: (id:number)=>detail.filter(({orderDetailId})=>orderDetailId===id)[0] };
  
  };



  const declineTotal = (declines: OrderCancelRes[]) => {
    let total = 0;
    let totalTax = 0;
    let detail: Array<Detail> = [];
    declines.map((decline) => {
      decline.order_detail.map((od)=>{
        const qty = od.product_qty;
        const { tax, price, subscribe_factor, discount } = od;
        if (subscribe_factor < 1) {
          const unitPrice = Math.floor(qty * price * subscribe_factor);
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [
            ...detail,
            {
              orderDetailId: od.order_detail_id,
              price: unitPrice,
              tax: unitTax,
              includeTax: unitPrice + unitTax,
            },
          ];
        } else {
          const unitPrice = Math.floor(qty * price * (1 - discount / 100));
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [
            ...detail,
            {
              orderDetailId: od.order_detail_id,
              price: unitPrice,
              tax: unitTax,
              includeTax: unitPrice + unitTax,
            },
          ];
        }
      })
    
    });
   
    return { total, totalTax, detail, getDetail: (id:number)=>detail.filter(({orderDetailId})=>orderDetailId===id)[0] };
};

const subScribeTotal = (subscribes: ProductSubscribe[]) => {
  let total = 0;
  let totalTax = 0;
  let subdetail: Array<SubDetail> = [];
  subscribes.map((subscribe) => {
    const qty = subscribe.product_qty;
    const { tax, price } = subscribe;

      const unitPrice = Math.floor(qty * price );
      const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
      total += unitPrice + unitTax;
      totalTax += unitTax;
      subdetail = [
        ...subdetail,
        {
          subProductId: subscribe.product_id,
          price: unitPrice,
          tax: unitTax,
          includeTax: unitPrice + unitTax,
        },
      ];
  });
  return { total, totalTax, subdetail, getDetail: (id:number)=>subdetail.filter(({subProductId})=>subProductId===id)[0] };

};

const subScribeHistoryTotal = (historys: ProductSubscribe[]) => {
  let total = 0;
  let totalTax = 0;
  let detail: Array<Detail> = [];
  historys.map((history) => {
    const qty = history.product_qty;
    const { tax, price, subscribe_factor, discount } = history;
    if (subscribe_factor < 1) {
      const unitPrice = Math.floor(qty * price * subscribe_factor);
      const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
      total += unitPrice + unitTax;
      totalTax += unitTax;
      detail = [
        ...detail,
        {
          orderDetailId: history.order_detail_id,
          price: unitPrice,
          tax: unitTax,
          includeTax: unitPrice + unitTax,
        },
      ];
    } else {
      const unitPrice = Math.floor(qty * price * (1 - discount / 100));
      const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
      total += unitPrice + unitTax;
      totalTax += unitTax;
      detail = [
        ...detail,
        {
          orderDetailId: history.order_detail_id,
          price: unitPrice,
          tax: unitTax,
          includeTax: unitPrice + unitTax,
        },
      ];
    }
  });
  return { total, totalTax, detail, getDetail: (id:number)=>detail.filter(({orderDetailId})=>orderDetailId===id)[0] };

};

  return (
    <UserLayout
      activeNumber={3}
      loginUser={loginUser}
      changeLoginUserAction={changeLoginUserAction}
    >
      {/* Temp */}
      <div className="container mx-auto py-20">
        <SubNavbarComponent text="ご注文リスト" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="flex justify-between space-x-4">
          <div className="w-1/5 space-y-4">
            {menus.map(({ text, action }, index) => (
              <div
                onClick={action}
                className={`px-6 py-4 rounded-md cursor-pointer transition-all duration-300 ${
                  activeMenu === index + 1
                    ? "bg-primaryColor text-white"
                    : "bg-[#f7f7f7]"
                }`}
              >
                <p className="text-sm">{text}</p>
              </div>
            ))}
          </div>

        <div className="w-4/5">
            {activeMenu != 3 && (
               <div className="flex space-x-4 items-start">
               <div className="flex items-center w-1/2 border-black rounded-md border-[1px] border-opacity-20 px-2 py-[7.5px] space-x-2 bg-white">
                 <Search className="text-black text-opacity-20" />
                 <input
                   type="text"
                   onChange={(e) => {setProduct(e.target.value)}}
                   placeholder="製品を検索"
                   className="focus:outline-none bg-transparent w-full"
                 />
               </div>
 
               <FormControl
                 className="w-[100px] bg-white rounded-md"
                 size="small"
               >
                 <InputLabel id="select-year-label">年</InputLabel>
                 <Select
                   labelId="select-year-label"
                   id="select-year"
                   onChange={(e) => { setOrderDate(e.target.value+"");}}
                   label="年"
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value={"2021"}>2021年</MenuItem>
                   <MenuItem value={"2022"}>2022年</MenuItem>
                   <MenuItem value={"2023"}>2023年</MenuItem>
                 </Select>
               </FormControl>
             </div>
            )}
          <SizeBox h={20} />
           

            {activeMenu === 1 && 
              <OrderHistoryTab
                orders={orders}
                setOpenDialog={setOpenDialog}
                grandTotal={grandTotal}
                setCustomer={setCustomer}
                detailAction={detailAction}
                ReturnProductsAction={ReturnProductsAction}
                CancelProductsAction={CancelProductsAction}
                orderDetailAction={orderDetailAction}
              />
            }

            {activeMenu === 2 && 
              <OrderProductHistory
                repurchases = {repurchases}
              />
            }

            {activeMenu === 3 &&
              <SubscribeCart
              subscribes={subscribes}
              subScribeTotal={subScribeTotal}
              historys={historys}
              subScribeHistoryTotal={subScribeHistoryTotal}
              removeAction={removeAction}
              />
            }

            {activeMenu === 4 &&
              <OrderCancelHistory
              declineTotal={declineTotal}
              declines={declines}
              />
            }
           
        </div>
    </div>

    {/* 検索 */}
    <CustomerInfoDialogComponent
      openDialog={openDialog}
      customer={customer}
      setOpenDialog={setOpenDialog}
    />

    {/* <ChangeOrderInfoDialogComponent
      openDialog={openChangeDialog}
      setOpenDialog={setOpenChangeDialog}
    />

    <RemoveOrderInfoDialogComponent
      openDialog={openRemoveDialog}
      setOpenDialog={setOpenRemoveDialog}
      setRemoveOpenDialog={setOpenRemoveDialog}
      removeSubId={removeSub}
      removeAction={removeAction}
    /> */}
    <SizeBox h={100} />
  </div>
  {/* Temp */}
</UserLayout>
  );
};
export default OrderScreen;
