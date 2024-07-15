import banner from "@/assets/user/top_page/banner.png";
import logo from "@/assets/navbar/logo.svg";
import SizeBox from "@/components/SizeBox";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuComponent from "@/components/user/top_page/MenuComponent";
import { useState } from "react";
import { Badge } from "@mui/material";
import { Cart } from "@/models/dataModel";
import Helper from "@/helpers";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";

const BannerComponent = ({}: { carts: Array<Cart> }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const cartAction = () => {
    Helper.navigate({navigate,path: routes.USER.CART})
  };
  return (
    <div className="h-screen bg-yellow-900 relative">
      {/* Logo */}
      <div className="absolute z-10 left-[40px] top-[20px]">
        <img src={logo} />
      </div>

      {/* Menu Icon */}
      <div className="absolute z-10 right-[40px] top-[35px] flex flex-row">
        <div
          onClick={cartAction}
          className="bg-white w-[50px] h-[50px] text-[#285DBD] flex flex-col justify-center items-center rounded-full drop-shadow-lg select-none cursor-pointer"
        >
          {/* <Badge badgeContent={carts.length} color="secondary"> */}
          <Badge badgeContent={0} color="secondary">
            <ShoppingCartOutlinedIcon style={{ width: 25, height: 25 }} onClick={cartAction}/>
          </Badge>
        </div>
        <SizeBox w={20} />
        <div
          onClick={() => setOpenMenu(true)}
          className="bg-white w-[50px] h-[50px] text-[#285DBD] flex flex-col cursor-pointer select-none justify-center items-center rounded-full drop-shadow-lg"
        >
          <MenuOutlinedIcon style={{ width: 25, height: 25 }} />
        </div>
      </div>

      {/* Text */}
      <div className="absolute flex flex-col justify-center px-[70px] z-30 top-0 left-0 h-screen w-[400]">
        <div className="flex flex-row items-center text-[30px] text-primary">
          <div className="font-[600] py-[15px] -mb-[230px] h-fit w-[55px] bg-white text-center rounded-[5px] rounded-tr-none">
            {"大事！".split("").map((character) => {
              return <div key={Math.random()}>{character}</div>;
            })}
          </div>
          <div className="font-[600] py-[15px] h-fit w-[55px] bg-white text-center rounded-[5px] rounded-tr-none rounded-bl-none">
            {"それらは何より".split("").map((character) => {
              return <div key={Math.random()}>{character}</div>;
            })}
          </div>
          <div className="font-[600] py-[15px] -mt-[180px] w-[55px] bg-white text-center rounded-[5px] rounded-bl-none">
            {"家族と健康".split("").map((character) => {
              return <div key={Math.random()}>{character}</div>;
            })}
          </div>
        </div>
      </div>

      {/* Photo Section */}
      <div className="bg-white">
        <img
          src={banner}
          className="bg-cover h-[100vh] w-[100vw] object-cover"
        />
      </div>

      {/* </div> */}
      <MenuComponent openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </div>
  );
};

export default BannerComponent;
