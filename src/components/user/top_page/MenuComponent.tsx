import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction, memo } from "react";
import Home from "@/assets/icons/user/user_dialog/Home.png";
import Shopping from "@/assets/icons/user/user_dialog/Shopping Cart.png";
import Supplement from "@/assets/icons/user/user_dialog/Supplement Bottle.png";
import Enter from "@/assets/icons/user/user_dialog/Enter.png";
import Multiply from "@/assets/icons/user/user_dialog/Multiply.png";
import RouteName from "@/navigations/routes";
import {  useNavigate } from "react-router-dom";
import Helper from "@/helpers";
import routes from "@/navigations/routes";

interface MenuComponentProps {
    openMenu:boolean ;
    setOpenMenu: Dispatch<SetStateAction<boolean>>;
}
interface menuItemsProps {
    icon: any;
    description:String;
    action: ()=>void;
}
const MenuComponent = ({openMenu,setOpenMenu}:MenuComponentProps)=>{
    const navigate = useNavigate();
    const menuItems:Array<menuItemsProps> = [
        {
            icon:Home,
            description: "ホーム",
            action:()=>{console.log("Home")}
        },
        {
            icon:Supplement,
            description: "製品",
            action:()=>{navigate(RouteName.USER.PRODUCT)}
        },
        {
            icon:Shopping,
            description: "カート",
            action:()=>{Helper.navigate({navigate,path: routes.USER.CART})}
        },
        {
            icon:Enter,
            description: "ログイン",
            action:()=>{navigate(RouteName.USER.LOGIN)}
        },
    ]
    return <DialogBox open={openMenu} setOpen={setOpenMenu}>
            <div className="relative">
                <div onClick={()=>{setOpenMenu(false)}} className="absolute top-5 right-5 mr-[30px] nav">
                    <img src={Multiply} width={60} height={60}/>
                </div>
                {
                    menuItems.map(({icon,description,action}:menuItemsProps)=>{
                        return<div key={Math.random()} onClick={action} className="nav p-5 mx-[40px] ">
                            <div  className="flex flex-row items-center my-[20px]">
                                <div className="mr-5"><img src={icon} width={30} height={30}/></div>
                                <div className="font-bold text-black text-[18px]">{description}</div>
                            </div>
                            {/* {index != (menuItems.length-1) &&<div className="h-[1px] bg-[#f2f2f2] w-full"></div>} */}
                        </div>
                    })
                }
            </div>

        </DialogBox>
}
export default memo(MenuComponent);