import SizeBox from "@/components/SizeBox";
import UserNavbarComponent from "@/components/user/navbar/UserNavbarComponent";
import FooterComponent from "@/components/user/top_page/FooterComponent";
import { ReactNode } from "react";
interface UserLayoutProps {
    children?: ReactNode;
}
const UserLayout = ({children}:UserLayoutProps)=>{
    return <div className="bg-bgcolor">
        <UserNavbarComponent />
        <SizeBox h={140}/>
            {children}
        <FooterComponent />
    </div>
}

export default UserLayout;