import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import CustomerMenu from "@/components/admin/customer/CustomerMenu";
import CustomerSearchComponent, { SearchActionType } from "@/components/admin/customer/CustomerSearchComponent";
import { CustomerResponse } from "@/types/customer/customer_response";
import Helper from "@/helpers";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";

const CustomerScreen = ({ setIsAdmin, mutations }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [customers,setCustomers] =  useState<Array<CustomerResponse>>([]);
  const [search, setSearch] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "顧客一覧",
      action: () => {},
    },
  ];
 
  const searchAction  = ({search,address,status} : SearchActionType) => {
    mutations.admin.customer.get({search, address, status})
      .then((ans) => {
          console.log({search,address,status});
          setCustomers(ans.data);
          setOpenSearchDialog(false);
          setSearch("");
          setAddress("");
      } ) 
      .catch((error) => {
        console.log(error);
      })
  }

  const detailAction = (userDetail : CustomerResponse) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.CUSTOMER_DETAIL,
      state: {
        userDetail
      },
    });
  } 

  useEffect( () =>{
    if(customers.length == 0){
      mutations.admin.customer.get()
      .then((ans) => {
          console.log(ans.data);
          setCustomers(ans.data);
      } ) 
      .catch((error) => {
        console.log(error);
      })
    }
  })
  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <CustomerMenu title="顧客一覧" openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <CustomPaginationTableWithPageNo
        data={customers}
        title={
          <thead className="">
            <tr className="bg-[#F6F7F8]">
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                No
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black  border-t-[1px] border-b-[1px] border-opacity-20"
              >
                顧客番号
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                名前
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                名前（カナ）
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                メール
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                電話番号
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                生年月日
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                郵便番号
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                住所
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
          user_id,
          user_code,
          mail,
          user_name,
          user_name_kana,
          date_of_birth,
          phone,
          status,
          role,
          point,
          created_at,
          updated_at,
          address_list,
        }: CustomerResponse,index:number,currentPage: number, itemsPerPage: number) => (
          <tr
            onClick= {() => detailAction({
              user_id,
              user_code,
              mail,
              user_name,
              user_name_kana,
              date_of_birth,
              phone,
              status,
              role,
              point,
              created_at,
              updated_at,
              address_list})}
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm"
          >
            <td
              scope="row"
              className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
            >
              <div className="w-full text-center">{(index + 1) + (currentPage - 1) * itemsPerPage}</div>
            </td>
            <td
              scope="row"
              className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
            >
              <div className="w-full text-center underline underline-offset-2 text-textBlue">
                {user_code}
              </div>
            </td>
            <td className="px-[8px] py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">{user_name}</div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">{user_name_kana}</div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">{mail}</div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">{phone}</div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">{date_of_birth}</div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">
                {address_list.length ?  address_list.map((ad) => (ad?.post_code)) : "-"}
              </div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">
                 {address_list.length ?  address_list.map((ad) => (ad?.address_name)) : "-"}
                
              </div>
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <div className="w-full text-center">
                {status === 1 ? <span className="text-[#08C856]">Active</span> : <span className="text-[#FF0303]">Suspended</span>}
              </div>
            </td>
          </tr>
        )}
      />
      {/* 検索 */}
      <CustomerSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        searchAction ={searchAction }
        search={search}
        setSearch={setSearch}
        address={address}
        setAddress={setAddress}
      />
      <SizeBox h={100} />
    </div>
  );
};

export default CustomerScreen;
