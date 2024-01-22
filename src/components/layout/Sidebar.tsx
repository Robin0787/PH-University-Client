import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { USER_ROLE } from "../../constant/user.roles";
import { adminPaths } from "../../routes/admin.routes";
import { defaultPaths } from "../../routes/default.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { TSidebarItem } from "../../types";
import { TUserRole } from "../../types/userRole.types";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";

function getUserRole(): TUserRole {
  const role: TUserRole = localStorage.getItem("role") as TUserRole;
  if (role) {
    return role;
  }
  return USER_ROLE.ADMIN;
}

const Sidebar = () => {
  const sidebarItems: TSidebarItem[] = [...sidebarItemsGenerator(defaultPaths)];
  const role: TUserRole = getUserRole();

  switch (role) {
    case USER_ROLE.ADMIN:
      sidebarItems.push(...sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN));
      break;
    case USER_ROLE.FACULTY:
      sidebarItems.push(
        ...sidebarItemsGenerator(facultyPaths, USER_ROLE.FACULTY)
      );
      break;
    case USER_ROLE.STUDENT:
      sidebarItems.push(
        ...sidebarItemsGenerator(studentPaths, USER_ROLE.STUDENT)
      );
      break;
  }

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
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
