import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { defaultPaths } from "../../routes/default.routes";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";

const items: MenuProps["items"] = [
  ...sidebarItemsGenerator(defaultPaths),
  ...sidebarItemsGenerator(adminPaths, "admin"),
];
const Sidebar = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0" style={{ padding: "5px" }}>
      <div
        className="demo-logo-vertical"
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
