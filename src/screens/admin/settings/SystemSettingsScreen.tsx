import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsMenu from "@/components/admin/settings/SettingsMenu";
import mutations from "@/networks/mutations";
import { params } from "@/networks/mutations/admin/list/get";
import { Admin } from "@/types/admin/admin";
import UserSearchComponent from "@/components/admin/settings/UserSearchComponent";
import SystemAdminConfirmComponent from "@/components/admin/settings/systemAdmin/SystemAdminConfirmComponent";
import Helper from "@/helpers";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";
import SystemAdminDeleteConfirmComponent from "@/components/admin/settings/systemAdmin/SystemAdminDeleteConfirmComponent";

const SystemSettingsScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [confirmText, setConfirmText] = useState<string>("");
  const [adminList, setAdminList] = useState<Array<Admin>>([]);
  const [statusID, setStatusID] = useState<any>();
  const [statusChange, setStatusChange] = useState<any>();
  const [userID, setUserID] = useState<number>(0);

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "システム利用設定",
      action: () => {},
    },
  ];

  const getAdminList = ({ search, role }: params) => {
    mutations.admin
      .list({ search, role })
      .then((ans) => {
        console.log(ans.data);
        setAdminList(ans.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchAction = ({ search, role }: params) => {
    getAdminList({ search, role });
    setOpenSearchDialog(false);
    console.log(role);
  };

  const changeStatusAction = (id: number, status: number) => {
    if(openConfirmDialog){
      mutations.admin
      .updateAdmin(id, { status: status == 1 ? 0 : 1 })
      .then((ans) => {
        const updatedAdmins = adminList.map((admin) => {
          if (admin.user_id == id) {
            //update
            return ans.data;
          }
          return admin;
         
        });
        setAdminList(updatedAdmins);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  };

  const editAdminAction = (editData: Admin) => {
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.EDIT_USER,
      state: {
        editData,
      },
    });
  };

  const deleteDataAction = (id: number) => {
    mutations.admin
      .deleteAdmin({ id })
      .then((ans) => {
        setAdminList(
          adminList.filter((admin: Admin) => {
            return admin.user_id != ans.data.user_id;
          })
        );
        setOpenDeleteConfirmDialog(false);
        setUserID(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (adminList.length == 0) {
      getAdminList({});
    }
  }, []);

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <SettingsMenu title="利用者一覧" openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <CustomPaginationTableWithPageNo
        data={adminList}
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
                className="px-2 py-4 border-black  border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                担当者ID
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                名前
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                名前（カナ）
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                権限
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                メール
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                電話番号
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                ステータス
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20 text-left"
              >
                アクション
              </th>
            </tr>
          </thead>
        }
        renderBody={({
          user_id,
          user_code,
          mail,
          phone,
          point,
          role,
          user_name,
          user_name_kana,
          date_of_birth,
          status,
          created_at,
          updated_at,
          deleted_at,
        }: Admin,index:number,currentPage: number, itemsPerPage: number) => (
          <tr
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm  border-black border-b-[1px] border-opacity-20"
          >
            <td scope="row" className="px-6 py-4 ">
            {(index + 1) + (currentPage - 1) * itemsPerPage}
            </td>
            <td className="px-2 py-4">{user_code}</td>
            <td className="px-2 py-4">{user_name}</td>
            <td className="px-2 py-4">{user_name_kana}</td>
            <td className="px-2 py-4">
              {parseInt(role) === 1
                ? "Super Admin"
                : parseInt(role) === 2
                ? "Admin"
                : null}
            </td>
            <td className="px-2 py-4">{mail}</td>
            <td className="px-2 py-4">{phone}</td>
            <td className="px-2 py-4">
              {status == 1 ? (
                <span className="text-[#08C856]">Active</span>
              ) : (
                <span className="text-[#FF0303]">Suspended</span>
              )}
            </td>
            <td className="px-2 py-4 flex space-x-4 items-center">
              <div
                className="w-8 h-8 rounded-full border-[#3083FF] border-[1px] flex justify-center items-center"
                onClick={() =>
                  editAdminAction({
                    user_id,
                    user_code,
                    mail,
                    phone,
                    point,
                    role,
                    user_name,
                    user_name_kana,
                    date_of_birth,
                    status,
                    created_at,
                    updated_at,
                    deleted_at,
                  })
                }
              >
                <EditIcon fontSize="small" className="text-[#3083FF]" />
              </div>
              <div
                className="w-8 h-8 rounded-full border-[#FF0303] border-[1px] flex justify-center items-center"
                
                onClick={() => {
                  setConfirmText("削除します。");
                  setOpenDeleteConfirmDialog(true);
                  setUserID(user_id);
                }}
              >
                <DeleteIcon fontSize="small" className="text-[#FF0303]" />
              </div>
              {status == 1 ? (
                <div
                  onClick={() => {
                    setConfirmText("一時停止します。");
                    setOpenConfirmDialog(true);
                    setStatusID(user_id);
                    setStatusChange(status);
                    changeStatusAction(user_id, status);
                  }}
                  className="w-8 h-8 rounded-full border-[#FF0303] border-[1px] flex justify-center items-center"
                >
                  <StopIcon fontSize="small" className="text-[#FF0303]" />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setConfirmText("一時停止を解除します。");
                    setOpenConfirmDialog(true);
                    setStatusID(user_id);
                    setStatusChange(status);
                    changeStatusAction(user_id, status);
                  }}
                  className="w-8 h-8 rounded-full border-[#08C856] border-[1px] flex justify-center items-center"
                >
                  <PlayArrowIcon fontSize="small" className="text-[#08C856]" />
                </div>
              )}
            </td>
          </tr>
        )}
      />
      {/* 検索 */}
      <UserSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        onSearch={() => setOpenSearchDialog(false)}
        searchAction={searchAction}
      />

      {/* delete user confirm dialog */}
      <SystemAdminDeleteConfirmComponent 
        confirmText={confirmText}
        openDeleteConfirmDialog={openDeleteConfirmDialog}
        setOpenDeleteConfirmDialog={setOpenDeleteConfirmDialog}
        deleteDataAction={deleteDataAction}
        userID={userID}
      />

      <SystemAdminConfirmComponent
        confirmText={confirmText}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        statusID={statusID}
        statusChange={statusChange}
        changeStatusAction={changeStatusAction}
      />
      <SizeBox h={100} />
    </div>
  );
};

export default SystemSettingsScreen; 
