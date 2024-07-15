import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import PointMenu from "@/components/admin/point/PointMenu";
import ActivityHistory from "@/assets/admin/activity_history.png";
import PointSearchScreen, {
  SearchType,
} from "@/components/admin/point/PointSearchComponent";
import mutations from "@/networks/mutations";
import Helper from "@/helpers";
import { Point } from "@/types/point/point";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";

const PointScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const [points, setPoints] = useState<Array<Point>>([]);
  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "ポイント一覧",
      action: () => {},
    },
  ];

  const searchAction = ({ search }: SearchType) => {
    mutations.admin.point
      .get({ search })
      .then((ans) => {
        console.log({ search });
        setPoints(ans.data);
        setOpenSearchDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pointHistoryAction = (pointDetail: Point) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.POINT_HISTORY,
      state: {
        pointDetail,
      },
    });
  };

  useEffect(() => {
    if (points.length == 0) {
      mutations.admin.point
        .get()
        .then((ans) => {
          console.log(ans.data);
          setPoints(ans.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <PointMenu title="ポイント一覧" openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <CustomPaginationTableWithPageNo
        data={points}
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
                顧客
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                ポイント総合残高
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                ポイント履歴
              </th>
            </tr>
          </thead>
        }
        renderBody={({ 
          user_id, user_code, user_name, point 
        }: Point,index:number,currentPage: number, itemsPerPage: number) => (
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
              {user_code} {user_name}
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              {point} P
            </td>
            <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
              <img
                src={ActivityHistory}
                alt="Activity History Logo"
                width="30px"
                onClick={() =>
                  pointHistoryAction({
                    user_id,
                    user_code,
                    user_name,
                    point,
                  })
                }
              />
            </td>
          </tr>
        )}
      />
      {/* 検索 */}
      <PointSearchScreen
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        searchAction={searchAction}
      />
      <SizeBox h={100} />
    </div>
  );
};

export default PointScreen;
