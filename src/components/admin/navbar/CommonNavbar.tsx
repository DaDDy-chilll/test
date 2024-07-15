import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography/Typography";
import LogOutMenu from './LogOutMenu';
import { Dispatch, SetStateAction, useState } from "react";

interface CommonNavbarProps {
    breadcrubItems: Array<breadcrubItemsType>,
    setIsAdmin: Dispatch<SetStateAction<boolean>>
}
type breadcrubItemsType = {
    title: string;
    action: ()=>void;
}

const CommonNavbar = ({breadcrubItems,setIsAdmin}:CommonNavbarProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openLogoutMenu,setOpenLogoutMenu] = useState(false);
    const toggleVisibility = () => {
        setOpenLogoutMenu(!openLogoutMenu); // Toggle the visibility state
      };
 
    return <div className="flex flex-row justify-between px-[30px] items-center h-[70px] bg-white drop-shadow-sm fixed top-0 w-screen shadow-md z-[9999]">
        {/* Logo */}
        <Breadcrumbs aria-label="breadcrumb">
            {
                breadcrubItems.map(({title,action},index)=>{
                    return breadcrubItems.length!=index+1?
                    <div key={index} onClick={action}><Typography className="hover:underline underline-offset-2" style={{color: "#3083FF",cursor: "pointer"}} >{title}</Typography></div>
                    :<Typography key={index} color="text.primary">{title}</Typography>
                })
            }
        </Breadcrumbs>

        {/* Profile & Setting */}
        <div  onClick={toggleVisibility} className="flex flex-row justify-start items-center px-[7px] h-[50px] w-[90px] bg-[#E8EAF6] rounded-full drop-shadow-sm cursor-pointer select-none">
            <div className="flex flex-row justify-center items-center w-[35px] h-[35px] bg-white rounded-full">
                <PersonOutlineOutlinedIcon style={{width: 30,height: 30}}/>
            </div>
            <div>
                <SettingsOutlinedIcon style={{width: 25,height: 25}} className="text-primary ml-[8px]"/>
            </div>
            {openLogoutMenu && <LogOutMenu open={open} setOpen={setOpen} setIsAdmin={setIsAdmin}/>}
        </div>
    </div>
}

export default CommonNavbar;