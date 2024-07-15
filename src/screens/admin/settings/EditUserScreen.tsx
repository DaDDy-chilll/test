//import SizeBox from "@/components/common/SizeBox";
import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import EditUserInfoComponent from "@/components/admin/settings/edit_user/EditUserInfoComponent";
import Routes from "@/navigations/routes";
import mutations from "@/networks/mutations";
import { Admin } from "@/types/admin/admin";
import { useLocation, useNavigate } from "react-router-dom";

const EditUserScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { editData }: { editData: Admin } = location.state;

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "システム利用設定",
      action: () => navigate(Routes.ADMIN.SYSTEM_SETTINGS),
    },
    {
      title: "変更",
      action: () => {},
    },
  ];

  const onUpdateSuccess = () => {
    navigate(Routes.ADMIN.SYSTEM_SETTINGS);
  }

  return (
    <div className="">
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      {/* <SizeBox h={95}/> */}
      <div className="pt-[95px] px-[25px]">
        <EditUserInfoComponent
          updateAdmin={mutations.admin.updateAdmin}
          editData={editData}
          onSuccess={onUpdateSuccess}
        />
        <SizeBox h={20} />

        <SizeBox h={65} />
      </div>
    </div>
  );
};

export default EditUserScreen;
