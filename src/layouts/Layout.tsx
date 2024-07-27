import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [title, setTitle] = useState("Dashboard");

  return (
    <>
      <Sidebar setTitle={setTitle} />
      <div className="relative sm:ml-64">
        <Header title={title} />
        <div className="pt-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
