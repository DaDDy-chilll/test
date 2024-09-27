import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
