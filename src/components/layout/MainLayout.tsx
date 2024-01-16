import { Layout, Menu, MenuProps } from "antd";
import { v4 as uuidv4 } from "uuid";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: uuidv4(),
    label: "Dashboard",
  },
  {
    key: uuidv4(),
    label: "Profile",
  },
  {
    key: uuidv4(),
    label: "User Management",
    children: [
      {
        key: uuidv4(),
        label: "Create Admin",
      },
      {
        key: uuidv4(),
        label: "Create Student",
      },
    ],
  },
];

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            color: "white",
            textAlign: "center",
            height: "4rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            border: "1px solid red",
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
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
