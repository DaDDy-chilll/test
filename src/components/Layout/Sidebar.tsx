import { NavLink } from "react-router-dom";
import Routenames from "@/navigations/routes";
import logo from "@/assets/icons/logo.svg";
import { jp } from "@/lang/jp";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store/";
import useAuth from "@/hooks/useAuth";


const Sidebar = () => {
  const dispatch = useDispatch();
  const {onLogout} = useAuth();

  const handleClick = (title: string) => {
    dispatch(setTitle(title));
  };
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 text-white left-0 z-40 w-64 h-screen pt-5 transition-transform -translate-x-full  border-r border-gray-300 sm:translate-x-0 bg-gray-50"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between">
        <ul className="space-y-4 font-medium ">
          <li className="w-full flex justify-center mb-10 items-center">
            <img src={logo} className="w-20" alt="Japan job logo" />
          </li>
          <li>
            <NavLink
              to={Routenames.DASHBOARD}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg dark:text-white  hover:text-white dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.dashboard)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H8V8H0V0ZM10 0H18V8H10V0ZM0 10H8V18H0V10ZM13 10H15V13H18V15H15V18H13V15H10V13H13V10ZM12 2V6H16V2H12ZM2 2V6H6V2H2ZM2 12V16H6V12H2Z" />
              </svg>
              <span className="ms-3">{jp.dashboard}</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={Routenames.APPLICANTS}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg   hover:text-white dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.applicant)}
            >
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9H17V7H12V9ZM12 6H17V4H12V6ZM3 12H11V11.45C11 10.7 10.6333 10.1042 9.9 9.6625C9.16667 9.22083 8.2 9 7 9C5.8 9 4.83333 9.22083 4.1 9.6625C3.36667 10.1042 3 10.7 3 11.45V12ZM7 8C7.55 8 8.02083 7.80417 8.4125 7.4125C8.80417 7.02083 9 6.55 9 6C9 5.45 8.80417 4.97917 8.4125 4.5875C8.02083 4.19583 7.55 4 7 4C6.45 4 5.97917 4.19583 5.5875 4.5875C5.19583 4.97917 5 5.45 5 6C5 6.55 5.19583 7.02083 5.5875 7.4125C5.97917 7.80417 6.45 8 7 8ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V2H2V14Z"
                  fillOpacity="0.8"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                {jp.applicant}
              </span>
              {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span> */}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={Routenames.MATCHES}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900  rounded-lg dark:text-white hover:text-white  dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.matches)}
            >
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.875 18C10.9417 18 11.0083 17.9833 11.075 17.95C11.1417 17.9167 11.1917 17.8833 11.225 17.85L19.425 9.65C19.625 9.45 19.7708 9.225 19.8625 8.975C19.9542 8.725 20 8.475 20 8.225C20 7.95833 19.9542 7.70417 19.8625 7.4625C19.7708 7.22083 19.625 7.00833 19.425 6.825L15.175 2.575C14.9917 2.375 14.7792 2.22917 14.5375 2.1375C14.2958 2.04583 14.0417 2 13.775 2C13.525 2 13.275 2.04583 13.025 2.1375C12.775 2.22917 12.55 2.375 12.35 2.575L12.075 2.85L13.925 4.725C14.175 4.95833 14.3583 5.225 14.475 5.525C14.5917 5.825 14.65 6.14167 14.65 6.475C14.65 7.175 14.4125 7.7625 13.9375 8.2375C13.4625 8.7125 12.875 8.95 12.175 8.95C11.8417 8.95 11.5208 8.89167 11.2125 8.775C10.9042 8.65833 10.6333 8.48333 10.4 8.25L8.52499 6.4L4.14999 10.775C4.09999 10.825 4.06249 10.8792 4.03749 10.9375C4.01249 10.9958 3.99999 11.0583 3.99999 11.125C3.99999 11.2583 4.04999 11.3792 4.14999 11.4875C4.24999 11.5958 4.36666 11.65 4.49999 11.65C4.56666 11.65 4.63332 11.6333 4.69999 11.6C4.76666 11.5667 4.81666 11.5333 4.84999 11.5L8.24999 8.1L9.64999 9.5L6.27499 12.9C6.22499 12.95 6.18749 13.0042 6.16249 13.0625C6.13749 13.1208 6.12499 13.1833 6.12499 13.25C6.12499 13.3833 6.17499 13.5 6.27499 13.6C6.37499 13.7 6.49166 13.75 6.62499 13.75C6.69166 13.75 6.75832 13.7333 6.82499 13.7C6.89166 13.6667 6.94166 13.6333 6.97499 13.6L10.375 10.225L11.775 11.625L8.39999 15.025C8.34999 15.0583 8.31249 15.1083 8.28749 15.175C8.26249 15.2417 8.24999 15.3083 8.24999 15.375C8.24999 15.5083 8.29999 15.625 8.39999 15.725C8.49999 15.825 8.61666 15.875 8.74999 15.875C8.81666 15.875 8.87916 15.8625 8.93749 15.8375C8.99582 15.8125 9.04999 15.775 9.09999 15.725L12.5 12.35L13.9 13.75L10.5 17.15C10.45 17.2 10.4125 17.2542 10.3875 17.3125C10.3625 17.3708 10.35 17.4333 10.35 17.5C10.35 17.6333 10.4042 17.75 10.5125 17.85C10.6208 17.95 10.7417 18 10.875 18ZM10.85 20C10.2333 20 9.68749 19.7958 9.21249 19.3875C8.73749 18.9792 8.45832 18.4667 8.37499 17.85C7.80832 17.7667 7.33332 17.5333 6.94999 17.15C6.56666 16.7667 6.33332 16.2917 6.24999 15.725C5.68332 15.6417 5.21249 15.4042 4.83749 15.0125C4.46249 14.6208 4.23332 14.15 4.14999 13.6C3.51666 13.5167 2.99999 13.2417 2.59999 12.775C2.19999 12.3083 1.99999 11.7583 1.99999 11.125C1.99999 10.7917 2.06249 10.4708 2.18749 10.1625C2.31249 9.85417 2.49166 9.58333 2.72499 9.35L8.52499 3.575L11.8 6.85C11.8333 6.9 11.8833 6.9375 11.95 6.9625C12.0167 6.9875 12.0833 7 12.15 7C12.3 7 12.425 6.95417 12.525 6.8625C12.625 6.77083 12.675 6.65 12.675 6.5C12.675 6.43333 12.6625 6.36667 12.6375 6.3C12.6125 6.23333 12.575 6.18333 12.525 6.15L8.94999 2.575C8.76666 2.375 8.55416 2.22917 8.31249 2.1375C8.07082 2.04583 7.81666 2 7.54999 2C7.29999 2 7.04999 2.04583 6.79999 2.1375C6.54999 2.22917 6.32499 2.375 6.12499 2.575L2.59999 6.125C2.44999 6.275 2.32499 6.45 2.22499 6.65C2.12499 6.85 2.05832 7.05 2.02499 7.25C1.99166 7.45 1.99166 7.65417 2.02499 7.8625C2.05832 8.07083 2.12499 8.26667 2.22499 8.45L0.77499 9.9C0.491657 9.51667 0.283324 9.09583 0.14999 8.6375C0.0166569 8.17917 -0.0333431 7.71667 -9.76492e-06 7.25C0.0333236 6.78333 0.14999 6.32917 0.34999 5.8875C0.54999 5.44583 0.82499 5.05 1.17499 4.7L4.69999 1.175C5.09999 0.791667 5.54582 0.5 6.03749 0.3C6.52916 0.1 7.03332 0 7.54999 0C8.06666 0 8.57082 0.1 9.06249 0.3C9.55416 0.5 9.99166 0.791667 10.375 1.175L10.65 1.45L10.925 1.175C11.325 0.791667 11.7708 0.5 12.2625 0.3C12.7542 0.1 13.2583 0 13.775 0C14.2917 0 14.7958 0.1 15.2875 0.3C15.7792 0.5 16.2167 0.791667 16.6 1.175L20.825 5.4C21.2083 5.78333 21.5 6.225 21.7 6.725C21.9 7.225 22 7.73333 22 8.25C22 8.76667 21.9 9.27083 21.7 9.7625C21.5 10.2542 21.2083 10.6917 20.825 11.075L12.625 19.25C12.3917 19.4833 12.1208 19.6667 11.8125 19.8C11.5042 19.9333 11.1833 20 10.85 20Z"
                  fillOpacity="0.8"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                {jp.matches}
              </span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={Routenames.CHAT}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg dark:text-white hover:text-white dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.chat)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z"
                  fillOpacity="0.8"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">{jp.chat}</span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={Routenames.ADDJOB}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg dark:text-white hover:text-white dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.addjob)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 18V4H4V0H14V8H18V18H10V14H8V18H0ZM2 16H4V14H2V16ZM2 12H4V10H2V12ZM2 8H4V6H2V8ZM6 12H8V10H6V12ZM6 8H8V6H6V8ZM6 4H8V2H6V4ZM10 12H12V10H10V12ZM10 8H12V6H10V8ZM10 4H12V2H10V4ZM14 16H16V14H14V16ZM14 12H16V10H14V12Z"
                  fillOpacity="0.8"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">{jp.addjob}</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={Routenames.JOBS}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg dark:text-white hover:text-white dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.joblists)}
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 19C1.45 19 0.979167 18.8042 0.5875 18.4125C0.195833 18.0208 0 17.55 0 17V6C0 5.45 0.195833 4.97917 0.5875 4.5875C0.979167 4.19583 1.45 4 2 4H6V2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V17C20 17.55 19.8042 18.0208 19.4125 18.4125C19.0208 18.8042 18.55 19 18 19H2ZM2 17H18V6H2V17ZM8 4H12V2H8V4Z"
                  fillOpacity="0.8"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                {jp.joblists}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={Routenames.CALENDAR}
              className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg dark:text-white hover:text-white dark:hover:bg-gray-700 group"
              onClick={() => handleClick(jp.calendar)}
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM9 12C8.71667 12 8.47917 11.9042 8.2875 11.7125C8.09583 11.5208 8 11.2833 8 11C8 10.7167 8.09583 10.4792 8.2875 10.2875C8.47917 10.0958 8.71667 10 9 10C9.28333 10 9.52083 10.0958 9.7125 10.2875C9.90417 10.4792 10 10.7167 10 11C10 11.2833 9.90417 11.5208 9.7125 11.7125C9.52083 11.9042 9.28333 12 9 12ZM5 12C4.71667 12 4.47917 11.9042 4.2875 11.7125C4.09583 11.5208 4 11.2833 4 11C4 10.7167 4.09583 10.4792 4.2875 10.2875C4.47917 10.0958 4.71667 10 5 10C5.28333 10 5.52083 10.0958 5.7125 10.2875C5.90417 10.4792 6 10.7167 6 11C6 11.2833 5.90417 11.5208 5.7125 11.7125C5.52083 11.9042 5.28333 12 5 12ZM13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10C13.2833 10 13.5208 10.0958 13.7125 10.2875C13.9042 10.4792 14 10.7167 14 11C14 11.2833 13.9042 11.5208 13.7125 11.7125C13.5208 11.9042 13.2833 12 13 12ZM9 16C8.71667 16 8.47917 15.9042 8.2875 15.7125C8.09583 15.5208 8 15.2833 8 15C8 14.7167 8.09583 14.4792 8.2875 14.2875C8.47917 14.0958 8.71667 14 9 14C9.28333 14 9.52083 14.0958 9.7125 14.2875C9.90417 14.4792 10 14.7167 10 15C10 15.2833 9.90417 15.5208 9.7125 15.7125C9.52083 15.9042 9.28333 16 9 16ZM5 16C4.71667 16 4.47917 15.9042 4.2875 15.7125C4.09583 15.5208 4 15.2833 4 15C4 14.7167 4.09583 14.4792 4.2875 14.2875C4.47917 14.0958 4.71667 14 5 14C5.28333 14 5.52083 14.0958 5.7125 14.2875C5.90417 14.4792 6 14.7167 6 15C6 15.2833 5.90417 15.5208 5.7125 15.7125C5.52083 15.9042 5.28333 16 5 16ZM13 16C12.7167 16 12.4792 15.9042 12.2875 15.7125C12.0958 15.5208 12 15.2833 12 15C12 14.7167 12.0958 14.4792 12.2875 14.2875C12.4792 14.0958 12.7167 14 13 14C13.2833 14 13.5208 14.0958 13.7125 14.2875C13.9042 14.4792 14 14.7167 14 15C14 15.2833 13.9042 15.5208 13.7125 15.7125C13.5208 15.9042 13.2833 16 13 16Z"
                  fillOpacity="0.8"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                {jp.calendar}
              </span>
            </NavLink>
          </li>
        </ul>
        <div>
          <NavLink
            to={Routenames.LOGIN}
            className="flex items-center p-2 pl-10 bg-gray-300  text-gray-900 rounded-lg dark:text-white  hover:text-primaryColor dark:hover:bg-gray-700 group"
            onClick={onLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <span className="ms-3">{jp.logout}</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
