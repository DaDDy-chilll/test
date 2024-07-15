//import SizeBox from "@/components/common/SizeBox";
import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import ConfirmComponent from "@/components/admin/settings/ConfirmComponent";
import Routes from "@/navigations/routes";
import mutations from "@/networks/mutations";

import { CustomerResponse } from "@/types/customer/customer_response";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerDetailScreen = ({ setIsAdmin }: GlobalProps) => {
  const [confirmText, setConfirmText] = useState<string>("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [statusChange, setStatusChange] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const {userDetail} : {userDetail : CustomerResponse} = location.state;

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "顧客一覧",
      action: () => navigate(Routes.ADMIN.CUSTOMER),
    },
    {
      title: "詳細",
      action: () => {},
    },
  ];

  const changeStatusAction = ( userId: number ) => {
    mutations.admin.customer.update(userId,{status : userDetail.status == 1 ? 0 : 1})
    .then((ans) => {
        setOpenConfirmDialog(false);
        userDetail.status = ans.data.status;
    } ) 
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="">
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />
      <SizeBox h={95} />

      <div className="mx-[24px] px-6 py-4 rounded-md bg-white flex justify-between items-center">
        <p>
          顧客詳細（{userDetail.user_code}）
          {userDetail.status ? (
            <span className="text-[#08C856]">Active</span>
          ) : (
            <span className="text-[#FF0303]">Suspended</span>
          )}
        </p>
        {userDetail.status ? (
          <button
            onClick={() => {
              setConfirmText("一時停止します。");
              setOpenConfirmDialog(true);
              setStatusChange(userDetail.user_id);
            }}
            
            className="px-8 py-2 text-white bg-[#FF0303] rounded-md"
          >
            一時停止
          </button>
        ) : (
          <button
            onClick={() => {
              setConfirmText("一時停止を解除します。");
              setOpenConfirmDialog(true);
              setStatusChange(userDetail.user_id);
            }}
            className="px-8 py-2 text-white bg-[#08C856] rounded-md"
          >
            一時停止解除
          </button>
        )}
      </div>

      <SizeBox h={20} />
      <div className="mx-[24px] px-10 py-6 rounded-md bg-white flex justify-between items-center">
        <div className="w-1/5 space-y-4">
          <p className=" font-semibold">名前</p>
          <p>{userDetail.user_name}</p>
        </div>
        <div className="w-1/5 space-y-4">
          <p className=" font-semibold">名前(カナ)</p>
          <p>{userDetail.user_name_kana}</p>
        </div>
        <div className="w-1/5 space-y-4">
          <p className=" font-semibold">メール</p>
          <p>{userDetail.mail}</p>
        </div>
        <div className="w-1/5 space-y-4">
          <p className=" font-semibold">電話番号</p>
          <p>{userDetail.phone}</p>
        </div>
        <div className="w-1/5 space-y-4">
          <p className=" font-semibold">生年月日</p>
          <p>{userDetail.date_of_birth}</p>
        </div>
      </div>
      <SizeBox h={24} />

      <div className="mx-[24px]">
        <p className="font-semibold">住所一覧</p>
      </div>
      <SizeBox h={24} />

      <div className="mx-[24px] grid grid-cols-3 gap-8">
        {
          userDetail?.address_list.map( ({address_id,name,address_name,main_address,post_code}) => {
            return <div key={address_id} className="px-8 py-6 space-y-2 bg-white rounded-md relative">
              <p className=" font-semibold text-xl">{name}</p>
              <SizeBox h={5} />
              <p className="text-sm">{post_code}</p>
              <p className="text-sm">{address_name}</p>
              <SizeBox h={5} />
              <p className="text-sm">電話：{userDetail.phone}</p>
              {
                  main_address > 0 && <p className="absolute top-2 right-2 px-8 py-2 bg-[#285DBD] rounded-md text-white">
                  Default
                </p>
              }
              
            </div>
          })
        }
      </div>
      <SizeBox h={100} />

      <ConfirmComponent
        confirmText={confirmText}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        changeStatusAction={changeStatusAction}
        statusChange = {statusChange}
        
      />
    </div>
  );
};

export default CustomerDetailScreen;
