import { Outlet } from "react-router-dom";
import Layout from "../layouts/Layout";

const ShareLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ShareLayout;
