import { Layout } from "antd";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }} className="mainLayout">
      <Sidebar />
      <Layout>
        <Content className="content-bg">
          <Outlet />
        </Content>
      </Layout>
      <Toaster position="bottom-left" />
    </Layout>
  );
};

export default MainLayout;
