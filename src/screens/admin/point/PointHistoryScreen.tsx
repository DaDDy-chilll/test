import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import PointMenu from "@/components/admin/point/PointMenu";
import PointHistorySearchComponent, {
  searchActionType,
} from "@/components/admin/point/PointHistorySearchComponent";
import { Point } from "@/types/point/point";
import { PointHistory } from "@/types/point/pointHistory";
import mutations from "@/networks/mutations";
import { format } from "date-fns";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";

const PointHistroyScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const { pointDetail }: { pointDetail: Point } = location.state;
  const [pointDetailList, setPointDetailList] = useState<Array<PointHistory>>(
    []
  );

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "ポイント一覧",
      action: () => navigate(Routes.ADMIN.POINT),
    },
    {
      title: "ポイント履歴",
      action: () => navigate(Routes.ADMIN.POINT_HISTORY),
    },
  ];

  const searchAction = ({
    order_code,
    date_from,
    date_to,
  }: searchActionType) => {
    mutations.admin.point
      .pointHistoryIndex(pointDetail.user_id, {
        order_code,
        date_from,
        date_to,
      })
      .then((ans) => {
        console.log(ans.data);
        setPointDetailList(ans.data);
        setOpenSearchDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (pointDetailList.length == 0) {
      mutations.admin.point
        .pointHistoryIndex(pointDetail.user_id)
        .then((ans) => {
          console.log(ans.data);
          setPointDetailList(ans.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <PointMenu
        title="ポイント履歴一覧  "
        uCode={pointDetail.user_code}
        openDialog={setOpenSearchDialog}
      />
      <SizeBox h={10} />

      <CustomPaginationTableWithPageNo
        data={pointDetailList}
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
                className="px-2 py-4 w-[200px] border-black  border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                注文Code
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                総合ポイント
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                付与ポイント
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                付与日
              </th>
            </tr>
          </thead>
        }
        renderBody={({
          order_code,
          point,
          total_point,
          status,
          created_at,
        }: PointHistory,index:number,currentPage: number, itemsPerPage: number) => (
          <tr
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm"
          >
            <td
              scope="row"
              className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
            >
              {(index + 1) + (currentPage - 1) * itemsPerPage}
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              {order_code}
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              {total_point} P
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              {status === 1 ? (
                <span className="text-[#08C856]">+{point}</span>
              ) : (
                <span className="text-[#FF0303]">-{point}</span>
              )}
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              {format(new Date(created_at), "yyyy-MM-dd")}
            </td>
          </tr>
        )}
      />
      {/* 検索 */}
      <PointHistorySearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        searchAction={searchAction}
      />
      <SizeBox h={100} />
    </div>
  );
};

export default PointHistroyScreen;
