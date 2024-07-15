//import SizeBox from "@/components/common/SizeBox";
import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import UserInfoComponent from "@/components/admin/settings/create_user/UserInfoComponent";
import Routes from "@/navigations/routes";
import mutations from "@/networks/mutations";
import { useNavigate } from "react-router-dom"

const CreateUserScreen = ({setIsAdmin}:GlobalProps)=>{

    const navigate = useNavigate();

    const breadcrubItems = [
        {
            title: "メニュー",
            action: ()=>navigate(Routes.ADMIN.HOME)
        },
        {
            title: "システム利用設定",
            action: ()=>navigate(Routes.ADMIN.SYSTEM_SETTINGS)
        },
        {
            title: "登録",
            action: ()=>{}
        }
    ]

    const onCreateSuccess = ()=>{
        navigate(Routes.ADMIN.SYSTEM_SETTINGS)
    }

    return <div className="">
    <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems}/>

    {/* <SizeBox h={95}/> */}
    <div className="pt-[95px] px-[25px]">
        <UserInfoComponent 
            createAdmin={mutations.admin.createAdmin}
            onSuccess={onCreateSuccess}
        />
        <SizeBox h={20} />
        
    </div>
    </div>
}

export default CreateUserScreen;