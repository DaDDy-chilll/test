import { GlobalProps } from "@/App";
import UserLayout from "@/layouts/user/UserLayout";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import Helper from "@/helpers";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderForCustomerRes } from "@/types/order/order";
import { format } from "date-fns";
import aws from "@/aws";
import mutations from "@/networks/mutations";
import { OrderDeclineErrRes } from "@/networks/mutations/user/order/createOrderDeclineReturn";
import InputBoxComponent from "@/components/InputBoxComponent";

const CancelProductsScreen = ({}: GlobalProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };
 
  const navigate = useNavigate();
  const [reasonDetail,setReasonDetail] = useState<string>(""); 
  const [reasonDetailErr,setReasonDetailErr] = useState<string>("");

  const [reasonData, setReasonData] = useState<Array<AutoCompleteData>>([]);
  const [reasonId, setReasonId] = useState<AutoCompleteData | null>();

  const location = useLocation();
  const {orderInfoDetail} : {orderInfoDetail : OrderForCustomerRes } = location.state;

  const createCancelProducts = () => {
    setReasonDetailErr("");
    mutations.user.order.createOrderDeclineCancel( orderInfoDetail.order_id, {order_id:orderInfoDetail.order_id,status:1,type:1,reason_id:reasonId?.value ? reasonId.value : 0,reason_detail:reasonDetail,reject_reason:"null"})
    .then((ans) => {
      console.log(ans.data);

    })
    .catch((err: OrderDeclineErrRes) => {
      console.log(err);
      if(err.errors){
        if(err.errors.reasonDetail){
            setReasonDetailErr(err.errors.reasonDetail);
        }
      }
    })
    navigate(Routes.USER.ORDER)
  };

  const totalProductAmount =  orderInfoDetail.order_detail.reduce(
    (accumulator , od) =>
    accumulator +
      Math.round((
          od.price *
          (1 + od.tax / 100) *
          od.product_qty *
          od.subscribe_factor)
      ),
    0
  );

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
      route: Routes.USER.ORDER,
    },
    {
      Title: "キャンセル",
      route: null,
    },
  ];

  const getMasterData = () => {
    mutations.pub.master
      .getById(8)
      .then((ans) => {
        if (ans.data) {
          setReasonData(
            ans.data.map(({ master_detail_id: id, name: name }) => ({
              value: id,
              label: name,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    getMasterData();
    // const keydownListener = (event: KeyboardEvent) =>{
    //   if(event.key == "Enter"){
    //     createCancelProducts();
    //   }
    // }
    // window.addEventListener("keydown",keydownListener)
    // return() =>{
    //   window.removeEventListener("keydown",keydownListener);
    // }
},[])

  return (
    <UserLayout>
      {/* Temp */}
      <div className="container mx-auto">
        <SubNavbarComponent text="キャンセル" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="flex space-x-8">
          <div className="w-7/12 space-y-4">
            <div className="px-6 py-4 rounded-md bg-[#08C85638] text-sm space-y-4">
              <p>※ キャンセルポリシー</p>
              <p className="pl-4">
              配達サービスに未提出の場合はキャンセル可能です。
              </p>
              <p className="pl-4">
              それ以外は、配達終わってから返品することになります。
              </p>
              <p className="pl-4">
              キャンセル依頼が確認できてから、2週間以内に返金させていただきます。
              </p>
            </div>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={reasonId}
              onChange={(_, value) => {
                value && setReasonId(value);
              }}
              options={reasonData}
              renderInput={(params) => (
                <TextField {...params} label="返品理由" />
              )}
              className="bg-white"
            />

            <InputBoxComponent
              value={reasonDetail}
              onChange={(event) => {
                setReasonDetail(event.target.value);
              }}
              error={reasonDetailErr}
              label="伝えたい内容"
              multiline={10}
              className="w-full bg-white"
            />

            <Button variant="contained" className="w-full"
            onClick={createCancelProducts}>
              OK
            </Button>
          </div>
          <div className="w-5/12 bg-white rounded-md border-black border-[1px] border-opacity-20 overflow-hidden">
            <div className="flex justify-between items-center text-sm bg-[#E2EDFF] px-6 py-4 border-black border-b-[1px] border-opacity-20">
            <p>注文日：{format(new Date(orderInfoDetail.created_at), "yyyy/MM/dd")}</p>
              <p>総額： {
                  Helper.japaneseNumberFormat({
                    number: Math.round((totalProductAmount))
                })
                }</p>
              {/* <p>注文日：2023/01/01</p> */}
            </div>

            <div className="px-6 py-4 space-y-4">
              <p className="text-sm font-semibold">本日（配達済）</p>
              {
                  orderInfoDetail.order_detail.map((od,index)=>{
                  return <div>
                    <div key={Math.random()} className="flex items-center space-x-4 py-4">
                    {
                      od.products?.product_photos.filter((p)=>{
                        return p.main_photo === 1;
                      }).map(({img_url}, index)=> index === 0 ? <img src={aws.s3.getUrl({key:img_url})} 
                                                                                  width="200px"
                                                                                    height="200px"/> : <span></span>)
                    }
                    <div className="space-y-4">
                        <p className="text-sm text-textBlue">{od.products?.product_name}</p>
                        <p className="text-sm">{od.products?.title}</p>
                        <p className="text-sm">
                          {Helper.japaneseNumberFormat({
                            number: Math.round(od.products?.price? od.products.price * (1 + od.products?.tax / 100):0),
                          })}
                          <span className="text-sm ml-2">(税込)</span>
                        </p>
                    </div>
                    </div>
                      {index + 1 !== orderInfoDetail.order_detail.length ? ( 
                      <Divider />
                      ) : (
                          <SizeBox h={10} />
                        )}
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <SizeBox h={100} />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default CancelProductsScreen;
