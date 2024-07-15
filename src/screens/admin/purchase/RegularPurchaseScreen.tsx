import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { GlobalProps } from "@/App";
import PurchasesMenu from "@/components/admin/purchases/PurchasesMenu";
import PurchasesSearchComponent from "@/components/admin/purchases/PurchasesSearchComponent";
import { Button, Divider } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RemovePurchaseComponent from "@/components/admin/purchases/RemovePurchaseComponent";
import mutations from "@/networks/mutations";
import { RegularPurchase } from "@/types/regularpurchase/regularPurchase";
import AWS from "@/aws";

const RegularPurchaseScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [removeRegularPurchase, setRemoveRegularPurchase] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [regularPurchase, setRegularPurchase] = useState<Array<RegularPurchase>>([]);
  const [pickItem,setPickItem] = useState<RegularPurchase>();
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [user, setUser] = useState("");
  const [product, setProduct] = useState("");
  const [productSubscribeId, setProductSubscribeId] = useState(0);

  const handleToScroll = (scrollAmount: number) => {
    const newScrollPostion = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPostion);

    if (containerRef.current) {
      containerRef.current.scrollLeft = newScrollPostion;
    }
  };

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "定期購入",
      action: () => {},
    },
  ];

  // initial state
  useEffect(() => {
    getRegularPurchaseList();
  }, []);

  // search state
  useEffect(() => {
    console.log(searchStatus);
    if(searchStatus){
      getRegularPurchaseList();
      setUser("");
      setProduct("");
      setSearchStatus(false);
      setOpenSearchDialog(false);
    }
  }, [searchStatus]);

  // remove product subscribe
  useEffect(() => {
    if(removeRegularPurchase == true){
      setOpenRemoveDialog(false);
      setRemoveRegularPurchase(false);
      removeRegularPurchaseAction(productSubscribeId);
    }
  }, [removeRegularPurchase]);

  const removeSubScribeAction = (product_subscribe_id: number)=>{
    const [currentItem] = regularPurchase.filter((item)=>item.product_subscribe_id === product_subscribe_id);
    setPickItem(currentItem);
    setOpenRemoveDialog(true);
    setProductSubscribeId(product_subscribe_id);
  }

  const getRegularPurchaseList = () => {
    mutations.admin.regularPurchase.get({user, product}).then((ans) => {
      if(ans.data){
        setRegularPurchase(ans.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const removeRegularPurchaseAction = (product_subscribe_id: number) => {
    mutations.admin.regularPurchase.removeRegularPurchase({product_subscribe_id}).then((ans) => {
      setRegularPurchase(regularPurchase.filter((regular_purchase) => {return regular_purchase.product_subscribe_id != ans.data?.product_subscribe_id}));
      setRemoveRegularPurchase(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // const keydownListener = (event: KeyboardEvent) => {
  //   // do action
  //   if (event.key === "Enter") {
  //     //  do something
  //     setSearchStatus(true);
  //   }
  // }

  useEffect(() => {
    // window.addEventListener("keydown", keydownListener);
    //   return () => {
    //       // remove listener
    //       window.removeEventListener("keydown", keydownListener);
    //   }
  });

  return (
    <div> 
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />
      <SizeBox h={95} />
      <PurchasesMenu
        title={`定期購入一覧: ( ${regularPurchase.length > 0 ? regularPurchase.length : "-"} 名)`}
        openDialog={setOpenSearchDialog}
      />
      <SizeBox h={40} />
      <div className="mx-[24px] flex space-x-4">
        <div className="flex justify-center w-1/12">
          <button
            onClick={() => handleToScroll(-300)}
            className="w-20 h-20 rounded-full flex justify-center items-center border-black border-[1px] border-opacity-20"
          >
            <ChevronLeftIcon fontSize={"large"} />
          </button>
        </div>
        <div
          ref={containerRef}
          className="flex items-center w-10/12 overflow-x-auto scroll-smooth"
        
        >
        {
          regularPurchase.map(({
              product_subscribe_id,
              user_code,user_name,user_name_kana,user_email,user_phone,
              product_code,product_name,
              subscribe_kikan,
              last_order_created_at,order_created_at,
              qty,img_url
          }:RegularPurchase)=>{
            return <div key={product_subscribe_id} className="flex-shrink-0 w-[300px] px-2">
                <div className="flex-shrink-0 w-full px-4 rounded-md border-black border-[1px] border-opacity-20 bg-white drop-shadow-md shadow-lg">
                  <div className="pt-4 space-y-2">
                    <p className="underline underline-offset-2 text-textBlue">
                      {user_code}
                    </p>
                    <p>
                      {user_name} {user_name_kana}
                    </p>
                    <p>{user_email}</p>
                    <p>{user_phone}</p>
                  </div>

                  <SizeBox h={10} />
                  <Divider />

                  <div className="py-4 space-y-2">
                    <div className="flex flex-row justify-center">
                      <img
                        src={AWS.s3.getUrl({key: img_url})}
                        alt="Product Pho"
                        className="h-[120px]"
                      />
                    </div>
                    <p>{product_code}</p>
                    <p>{product_name}</p>
                    <p className="w-10 h-6 rounded-md bg-[#FFDE4E] text-center">
                      {subscribe_kikan}
                    </p>
                    <p>最終購入: {last_order_created_at}</p>
                    <p>次の配達日: {order_created_at}</p> 
                    <p>次の配達数量: {qty} 個</p>
                  </div>

                  <div className="pb-4">
                    <Button onClick={()=>removeSubScribeAction(product_subscribe_id)} className="w-full" variant="contained">
                      定期購入から外す
                    </Button>
                  </div>
                  <Divider />
                </div> 
              </div>
          })
          }
        </div>
        <div className="w-1/12 justify-center">
          <button
            onClick={() => handleToScroll(300)}
            className="w-20 h-20 rounded-full flex justify-center items-center border-black border-[1px] border-opacity-20"
          >
            <ChevronRightIcon fontSize={"large"} />
          </button>
        </div>
      </div>
      {/* 検索 */}
      <PurchasesSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        user={user}
        setUser={setUser}
        product={product}
        setProduct={setProduct}
        onSearch={() => {setSearchStatus(true), setOpenSearchDialog(false)}}
      />
      {pickItem && <RemovePurchaseComponent
        openSearchDialog={openRemoveDialog}
        setOpenSearchDialog={setOpenRemoveDialog}
        removeRegularPurchase={removeRegularPurchase}
        setRemoveRegularPurchase={setRemoveRegularPurchase}
        onFinishRemove={() => setOpenRemoveDialog(false)}
        pickItem={pickItem}
      />
      }
      <SizeBox h={100} />
    </div>
  );
};

export default RegularPurchaseScreen;
