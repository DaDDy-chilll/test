import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import ShippingMenu from "@/components/admin/delivery/ShippingMenu";
import RecordSearchComponent from "@/components/admin/warehouse/RecordSearchComponent";
import mutations from "@/networks/mutations";
import { WarehouseHistory } from "@/networks/mutations/admin/warehouse_transaction/get";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";

const RecordScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [wareHouseHistory, setWareHouseHistory] = useState<Array<WarehouseHistory>>();

  //get route data from warehouse
  const location = useLocation();
  const warehouseDetailId = location.state.warehouse_detail_id;
  const productList = location.state;

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "在庫一覧",
      action: () => navigate(Routes.ADMIN.WAREHOUSE),
    },
    {
      title: "履歴",
      action: () => { },
    },
  ];

  //initial state 在庫の履歴
  useEffect(() => {
    mutations.admin.warehouseTransaction.get({ warehouse_detail_id: warehouseDetailId })
      .then((ans) => {
        setWareHouseHistory(ans.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <ShippingMenu openDialog={setOpenSearchDialog} productList={productList} />
      <SizeBox h={20} />

      <CustomPaginationTableWithPageNo
        data={wareHouseHistory ? wareHouseHistory : []}
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
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                仕入れ / 出荷
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                数量
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                日時
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                担当
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[600px] border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                注文情報
              </th>
            </tr>
          </thead>
        }
        renderBody={(
          {
            transaction_type,
            product_qty,
            created_at,
            kanrisya_name,
            order_code,
            user_code,
            user_name,
            schedule_delivery_date,
          }: WarehouseHistory, index: number, currentPage: number, itemsPerPage: number
        ) => (
          <tr
            onClick={() => { }}
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm border-black border-b-[1px] border-opacity-20"
          >
            <td scope="row" className="px-8 py-8">
              {(index + 1) + (currentPage - 1) * itemsPerPage}
            </td>
            <td className="px-2 py-6">{transaction_type === 1 ? "仕入れ" : "出荷"}</td>
            <td className="px-2 py-8">{product_qty} 個</td>
            <td className="px-2 py-8">
              {created_at && (
                <>
                  {created_at.split(' ')[0]}
                </>
              )}
            </td>
            <td className="px-2 py-8">{kanrisya_name}</td>
            <td className="px-2 py-8">
              {transaction_type === 1 ? (
                "-"
              ) : (
                <p>
                  注文コード: {order_code}, お客様: {user_name} ({user_code}),
                  注文数: {product_qty} 個, 配達指定日: {schedule_delivery_date}
                </p>
              )}
            </td>
          </tr>
        )}
      />
      {/* 検索 */}
      <RecordSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        warehouseDetailId={warehouseDetailId}
        setWareHouseHistory={setWareHouseHistory}
        onSearch={() => setOpenSearchDialog(false)}
      />

      <SizeBox h={100} />
    </div>
  );
};

export default RecordScreen;
