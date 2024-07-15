import Logo from "@/assets/navbar/logo.svg";
import Cart from "@/assets/navbar/cart.svg";
import Person3Icon from "@mui/icons-material/Person3";
import routes, { UserProductRoutes } from "@/navigations/routes";
import { useNavigate } from "react-router-dom";
import SizeBox from "@/components/SizeBox";

const UserNavbarComponent = () => {
  const navigate = useNavigate();

  // const isUser = () => {
  //   return (
  //     localStorage.getItem("user") &&
  //     localStorage.getItem("user") !== "" &&
  //     localStorage.getItem("isAdmin") === "2"
  //   );
  // };

  type menuItemsProps = {
    label: string | null;
    route: any | null;
    Logo: React.FC;
    children: Array<string>;
  };
  const menuItems: Array<menuItemsProps> = [
    {
      label: "Home",
      route: routes.USER.TOP_PAGE,
      Logo: () => <div className="text-[14px]">ホーム</div>,
      children: [],
    },
    {
      label: "Products",
      route: routes.USER.PRODUCT,
      Logo: () => <div className="text-[14px]">製品</div>,
      children: UserProductRoutes,
    },
    {
      label: "User",
      route: routes.USER.ACCOUNT,
      Logo: () => <Person3Icon />,
      children: [],
    },
    {
      label: "カート",
      route: routes.USER.CART,
      Logo: () => <img src={Cart} />,
      children: [routes.USER.CART],
    },
  ];
  return (
    <div className="flex flex-row fixed top-0 bg-white items-center justify-between pl-[70px] h-[100px] w-full z-10 shadow-md">
      {/* Logo */}
      <img src={Logo} className="w-[80px]" />
      <div className="flex flex-row">
        {menuItems.map(({ label, Logo, route, children }, index) => {
          return (
            <div
              onClick={() => navigate(route)}
              key={index}
              className={`flex flex-col items-center justify-center px-[50px] h-[100px] nav 
                    ${
                      children.includes(window.location.pathname)
                        ? "text-primary font-bold"
                        : ""
                    }    
                        ${
                          index === menuItems.length - 1
                            ? "bg-primary text-white"
                            : ""
                        }`}
            >
              {/* <div>{children.includes(route)}</  div>
                        <div>{children.length === 0}</  div> */}
              <div>
                {" "}
                <Logo />{" "}
              </div>
              <SizeBox h={5} />
              <div className="text-[12px]">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
};

export default UserNavbarComponent;
