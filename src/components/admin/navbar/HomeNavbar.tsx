import logo from "@/assets/navbar/logo.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogOutMenu from "./LogOutMenu";
import { Dispatch, SetStateAction, useState } from "react";

const HomeNavbar = ({
  setIsAdmin,
}: {
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openLogoutMenu, setOpenLogoutMenu] = useState<boolean>(false);
  const toggleVisibility = () => {
    setOpenLogoutMenu(!openLogoutMenu); // Toggle the visibility state
  };

  return (
    <div className="flex flex-row justify-between px-[30px] items-center h-[70px] bg-white shadow-md fixed top-0 w-screen z-[9999]">
      {/* Logo */}
      <div className="h-[50px]">
        <img className="object-contain h-[53px]" src={logo} />
      </div>
      {/* Profile & Setting */}
      <div
        onClick={toggleVisibility}
        className="flex flex-row justify-start items-center px-[7px] h-[50px] w-[90px] bg-[#E8EAF6] rounded-full drop-shadow-sm cursor-pointer select-none"
      >
        <div className="flex flex-row justify-center items-center w-[35px] h-[35px] bg-white rounded-full">
          <PersonOutlineOutlinedIcon style={{ width: 30, height: 30 }} />
        </div>
        <div>
          <SettingsOutlinedIcon
            style={{ width: 25, height: 25 }}
            className="text-primary ml-[8px]"
          />
        </div>
        {openLogoutMenu && (
          <LogOutMenu open={open} setOpen={setOpen} setIsAdmin={setIsAdmin} />
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
