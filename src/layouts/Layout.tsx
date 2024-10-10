import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const sideBar = useSelector((state: RootState) => state.navigation.sideBar);
  return (
    <>
      <Sidebar />
      <div className={`flex flex-col flex-1 ${sideBar ? 'md:ml-64' : 'md:ml-20'} relative transition-all duration-500 ease-in-out`}>
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
