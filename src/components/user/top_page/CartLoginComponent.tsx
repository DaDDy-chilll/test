import SizeBox from "@/components/SizeBox";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";
import { Cart } from "@/models/dataModel";
import Helper from "@/helpers";

const CartLoginComponent = ({}: { carts: Array<Cart> }) => {
  const navigate = useNavigate();

  const loginAction = () => {
    Helper.navigate({ navigate, path: routes.USER.LOGIN });
  };

  const cartAction = () => {
    Helper.navigate({navigate,path: routes.USER.CART});
  };

  return (
    <div className="fixed right-0 bottom-[40px]">
      <div
        onClick={loginAction}
        className="flex flex-col justify-center items-center w-[80px] h-[70px] bg-primary border-[1px] border-white rounded-l-[10px] nav"
      >
        <PersonIcon fontSize="medium" className="text-white" />
        <div className="font-medium text-[10px] text-white">ログイン</div>
      </div>
      <SizeBox h={5} />
      <div
        onClick={cartAction}
        className="flex flex-col justify-center items-center w-[80px] h-[70px] bg-primary border-[1px] border-white rounded-l-[10px] text-white nav"
      >
        {/* <Badge badgeContent={carts.length} color="secondary"> */}
        <Badge badgeContent={0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
        <div className="font-medium text-[10px] text-white">カート</div>
      </div>
    </div>
  );
};
export default CartLoginComponent;
