import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NotiItem from "../ui/NotiItem";
import { jp } from "@/lang/jp";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Routenames from "@/navigations/routes";

const Header = () => {
  let title = useSelector((state: RootState) => state.navigation.title);
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const pathname = location.pathname;
  const defaultNoti = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Notification Title One",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Two",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Three",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Four",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Five",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Six",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Seven",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 8,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Eight",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 9,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Nine",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
    {
      id: 10,
      image: "https://via.placeholder.com/150",
      title: "Notification Title Ten",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tortor tortor nisi et id cras. Vel facilisis imperdiet bibendum odio elit. Eget amet in scelerisque nulla.",
    },
  ];

  if (pathname === Routenames.PROFILE) title = jp.profile;

  return (
    <nav className="flex sticky items-center px-5 justify-between w-full top-0 h-16 z-50 bg-white">
      <h1 className="text-xl text-gray-900 font-semibold">{title}</h1>
      <div className="flex gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger className=" z-50">
            <div>
              <svg
                width="18"
                height="24"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.70843 25.7192C1.48359 25.7192 1.2957 25.6426 1.14476 25.4896C0.993815 25.3365 0.917814 25.1481 0.916759 24.9243C0.915703 24.7006 0.991703 24.5127 1.14476 24.3607C1.29781 24.2087 1.4857 24.1332 1.70843 24.1342H3.47543V11.5895C3.47543 9.52061 4.12987 7.70136 5.43876 6.13175C6.74765 4.56214 8.40698 3.58417 10.4168 3.19783V2.33333C10.4168 1.89317 10.5703 1.5195 10.8775 1.21233C11.1847 0.904111 11.5578 0.75 11.9969 0.75C12.436 0.75 12.8102 0.904111 13.1195 1.21233C13.4288 1.52056 13.5834 1.89422 13.5834 2.33333V3.19783C15.5932 3.58311 17.2525 4.56108 18.5614 6.13175C19.8703 7.70242 20.5248 9.52167 20.5248 11.5895V24.1342H22.2918C22.5166 24.1342 22.7045 24.2102 22.8554 24.3622C23.0074 24.5142 23.0834 24.7027 23.0834 24.9275C23.0834 25.1523 23.0074 25.3402 22.8554 25.4912C22.7034 25.6421 22.5155 25.7176 22.2918 25.7176L1.70843 25.7192ZM11.9953 29.8596C11.2902 29.8596 10.6886 29.6089 10.1903 29.1075C9.69212 28.6061 9.44301 28.0044 9.44301 27.3025H14.5572C14.5572 28.0097 14.3065 28.6124 13.8051 29.1107C13.3026 29.6089 12.6994 29.8596 11.9953 29.8596Z"
                  fill="#211E1E"
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[500px]">
            <DropdownMenuLabel>{jp.notifications}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {defaultNoti
              .filter((item) => item.id < 4)
              .map((item) => (
                <DropdownMenuItem key={item.id}>
                  <NotiItem item={item} />
                </DropdownMenuItem>
              ))}
            <DropdownMenuSeparator />
            <div className="flex justify-end">
              <button className="text-sm text-blue-500 flex items-center gap-2 m-2">
                See More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <h1>{user?.name}</h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
