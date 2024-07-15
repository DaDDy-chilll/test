import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import CartDeliveryAddress from "@/components/user/cart/CartDeliveryAddress";
import CartDetailComponent from "@/components/user/cart/CartDetailComponent";
import CartPaymentComponent from "@/components/user/cart/CartPaymentCompoent";
import UserLayout from "@/layouts/user/UserLayout";
import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";

const CheckOutScreen = ({carts,increaseProductQty,createOrders,decreaseProductQty}:GlobalProps)=>{
  const [tab,setTab] = useState<number>(1)
  
  const navigate = useNavigate();

  const createOrder = ()=>{
    createOrders();
    navigate(routes.USER.TOP_PAGE);  
  }

  return <UserLayout>
    <div className="container mx-auto ">
      <div className="bg-white p-[30px] rounded-[10px]">
        {/* Tabs */}
        <div className="flex flex-row mb-[40px]">
          <div onClick={()=>setTab(1)} className={`${tab == 1? "text-[#285DBD] bg-[#285DBD] bg-opacity-[0.06]" :tab > 1? "bg-[#08C856] bg-opacity-[0.06] text-[#08C856]" : "bg-[#000] bg-opacity-[0.02] text-[18px] font-bold text-[#000] text-opacity-[0.5]"} nav text-[18px] font-bold rounded-[10px] px-[30px] py-[10px]`}>
            <ShoppingCartOutlinedIcon className="mr-[5px]" style={{width: 20,height: 20}}/>購入商品
            <span className="block text-[13px] font-medium pl-[25px]">カード</span>
          </div>
          <SizeBox w={30} />
          <div onClick={()=>setTab(2)} className={`${tab == 2? "text-[#285DBD] bg-[#285DBD] bg-opacity-[0.06]":tab > 2? "bg-[#08C856] bg-opacity-[0.06] text-[#08C856]": "bg-[#000] bg-opacity-[0.02] text-[18px] font-bold text-[#000] text-opacity-[0.5]"} nav text-[18px] font-bold rounded-[10px] py-[10px] px-[30px]`}>
            <LocationOnIcon className="mr-[5px]" style={{width: 20, height: 20}} />配達・請求住所
            <span className="block text-[13px] font-medium pl-[25px]">住所</span>
          </div>
          <SizeBox w={30} />
          <div onClick={()=>setTab(3)} className={`${tab == 3? "text-[#285DBD] bg-[#285DBD] bg-opacity-[0.06]": "bg-[#000] bg-opacity-[0.02] text-[18px] font-bold text-[#000] text-opacity-[0.5]"} nav text-[18px] font-bold rounded-[10px] py-[10px] px-[30px]`}>
            <AccountBalanceWalletIcon className="mr-[5px]" style={{width: 20, height: 20}} />支払い
            <span className="block text-[13px] font-medium pl-[25px]">カード情報</span>
          </div> 
        </div>

        { tab===1 && <CartDetailComponent setTab={setTab} carts={carts} increaseProductQty={increaseProductQty} decreaseProductQty={decreaseProductQty}/> }
        { tab===2 && <CartDeliveryAddress setTab={setTab} carts={carts} /> }
        { tab===3 && <CartPaymentComponent createOrder={createOrder} carts={carts} /> }
        </div>
    </div>
    <SizeBox h={100} />
  </UserLayout>
}
export default CheckOutScreen;